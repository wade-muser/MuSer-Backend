const async = require('async');

const SparqlQueryFactory = require("../commons/sparql_query_factory");
const GraphDBMuserService = require("../commons/graphdb_muser_service");
const CustomError = require("../../commons/utils/custom_error");
const HTTP_STATUS_CODES = require("../../commons/utils/http_status_codes");
const artistTypeMappings = {
    "artist": "muser:MusicalArtist",
    "band": "muser:MusicalBand",
};
const recommendationTypesToSparqlQuery = {
    "song": SparqlQueryFactory.FIND_ARTIST_RECOMMENDATION_TYPE_SONG,
    "album": SparqlQueryFactory.FIND_ARTIST_RECOMMENDATION_TYPE_ALBUM,
    "genre": SparqlQueryFactory.FIND_ARTIST_RECOMMENDATION_TYPE_GENRE,
};

class ArtistsService {

    constructor() {
        this.queryFactory = new SparqlQueryFactory();
        this.graphdbMuserService = new GraphDBMuserService();

    }

    getArtists(name, type) {

        const promisified_function = (resolve, reject) => {
            if (!artistTypeMappings[type] || name.length === 0) {
                const error = new CustomError("Type wasn't provided or is not supported", HTTP_STATUS_CODES.BAD_REQUEST);
                reject(error);
                return;
            }

            async.waterfall([

                /**
                 * Function that retrieves the query that is need it
                 */
                (callback) => {
                    const values = {
                        "type": artistTypeMappings[type],
                        "name": name,
                    };
                    const query = this.queryFactory.getQuery(SparqlQueryFactory.FIND_ARTISTS, values);
                    callback(null, query);
                },

                /**
                 * Function that executes the SPARQL query and returns the results
                 */
                (query, callback) => {
                    this.graphdbMuserService.getQueryResults(query)
                        .then(results => {
                            console.log("Got results");
                            callback(null, results);
                        })
                        .catch(err => {
                            console.log(err);
                            callback(err);
                        });
                },

            ], (err, results) => {
                console.log(results);
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(results);
            });

        };

        return new Promise(promisified_function);
    }

    getArtist(id) {

        const promisified_function = (resolve, reject) => {

            if (id.length === 0) {
                reject(new CustomError("Event id wasn't provided", HTTP_STATUS_CODES.BAD_REQUEST));
                return;
            }

            async.waterfall([

                /**
                 * Function that retrieves the query that is need it
                 */
                (callback) => {

                    const values = {
                        id: this.getMuserEntity(id),
                    };
                    const query = this.queryFactory.getQuery(SparqlQueryFactory.FIND_ARTIST_BY_ID, values);
                    callback(null, query);
                },

                /**
                 * Function that executes the query and returns the results
                 */
                (query, callback) => {
                    console.log(query);
                    this.graphdbMuserService.getQueryResults(query)
                        .then(results => {
                            console.log("Got results");
                            callback(null, results);
                        })
                        .catch(err => {
                            console.log("Error on get query results");
                            console.log(err);
                            callback(err);
                        });
                },

            ], (err, results) => {
                console.log(results);
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(results);
            });
        };


        return new Promise(promisified_function);
    }

    getArtistFeatures(id) {

        const promisified_function = (resolve, reject) => {

            if (id.length === 0) {
                reject(new CustomError("Event id wasn't provided", HTTP_STATUS_CODES.BAD_REQUEST));
                return;
            }

            async.waterfall([

                /**
                 * Function that retrieves the query that is need it
                 */
                (callback) => {

                    const values = {
                        id: this.getMuserEntity(id),
                    };
                    const query = this.queryFactory.getQuery(SparqlQueryFactory.FIND_ARTIST_FEATURES, values);
                    callback(null, query);
                },

                /**
                 * Function that executes the query and returns the results
                 */
                (query, callback) => {
                    console.log(query);
                    this.graphdbMuserService.getQueryResults(query)
                        .then(results => {
                            console.log("Got results");
                            callback(null, results);
                        })
                        .catch(err => {
                            console.log("Error on get query results");
                            console.log(err);
                            callback(err);
                        });
                },

            ], (err, results) => {
                console.log(results);
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(results);
            });
        };


        return new Promise(promisified_function);
    }

    getArtistRecommendation(id, type) {

        const promisified_function = (resolve, reject) => {
            if (!recommendationTypesToSparqlQuery[type]) {
                reject(new CustomError("Type isn't supported", HTTP_STATUS_CODES.BAD_REQUEST));
                return;
            }

            async.waterfall([

                /**
                 * Function that retrieves the query that is need it
                 */
                (callback) => {
                    const values = {
                        artist: id,
                    };

                    const query = this.queryFactory.getQuery(recommendationTypesToSparqlQuery[type], values);
                    callback(null, query);
                },

                /**
                 * Function that executes the query and returns the results
                 */
                (query, callback) => {
                    console.log(query);
                    this.graphdbMuserService.getQueryResults(query)
                        .then(results => {
                            console.log("Got results");
                            callback(null, results);
                        })
                        .catch(err => {
                            console.log("Error on get query results");
                            console.log(err);
                            callback(err);
                        });
                }


            ], (err, results) => {
                console.log(results);
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve(results);
            });

        };

        return new Promise(promisified_function);
    }

    getMuserEntity(id) {
        return `<http://example.com/muser#${id}>`;
    }
}

module.exports = ArtistsService;