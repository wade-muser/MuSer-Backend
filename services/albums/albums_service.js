const async = require('async');

const SparqlQueryFactory = require("../commons/sparql_query_factory");
const GraphDBMuserService = require("../commons/graphdb_muser_service");
const CustomError = require("../../commons/utils/custom_error");
const HTTP_STATUS_CODES = require("../../commons/utils/http_status_codes");

const recommendationTypesToSparqlQuery = {
    "sameartist": SparqlQueryFactory.FIND_ALBUM_RECOMMENDATION_TYPE_SAMEARTIST,
    "sameyearandgenre": SparqlQueryFactory.FIND_ALUBM_RECOMMENATION_TYPE_SAMEYEARANDGENRE,
    "samegenre": SparqlQueryFactory.FIND_ALBUM_RECOMMENDATION_TYPE_SAMEGENRE,
    "relatedartist": SparqlQueryFactory.FIND_ALBUM_RECOMMENDATION_TYPE_RELATEDARTIST,
};


class AlbumsService {

    constructor() {
        this.queryFactory = new SparqlQueryFactory();
        this.graphdbMuserService = new GraphDBMuserService();
    }

    getAlbums(name) {

        const promisified_function = (resolve, reject) => {
            if (name.length === 0) {
                reject(new CustomError("Album name wasn't provided", HTTP_STATUS_CODES.BAD_REQUEST));
                return;
            }

            async.waterfall([

                /**
                 * Function that retrieves the query that is need it
                 */
                (callback) => {
                    const values = {
                        name: name,
                    };
                    const query = this.queryFactory.getQuery(SparqlQueryFactory.FIND_ALBUMS, values);
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

    getAlbum(id) {

        const promisified_function = (resolve, reject) => {
            if (id.length === 0) {
                reject(new CustomError("Album name wasn't provided", HTTP_STATUS_CODES.BAD_REQUEST));
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
                    const query = this.queryFactory.getQuery(SparqlQueryFactory.FIND_ALBUM_BY_ID, values);
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


    getAlbumsRecommendation(id, type) {
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
                        id: this.getMuserEntity(id),
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

module.exports = AlbumsService;