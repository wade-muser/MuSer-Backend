const async = require('async');

const SparqlQueryFactory = require("../commons/sparql_query_factory");
const GraphDBMuserService = require("../commons/graphdb_muser_service");
const CustomError = require("../../commons/utils/custom_error");
const HTTP_STATUS_CODES = require("../../commons/utils/http_status_codes");

class EventsService {

    constructor() {
        this.queryFactory = new SparqlQueryFactory();
        this.graphdbMuserService = new GraphDBMuserService();
    }

    getEvents(keyword, type) {

        const promisified_function = (resolve, reject) => {


            const types = new Set(["name", "city", "place", "country", "performer"]);
            if (!types.has(type)) {
                reject(new CustomError("Type isn't supported", HTTP_STATUS_CODES.BAD_REQUEST));
                return;
            }

            async.waterfall([

                /**
                 * Function that retrieves the query that is need it 
                 */
                (callback) => {
                    const values = {
                        name: "/w",
                        city: "/w",
                        place: "/w",
                        country: "/w",
                        performer: "/w"
                    };
                    values[type] = keyword;
                    console.log(values);
                    const query = this.queryFactory.getQuery(SparqlQueryFactory.FIND_EVENTS, values);
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

    getEvent(id) {

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
                        event: this.getMuserEntity(id),
                    };
                    const query = this.queryFactory.getQuery(SparqlQueryFactory.FIND_EVENT, values);
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

    getMuserEntity(id) {
        return `<http://example.com/muser#${id}>`;
    }


}


module.exports = EventsService;