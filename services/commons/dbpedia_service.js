'use strict';

const M = require('./mappings');
const SPARQL_ENDPOINT = 'http://dbpedia.org/sparql';

const { SparqlClient, SPARQL } = require('sparql-client-2');
const client = new SparqlClient(SPARQL_ENDPOINT, {
    defaultParameters: {
        format: 'json',
    }
});



// MusicalArtist   - musicalArtistMember  - MusicalArtist
// MusicalArtist   - relatedMusicalArtist - MusicalArtist
// MusicalArtist   - hasMusicalGenre      - MusicalGenre
// MusicalArtist   - released             - Album
// MusicalArtist   - performs             - Song
// MusicalArtist   - performAt            - Event

// MusicalGenre    - relatedMusicalGenre  - MusicalGenre
// MusicalGenre    - embracedBy           - MusicalArtist
// MusicalGenre    - embracedBy           - Song
// MusicalGenre    - embracedBy           - Album

// Song            - hasMusicalGenre      - MusicalGenre
// Song            - performedBy          - MusicalArtist
// Song            - containedBy          - Album
// Song            - partOf               - MusicalPlaylist

// Album           - hasMusicalGenre      - MusicalGenre
// Album           - releasedBy           - MusicalArtist
// Album           - contains             - Song

// Event           - performers           - MusicalArtist

// MusicalPlaylist - has                - Song

function executeSelect(statement, prefixes=M.dbp_prefixes) {
    let prefixesString = '';
    let query = '';
    let resultPromise;

    Object.keys(M.common_prefixes).forEach((key, index) => {
        prefixesString += `PREFIX ${key}: ${M.common_prefixes[key]}\n`;
    });
    Object.keys(prefixes).forEach((key, index) => {
        prefixesString += `PREFIX ${key}: ${prefixes[key]}\n`;
    });

    query = `${prefixesString}${statement}`;
    console.log(query);
    resultPromise = client.query(`${query}`).execute();

    return resultPromise;
};

// executeSelect(
//     ``
// ).then((res) => {
//     console.log(res.results.bindings);
// }).catch((err) => {
//     console.error(err);
// });