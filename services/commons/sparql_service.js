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

        statements.forEach(st => {
            statementsString += `${st} .\n`;
        });

        insertQuery = this.getQuery(`INSERT DATA { ${statementsString} }`);
        return insertQuery;
    }

    static parseQueryResult(results) {

        // {
        //     "3_a.m._(Eminem)" = {
        //         "song": [...],
        //         "name": [...]
        //         "label": [...],

        //     },
        //     {

        //     },
        //     {

        //     }
        // }


        let cleanResults = {};

        results.forEach(result => {
            let cleanResult = {};
            Object.keys(result).forEach(key => {
                if (cleanResult[key] === undefined) {
                    cleanResult[key] = [];
                }

                if (cleanResult[key].indexOf(result[key]['value']) == -1) {
                    cleanResult[key].push(result[key]['value']);
                }
            });
            cleanResults[result.entity.value] = cleanResult;
        });

        return cleanResults;
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

                statements.push(`${rdfSubject}    ${rdfPredicate}     ${rdfObject}`);
            });
        });

        return statements;
    }

}

module.exports = SparqlService;