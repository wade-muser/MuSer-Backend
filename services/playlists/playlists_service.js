const async = require("async");
const uuidv1 = require("uuid/v1");
const uuidv3 = require("uuid/v3");
const dateformat = require("dateformat");

const SparqlQueryFactory = require("../commons/sparql_query_factory");
const GraphDBMuserService = require("../commons/graphdb_muser_service");
const MAPPINGS = require("../commons/mappings");

class PlaylistsService {
    constructor() {
        this.queryFactory = new SparqlQueryFactory();
        this.graphdbMuserService = new GraphDBMuserService();
    }

    getMuserEntity(id) {
        return `<http://example.com/muser#${id}>`;
    }

    createPlaylist(name, emailCreator) {
        const promisifiedFunction = (resolve, reject) => {
            if (name === undefined || name.length === 0) {
                const error = new CustomError("Playlist's name wasn't provided or not supported", HTTP_STATUS_CODES.BAD_REQUEST);
                reject(error);
                return;
            }

            if (emailCreator === undefined || emailCreator.length === 0) {
                const error = new CustomError("Playlist's emailCreator wasn't provided or not supported", HTTP_STATUS_CODES.BAD_REQUEST);
                reject(error);
                return;
            }

            async.waterfall([
                (callback) => {
                    const uuidPlaylist = uuidv1();
                    const uuidCreator = uuidv3(emailCreator, uuidv3.DNS);

                    const values = {
                        name:        name,
                        uuidCreator: uuidCreator,
                        uuid:        uuidPlaylist,
                        entity:      `muser:Playlist_${uuidPlaylist}`,
                        dateCreated: dateformat(new Date(), "yyyy-mm-dd"),
                    };
                    
                    console.log(values);

                    const query = this.queryFactory.getQuery(SparqlQueryFactory.INSERT_PLAYLIST, values);

                    console.log(query);
                    callback(null, query);
                },

                (query, callback) => {
                    this.graphdbMuserService.getQuery(query)
                        .execute()
                        .then(res => {
                            console.log("Inserted playlist");
                            callback(null);
                        })
                        .catch(err => {
                            console.error(err);
                            callback(err);
                        });
                }
            ], (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }

                resolve();
            });
        };

        return new Promise(promisifiedFunction);
    } // createPlaylist


    getPlaylists(emailCreator) {
        const promisifiedFunction = (resolve, reject) => {
            if (emailCreator === undefined || emailCreator.length === 0) {
                const error = new CustomError("Playlist's emailCreator wasn't provided or not supported", HTTP_STATUS_CODES.BAD_REQUEST);
                reject(error);
                return;
            }

            async.waterfall([
                (callback) => {
                    const uuidCreator = uuidv3(emailCreator, uuidv3.DNS);

                    const query = this.queryFactory.getQuery(SparqlQueryFactory.GET_PLAYLISTS, { uuidCreator : uuidCreator });

                    callback(null, query);
                },

                (query, callback) => {
                    this.graphdbMuserService.getQueryResults(query)
                        .then(res => {
                            console.log("Got playlists of " + emailCreator);
                            callback(null, res);
                        })
                        .catch(err => {
                            console.error(err);
                            callback(err);
                        });
                }
            ], (err, res) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }

                resolve(res);
            });
        };

        return new Promise(promisifiedFunction);
    } // getPlaylists

    getPlaylist(id) {
        const promisifiedFunction = (resolve, reject) => {
            if (id === undefined || id.length === 0) {
                const error = new CustomError("Playlist's id wasn't provided or not supported", HTTP_STATUS_CODES.BAD_REQUEST);
                reject(error);
                return;
            }

            async.waterfall([
                (callback) => {
                    const query = this.queryFactory.getQuery(
                        SparqlQueryFactory.GET_PLAYLIST,
                        { id: this.getMuserEntity(id) }
                    );

                    callback(null, query);
                },

                (query, callback) => {
                    this.graphdbMuserService.getQueryResults(query)
                        .then(res => {
                            console.log("Got playlist " + id);
                            callback(null, res);
                        })
                        .catch(err => {
                            console.error(err);
                            callback(err);
                        });
                }
            ], (err, res) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }

                resolve(res);
            });
        };

        return new Promise(promisifiedFunction);
    } // getPlaylist

    deletePlaylist(id) {
        const promisifiedFunction = (resolve, reject) => {
            if (id === undefined || id.length === 0) {
                const error = new CustomError("Playlist's id wasn't provided or not supported", HTTP_STATUS_CODES.BAD_REQUEST);
                reject(error);
                return;
            }

            async.waterfall([
                (callback) => {
                    const query = this.queryFactory.getQuery(
                        SparqlQueryFactory.DELETE_PLAYLIST,
                        { id : this.getMuserEntity(id) }
                    );

                    callback(null, query);
                },

                (query, callback) => {
                    this.graphdbMuserService.getQuery(query)
                        .execute()
                        .then(res => {
                            console.log("Deleted playlist " + id);
                            callback(null);
                        })
                        .catch(err => {
                            console.error(err);
                            callback(err);
                        });
                }
            ], (err, res) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }

                resolve(res);
            });
        };

        return new Promise(promisifiedFunction);
    } // deletePlaylist

    insertPlaylistSong(id, idSong) {
        const promisifiedFunction = (resolve, reject) => {
            if (id === undefined || id.length === 0) {
                const error = new CustomError("Playlist's id wasn't provided or not supported", HTTP_STATUS_CODES.BAD_REQUEST);
                reject(error);
                return;
            }

            if (idSong === undefined || idSong.length === 0) {
                const error = new CustomError("Song's id wasn't provided or not supported", HTTP_STATUS_CODES.BAD_REQUEST);
                reject(error);
                return;
            }

            async.waterfall([
                (callback) => {
                    const query = this.queryFactory.getQuery(
                        SparqlQueryFactory.INSERT_PLAYLIST_SONG, 
                        { 
                            id:     this.getMuserEntity(id),
                            idSong: this.getMuserEntity(idSong),
                        }
                    );
                    
                    callback(null, query);
                },

                (query, callback) => {
                    this.graphdbMuserService.getQuery(query)
                        .execute()
                        .then(res => {
                            console.log(`Inserted in playlist ${id}, song ${idSong}`);
                            callback(null);
                        })
                        .catch(err => {
                            console.error(err);
                            callback(err);
                        });
                }
            ], (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }

                resolve();
            });
        };

        return new Promise(promisifiedFunction);
    } // insertPlaylistSong

    getPlaylistSongs(id) {
        const promisifiedFunction = (resolve, reject) => {
            if (id === undefined || id.length === 0) {
                const error = new CustomError("Playlist's id wasn't provided or not supported", HTTP_STATUS_CODES.BAD_REQUEST);
                reject(error);
                return;
            }

            async.waterfall([
                (callback) => {
                    const query = this.queryFactory.getQuery(
                        SparqlQueryFactory.GET_PLAYLIST_SONGS,
                        { id: this.getMuserEntity(id) }
                    );

                    callback(null, query);
                },

                (query, callback) => {
                    this.graphdbMuserService.getQueryResults(query)
                        .then(res => {
                            console.log("Got playlist songs of " + id);
                            callback(null, res);
                        })
                        .catch(err => {
                            console.error(err);
                            callback(err);
                        });
                }
            ], (err, res) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }

                resolve(res);
            });
        };

        return new Promise(promisifiedFunction);
    } // getPlaylistSongs

    deletePlaylistSong(id, idSong) {
        const promisifiedFunction = (resolve, reject) => {
            if (id === undefined || id.length === 0) {
                const error = new CustomError("Playlist's id wasn't provided or not supported", HTTP_STATUS_CODES.BAD_REQUEST);
                reject(error);
                return;
            }

            if (idSong === undefined || idSong.length === 0) {
                const error = new CustomError("Song's id wasn't provided or not supported", HTTP_STATUS_CODES.BAD_REQUEST);
                reject(error);
                return;
            }

            async.waterfall([
                (callback) => {
                    const query = this.queryFactory.getQuery(
                        SparqlQueryFactory.DELETE_PLAYLIST_SONG,
                        { 
                            id:     this.getMuserEntity(id),
                            idSong: this.getMuserEntity(idSong),
                        }
                    );

                    callback(null, query);
                },

                (query, callback) => {
                    this.graphdbMuserService.getQuery(query)
                        .execute()
                        .then(res => {
                            console.log(`Deleted from playlist ${id}, song ${idSong}`);
                            callback(null);
                        })
                        .catch(err => {
                            console.error(err);
                            callback(err);
                        });
                }
            ], (err, res) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }

                resolve(res);
            });
        };

        return new Promise(promisifiedFunction);
    } // deletePlaylistSong
}

module.exports = PlaylistsService;