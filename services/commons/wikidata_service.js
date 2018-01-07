'use strict';

const { SparqlClient, Sparql } = require('sparql-client-2');
const PREFIXES = {
    wde: '<http://www.wikidata.org/entity/>',
    wdp: '<http://www.wikidata.org/prop/>',
    wdt: '<http://www.wikidata.org/prop/direct/>',
};
const SPARQL_ENDPOINT = 'https://query.wikidata.org/sparql';
const client = new SparqlClient(SPARQL_ENDPOINT);

function executeSelect(statement) {
    let prefixes_string = '';

    
};

