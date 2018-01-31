const async = require('async');

const SparqlQueryFactory = require("../commons/sparql_query_factory");
const GraphDBMuserService = require("../commons/graphdb_muser_service");
const CustomError = require("../../commons/utils/custom_error");
const HTTP_STATUS_CODES = require("../../commons/utils/http_status_codes");

class GenresService {

    constructor() {
        this.queryFactory = new SparqlQueryFactory();
        this.graphdbMuserService = new GraphDBMuserService();
    }

    getGenres() {

        const promisified_function = (resolve, reject) => {

            async.waterfall([

                    /**
                     * Function that retrieves the query that is need it
                     */
                    (callback) => {
                        const query = this.queryFactory.getQuery(SparqlQueryFactory.FIND_GENRES, {});
                        callback(null, query);
                    },

                    (query, callback) => {
                        console.log(query);
                        this.graphdbMuserService.getQueryResults(query)
                            .then(results => {
                                console.log("Got results");
                                callback(null, results);
                            })
                            .catch(err => {
                                console.log(err);
                                callback(err);
                            });
                    }
                ],
                (err, results) => {
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

    getGenre(id) {

        const promisified_function = (resolve, reject) => {
           
            if (id.length === 0) {
                reject(new CustomError("Song id wasn't provided", HTTP_STATUS_CODES.BAD_REQUEST));
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
                    const query = this.queryFactory.getQuery(SparqlQueryFactory.FIND_GENRE_BY_ID, values);
                    callback(null, query);
                },

                /**
                 * Function that executes the SPARQL query and returns the results
                 */
                (query, callback) => {
                    console.log(query);
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

    getGenreRelated(id){
        const promisified_function = (resolve, reject) => {
           
            if (id.length === 0) {
                reject(new CustomError("Song id wasn't provided", HTTP_STATUS_CODES.BAD_REQUEST));
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
                    const query = this.queryFactory.getQuery(SparqlQueryFactory.FIND_GENRE_RELATED, values);
                    callback(null, query);
                },

                /**
                 * Function that executes the SPARQL query and returns the results
                 */
                (query, callback) => {
                    console.log(query);
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

    getGenreTimeline(id, start_date, end_date){
        const promisified_function = (resolve, reject) => {
           
            if (id.length === 0) {
                reject(new CustomError("Song id wasn't provided", HTTP_STATUS_CODES.BAD_REQUEST));
                return;
            }

            const agregated_results = {
                artists_timeline : {},
                albums_timeline: {},
            };
            async.waterfall([

                /**
                 * Function that retrieves the query that is need it
                 */
                (callback) => {
                    const values = {
                        id: this.getMuserEntity(id),
                        start_date: start_date,
                        end_date: end_date,
                    };
                    console.log(values);
                    const query = this.queryFactory.getQuery(SparqlQueryFactory.FIND_GENRE_TIMELINE_ARTIST, values);
                    callback(null, query);
                },

                /**
                 * Function that executes the SPARQL query and appends the results to the agregated results 
                 */
                (query, callback) => {
                    //console.log(query);
                    this.graphdbMuserService.getQueryResults(query)
                        .then(results => {
                            //console.log("Got results");
                            agregated_results.artists_timeline = results;                           
                            callback(null);
                        })
                        .catch(err => {
                            console.log(err);
                            callback(err);
                        });
                },

                (callback) => {
                    const values = {
                        id: this.getMuserEntity(id),
                        start_date: start_date,
                    };
                    const query = this.queryFactory.getQuery(SparqlQueryFactory.FIND_GENRE_TIMELINE_ALBUM, values);
                    callback(null, query);
                },

                /**
                 * Function that executes the SPARQL query and returns the results
                 */
                (query, callback) => {
                    //console.log(query);
                    this.graphdbMuserService.getQueryResults(query)
                        .then(results => {
                            console.log("Got results");
                            agregated_results.albums_timeline = results;                         
                            callback(null, agregated_results);
                        })
                        .catch(err => {
                            console.log(err);
                            callback(err);
                        });
                },

            ], (err, results) => {               

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

module.exports = GenresService;