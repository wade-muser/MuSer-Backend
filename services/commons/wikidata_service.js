'use strict';

const { SparqlClient, SPARQL } = require('sparql-client-2');
const PREFIXES = {
    wde: '<http://www.wikidata.org/entity/>',
    wdp: '<http://www.wikidata.org/prop/>',
    wdt: '<http://www.wikidata.org/prop/direct/>',
};
const SPARQL_ENDPOINT = 'https://query.wikidata.org/sparql';
const client = new SparqlClient(SPARQL_ENDPOINT, {
    defaultParameters: {
        format: 'json',
    }
});
client.registerCommon('xsd', 'rdf', 'rdfs');

function executeSelect(statement, prefixes=PREFIXES) {
    let prefixesString = '';
    let query = '';
    let resultPromise;

    Object.keys(prefixes).forEach((key, index) => {
        prefixesString += `PREFIX ${key}: ${prefixes[key]}\n`;
    });

    query = `${prefixesString}${statement}`;

    resultPromise = client.query(`${query}`).execute();

    return resultPromise;
};

executeSelect(
    SPARQL`SELECT * WHERE { ?s ?p ?o } LIMIT 10`
).then((res) => {
    console.log(res.results.bindings);
}).catch((err) => {
    console.error(err);
})

//relations
// MusicalArtist - musicalArtistMember  - MusicalArtist
// MusicalArtist - relatedMusicalArtist - MusicalArtist
// MusicalArtist - hasMusicalGenre      - MusicalGenre
// MusicalArtist - released             - Album
// MusicalArtist - performs             - Song
// MusicalArtist - performAt            - Event

// MusicalGenre  - relatedMusicalGenre  - MusicalGenre
// MusicalGenre  - embracedBy           - MusicalArtist
// MusicalGenre  - embracedBy           - Song
// MusicalGenre  - embracedBy           - Album

// Song          - hasMusicalGenre      - MusicalGenre
// Song          - performedBy          - MusicalArtist
// Song          - containedBy          - Album
// Song          - partOf               - MusicalPlaylist

// Album         - hasMusicalGenre      - MusicalGenre
// Album         - releasedBy           - MusicalArtist
// Album         - contains             - Song

// Event         - performers           - MusicalArtist

// MusicalPlaylist - has                - Song
