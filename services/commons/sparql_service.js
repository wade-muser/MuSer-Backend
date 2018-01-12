const {
    SparqlClient,
    SPARQL
} = require('sparql-client-2');
const {
    normalize,
    normalizeSync
} = require('normalize-diacritics');
const VAR_TO_MUSER = require('./mappings').varToMuser;

class SparqlService {
    constructor(
        sparqlEndpoint,
        sparqlEndpointUpdate,
        prefixesSet
    ) {
        this.sparqlEndpoint = sparqlEndpoint;
        this.sparqlEndpointUpdate = sparqlEndpointUpdate;
        this.prefixesSet = prefixesSet;

        this.initClient();
    }

    initClient() {
        this.client = new SparqlClient(this.sparqlEndpoint, {
            defaultParameters: {
                format: 'json',
            },
            updateEndpoint: this.sparqlEndpointUpdate
        });
    }

    getQuery(statement) {
        let prefixesString = '';
        let query = '';
        let builtQuery;

        this.prefixesSet.forEach(prefixes => {
            Object.keys(prefixes).forEach((key, index) => {
                prefixesString += `PREFIX ${key}: <${prefixes[key]}>\n`;
            });
        });

        query = `${prefixesString}${statement}`;
        builtQuery = this.client.query(`${query}`);
        return builtQuery;
    }

    getQueryInsert(statements) {
        let insertQuery;
        let statementsString = '';

        statements.forEach(entityStatements => {
            entityStatements.forEach(statement => {
                statementsString += `${statement.s} ${statement.p} ${statement.o} .\n`;
            });
        });        

        insertQuery = this.getQuery(`INSERT DATA { ${statementsString} }`);

        // console.log(insertQuery.originalText);

        return insertQuery;
    }

    static parseQueryResult(results) {
        let cleanResults = {};

        results.forEach(result => {
            if (cleanResults[result.entity.value] === undefined) {
                cleanResults[result.entity.value] = {};
            }
            Object.keys(result).forEach(key => {
                if (cleanResults[result.entity.value][key] === undefined) {
                    cleanResults[result.entity.value][key] = [];
                }

                if (cleanResults[result.entity.value][key].indexOf(result[key].value) == -1) {
                    cleanResults[result.entity.value][key].push(result[key].value);
                }
            });
        });

        return cleanResults;
    }

    getQueryResults(query, entity) {
        let promisifiedFunction = (resolve, reject) => {
            let sparqlQuery = this.getQuery(query);
            // console.log(sparqlQuery.originalText);

            sparqlQuery.execute()
                .then(response => {
                    let cleanResults = SparqlService.parseQueryResult(response.results.bindings);
                    // console.log(cleanResults);
                    resolve(cleanResults);
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisifiedFunction);
    }

    static getCleanUniqueIdentifier(prefix, rawName, needsNormalized = false) {
        if (needsNormalized) {
            rawName = normalizeSync(rawName);
        }

        rawName = rawName.split(/\s/).join('_');

        return `<${prefix}${rawName}>`;
    }

    static buildStatements(rdfSubject, result) {
        let statements = [];
        let rdfPredicate, rdfObject;

        Object.keys(result).forEach(key => {
            rdfPredicate = VAR_TO_MUSER[key].predicate;

            result[key].forEach(resRdfObj => {
                if (VAR_TO_MUSER[key].type !== undefined) {
                    rdfObject = `"${resRdfObj}"${VAR_TO_MUSER[key].type}`;
                } else {
                    rdfObject = resRdfObj;
                    if (rdfObject.toLowerCase().startsWith('http://')) {
                        rdfObject = `<${rdfObject}>`;
                    }
                }

                statements.push({
                    s: rdfSubject,
                    p: rdfPredicate,
                    o: rdfObject,
                });
            });
        });

        return statements;
    }
    
    getStatements(results, prefix) {
        let statements = [];
            
        Object.keys(results).forEach(key => {
            let result = results[key];
            let rdfSubject = SparqlService.getCleanUniqueIdentifier(prefix, result.label[0]);

            delete result.entity;

            let statement = SparqlService.buildStatements(rdfSubject, result);
            statements.push(statement);
        });

        return statements;
    }

}

module.exports = SparqlService;