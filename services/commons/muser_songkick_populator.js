const normalizeSync = require("escape-diacritics");
const async = require('async');

const SongKickService = require("./songkick_service");
const GraphDBMuserService = require("./graphdb_muser_service");

class MuserSongkickPopulator {

    constructor() {
        this.songKickService = new SongKickService();
        this.graphdbMuserService = new GraphDBMuserService();
    }

    populate_ids() {

        let promisified_function = (resolve, reject) => {
            async.waterfall([

                    /**
                     * Function that retrieves all the artists without songkick ID
                     */
                    (callback) => {

                        this.graphdbMuserService.findArtistsWithoutSongkick()
                            .then(result => {
                                callback(null, result);
                            })
                            .catch(err => {
                                console.error(err);
                                callback(err);
                            });
                    },

                    /**
                     * Function that retrieves the idSongkick for each artist that was provided from the results
                     * of the previous SPARQL query
                     */
                    (artists, callback) => {
                        console.log("Retrieved artists:" + Object.keys(artists).length);
                        const results = {};

                        async.eachLimit(Object.keys(artists), 5,
                            (artist, eachArtistCallback) => {
                                const artistName = artists[artist].name[0];
                                console.log(`Retrieve artist id for:${artistName}`);

                                this.songKickService.findArtistId(artistName)
                                    .then(data => {
                                        if (data.idSongkick) {
                                            const result = {
                                                "idSongkick": data.idSongkick
                                            };
                                            results[artist] = result;
                                        }
                                        eachArtistCallback(null);
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        eachArtistCallback(null);
                                    });

                            },
                            (err) => {
                                if (err) {
                                    console.error(err);
                                    callback(err);
                                    return;
                                }

                                console.log(results);
                                callback(null, results);
                            }
                        );
                    },

                    /**
                     * Function that builds the SPARQL Statemnts for the artistsInfo (idSongkick)
                     */
                    (artistsInfo, callback) => {
                        console.log(artistsInfo);
                        console.log("Retrieved artists:" + Object.keys(artistsInfo).length);
                        console.log("Build insert statements");
                        const statements = this.graphdbMuserService.buildStatementFromAPIResponse(artistsInfo);
                        callback(null, statements);
                    },

                    /**
                     * Function that inserts the artist's idSonkkick to ontology
                     */
                    (statements, callback) => {
                        console.log(statements);
                        if (statements.length === 0) {
                            console.log("No statements to insert");
                            callback(null);
                            return;
                        }

                        this.graphdbMuserService.getQueryInsert(statements).execute()
                            .then(response => {
                                console.log("Inserted Songkick id for artists");
                                callback(null);
                            })
                            .catch(err => {
                                console.error(err);
                                callback(err);
                            });
                    },

                ],

                (err, results) => {
                    if (err) {
                        console.error(err);
                        reject(err);
                        return;
                    }

                    console.log("Artists ID Chain had finished");
                    resolve();
                });
        };

        return new Promise(promisified_function);
    }

    escapeSpecialCharacters(value) {
        if (!value.startsWith("\"")) {
            return value.replace(/["']/g, "_");
        }
        return value;
    }

    buildMuserEntity(label) {
        const entity = label.split(/\s/).join('_');
        return `<http://example.com/muser#${entity}>`;
    }

    extractInfoFromEvent(event) {
        const info = {
            uuid: event.id.toString(),
            idSongkick: event.id.toString(),
            name: event.venue.displayName,
            label: event.displayName,
            startDate: event.start.date,
            eventCountry: event.venue.metroArea.country.displayName,
            eventCity: event.venue.metroArea.displayName,
            eventPlace: event.location.city,
        };
        if (event.end) {
            info.endDate = event.end.date;
        }

        return info;
    }

    populateEvents(artistId, artistMuserEntity) {

        let promisified_function = (resolve, reject) => {
            async.waterfall([

                /**
                 * Function that retrieves all the future event of the artist
                 */
                (callback) => {
                    this.songKickService.findArtistEvents(artistId)
                        .then(events => {
                            const eventsInfo = [];
                            if (events) {
                                for (let event of events) {
                                    const eventInfo = this.extractInfoFromEvent(event);
                                    eventsInfo.push(eventInfo);
                                }
                            }
                            callback(null, eventsInfo);
                        })
                        .catch(err => {
                            console.error(err);
                            callback(err);
                        });
                },

                /**
                 * Function that sanitize the info about events
                 */
                (events, callback) => {
                    console.log(`Number of events:${events.length}`);
                    const sanitizedEvents = {};

                    for (let event of events) {
                        const sanitizedEvent = {};
                        const eventEntity = this.buildMuserEntity(event.label);

                        for (let key of Object.keys(event)) {
                            console.log("Sanitize:", event[key]);
                            let sanitizeData = normalizeSync(event[key]);
                            sanitizeData = this.escapeSpecialCharacters(sanitizeData);
                            sanitizedEvent[key] = sanitizeData;
                        }

                        sanitizedEvents[eventEntity] = sanitizedEvent;
                    }
                    callback(null, sanitizedEvents);
                },

                /**
                 * Build SPARQL Statements
                 */
                (events, callback) => {
                    console.log(events);
                    console.log("Build insert statements");
                    const statements = this.graphdbMuserService.buildStatementFromAPIResponse(events);
                    Object.keys(events).forEach(eventEntity => {
                        statements.push([{
                            s: eventEntity,
                            p: "rdf:type",
                            o: "muser:MusicalEvent",
                        }]);
                        statements.push([{
                            s: artistMuserEntity,
                            p: "muser:performAt",
                            o: eventEntity,
                        }]);
                        statements.push([{
                            s: eventEntity,
                            p: "muser:performers",
                            o: artistMuserEntity,
                        }]);
                    });

                    callback(null, statements);
                },

                (statements, callback) => {
                    console.log(statements);
                    this.graphdbMuserService.getQueryInsert(statements).execute()
                        .then(response => {
                            console.log("Inserted Events for artist:", artistMuserEntity);
                            callback(null);
                        })
                        .catch(err => {
                            console.error(err);
                            callback(err);
                        });
                },

            ], (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                console.log("Artist Events Chain had finished");
                resolve();
            });
        };

        return new Promise(promisified_function);
    }
}

module.exports = MuserSongkickPopulator;