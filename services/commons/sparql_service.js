const { SparqlClient, SPARQL } = require('sparql-client-2');

class SparqlService {
    constructor(
        sparqlEndpoint,
        sparqlEndpointUpdate,
        prefixesSet,
    ) {
        this.sparqlEndpoint = sparqlEndpoint;
        this.sparqlEndpointUpdate = sparqlEndpointUpdate;
        this.prefixesSet = prefixesSet;

        this.initClient();
    };

    initClient() {
        this.client = new SparqlClient(this.sparqlEndpoint, {
            defaultParameters: { format: 'json', },
            updateEndpoint: this.sparqlEndpointUpdate
        });
    };

    getQuery(statement) {
        let prefixesString = '';
        let query = '';
        let builtQuery;
    
        this.prefixesSet.forEach(prefixes => {
            Object.keys(prefixes).forEach((key, index) => {
                prefixesString += `PREFIX ${key}: ${prefixes[key]}\n`;
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
            statementsString += `${st} .\n`
        });
        
        insertQuery = this.getQuery(`INSERT DATA { ${statementsString} }`);
        return insertQuery;
    };

    static parseQueryResult(results) {
        let cleanResult = {};
    
        results.forEach(result => {
            Object.keys(result).forEach(key => {
                if (cleanResult[key] === undefined) {
                    cleanResult[key] = [];
                }

                if (cleanResult[key].indexOf(result[key]['value']) == -1) {
                    cleanResult[key].push(result[key]['value']);
                }
            });
        });
        
        return cleanResult;
    };

};

module.exports = SparqlService;