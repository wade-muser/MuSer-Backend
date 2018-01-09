const SPARQL_ENDPOINT = 'http://dbpedia.org/sparql';
const COMMON_PREFIXES = require('./mappings').prefixes.common;
const DBP_PREFIXES = require('./mappings').prefixes.dbp;
const SparqlService = require('./sparql_service');

class DbpediaService extends SparqlService {
    constructor() {
        super(SPARQL_ENDPOINT, undefined, [COMMON_PREFIXES, DBP_PREFIXES]);
    };

    getArtist(dbpInstance, callback) {
        let getArtistQuery = this.getQuery();

    };
};


function getArtist(dbpInstance) {

    getQuerySelect(
            )
        .execute()
        .then(res => {
            console.log(parseQueryResult(res.results.bindings[0]));

            return parseQueryResult(res.results.bindings[0]);
        })
        .then(artist => {
            // let statements = [];
            // Object.keys(artist).forEach(prop => {
            //     statements.append('');
            // });

            GraphdbMuserService.insertStatements(
                [
                    `muser:${artist.artistName} rdf:type muser:MusicalArtist`,
                    `muser:${artist.artistName} owl:sameAs <${artist.wikidataArtist}>`,
                    `muser:${artist.artistName} muser:inceptionDate '${artist.artistActivityStartYear}'^^xsd:date`
                ]
            );
        })
        .catch(err => {
            console.error(err);
        });
}

function getSong(id) {

}

function getSongs(artist) {

}

function getAlbums(song) {

}

function getGenres(song) {

}

function getGenres(album) {

}

function insertMuserStatements(statements) {

}

function populateMuser() {
    // get artist info
    getArtist('dbr:Eminem');
    // insert artist info
    // get songs for artist
    // insert song <-> artist
    // get songs info 
    // insert songs info
    // get albums for songs
    // insert albums <-> songs
    // get albums info
    // insert albums info
    // get artists for albums
    // insert artists <-> albums
    // get genres for songs
    // insert genres <-> songs
    // get genres info
    // insert genres info
    // get genres for albums
    // insert genres <-> albums
    // get genres info
    // insert genres info
    // union artist genres (albums genres + songs genres)
    // insert artist <-> genres

    // get related artists for artist
    // insert related artists
    // get related genres for genres
    // insert related genres
}

populateMuser();