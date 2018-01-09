'use strict';

const M = require('./mappings');

const SPARQL_ENDPOINT = 'http://localhost:7200/repositories/muser-rdf';
const SPARQL_ENDPOINT_INSERT = 'http://localhost:7200/repositories/muser-rdf/statements';

const { SparqlClient, SPARQL } = require('sparql-client-2');
const client = new SparqlClient(SPARQL_ENDPOINT, {
    updateEndpoint: SPARQL_ENDPOINT_INSERT,
    defaultParameters: {
        format: 'json',
    },
});

function getQuery(statement, prefixes) {
    let prefixesString = '';
    let query = '';
    let builtQuery;

    Object.keys(M.common_prefixes).forEach((key, index) => {
        prefixesString += `PREFIX ${key}: ${M.common_prefixes[key]}\n`;
    });
    prefixesString += `PREFIX muser: <http://example.com/muser#>\n`;

    query = `${prefixesString}${statement}`;
    console.log(query);
    builtQuery = client.query(`${query}`);

    return builtQuery;
};

function insertStatements(statements) {
    let insertQuery;
    let statementsString = '';

    statements.forEach(st => {
        statementsString += `${st} .\n`
    });
    
    insertQuery = getQuery(`INSERT DATA { ${statementsString} }`);

    insertQuery.execute()
    .then(res => {
        console.log("Okay !" + res);
        console.log(statements);
    })
    .catch(err => {
        console.error(err);
    });
}

module.exports = {
    insertStatements : insertStatements
};