const SPARQL_ENDPOINT = 'http://dbpedia.org/sparql';
const COMMON_PREFIXES = require('./mappings').prefixes.common;
const DBP_PREFIXES = require('./mappings').prefixes.dbp;
const SparqlService = require('./sparql_service');

class DbpediaService extends SparqlService {
    constructor() {
        super(SPARQL_ENDPOINT, undefined, [COMMON_PREFIXES, DBP_PREFIXES]);
    }

    getQueryResults(query, dbpEntity, prefix) {
        let promisifiedFunction = (resolve, reject) => {
            let sparqlQuery = this.getQuery(query);
            console.log(sparqlQuery.originalText);

            sparqlQuery.execute()
                .then(response => {
                    let cleanResults = DbpediaService.parseQueryResult(response.results.bindings);
                    console.log(cleanResults);
                    resolve(cleanResults);
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisifiedFunction);
    }


    getStatements(query, dbpEntity, prefix) {
        let promisifiedFunction = (resolve, reject) => {
            this.getQueryResults(query, dbpEntity, prefix)
                .then(results => {
                    let statements = [];

                    Object.keys(results).forEach(key => {
                        let result = results[key];
                        let rdfSubject = DbpediaService.getCleanUniqueIdentifier(prefix, result.label[0]);

                        delete result.entity;
                        delete result.label;

                        let statement = DbpediaService.buildStatements(rdfSubject, result);
                        statements.push(statement);

                    });
                    resolve(statements);
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisifiedFunction);
    }

}

module.exports = DbpediaService;