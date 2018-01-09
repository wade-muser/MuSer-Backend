const M = require('./mappings');
const SPARQL_ENDPOINT = 'http://dbpedia.org/sparql';

const {
    SparqlClient,
    SPARQL
} = require('sparql-client-2');
const client = new SparqlClient(SPARQL_ENDPOINT, {
    defaultParameters: {
        format: 'json',
    }
});
const GraphdbMuserService = require('./graphdb_muser_service');

const mapping_dictionary = {
    "default": {
        "dbpediaArtist": {
            "predicate": "owl:sameAs",
        },
        "wikidataArtist": {
            "predicate": "owl:sameAs",
        },
        "idSpotify": {
            "predicate": "muser:idSpotify",
            "type": "^^xsd:string",
        },
        "name": {
            "predicate": "muser:name",
            "type": "^^xsd:string",
        },
        "firstName": {
            "predicate": "muser:firstName",
            "type": "^^xsd:string",
        },
        "lastName": {
            "predicate": "muser:lastName",
            "type": "^^xsd:string"
        },
        "gender": {
            "predicate": "muser:gender",
            "type": "^^xsd:string",
        },
        "about": {
            "predicate": "muser:about",
            "type": "^^xsd:string"
        },
        "duration": {
            "predicate": "muser:duration",
            "type": "^^xsd:string",
        },
        "musicalAgentOrigin": {
            "predicate": "muser:musicalAgentOrigin",
        },
        "inceptionDate": {
            "predicate": "muser:inceptionDate",
            "type": "^^xsd:date",
        },
        "retiringDate": {
            "predicate": "muser:retiringDate",
            "type": "^^xsd:date",
        },
        "releaseDate": {
            "predicate": "muser:releaseDate",
            "type": "^^xsd:date",
        },
        "startDate": {
            "predicate": "muser:startDate",
            "type": "^^xsd:date",
        },
        "endDate": {
            "predicate": "muser:endDate",
            "type": "^^xsd:date",
        },
        "dateCreated": {
            "predicate": "muser:dateCreated",
            "type": "^^xsd:date",
        },
        "eventCountry": {
            "predicate": "muser:eventCountry",
            "type": "^^xsd:string",
        },
        "eventCity": {
            "predicate": "muser:eventCity ",
            "type": "^^xsd:string",
        },
        "eventPlace": {
            "predicate": "muser:eventPlace",
            "type": "^^xsd:string",
        },
        "musicalArtistMember": {
            "predicate": "muser:musicalArtistMember",
        },
        "relatedMusicalAgent": {
            "predicate": "muser:relatedMusicalAgent",
        },
        "relatedMusicalGenre": {
            "predicate": "muser:relatedMusicalGenre",
        },
        "hasMusicalGenre": {
            "predicate": "muser:hasMusicalGenre",
        },
        "embracedBy": {
            "predicate": "muser:embracedBy",
        },
        "performs": {
            "predicate": "muser:performs",
        },
        "performedBy": {
            "predicate": "muser:performedBy",
        },
        "released": {
            "predicate": "muser:released",
        },
        "releasedBy": {
            "predicate": "muser:releasedBy",
        },
        "contains": {
            "predicate": "muser:contains",
        },
        "containedBy": {
            "predicate": "muser:containedBy",
        },
        "performAt": {
            "predicate": "muser:performAt",
        },
        "performers": {
            "predicate": "muser:performers",
        },
        "has": {
            "predicate": "muser:has",
        },
        "partOf": {
            "predicate": "muser:partOf",
        },

    },
    "artist_info": {
        "dbpediaArtist": {
            "predicate": "owl:sameAs",
        },
        "wikidataArtist": {
            "predicate": "owl:sameAs",
        },
        "artistName": {
            "predicate": "muser:name",
            "type": "^^xsd:string",
        },
        "artistFirstName": {
            "predicate": "muser:firstName",
            "type": "^^xsd:string",
        },
        "lastName": {
            "predicate": "muser:lastName",
            "type": "^^xsd:string",
        },
        "birthName": {
            "predicate": "muser:name",
            "type": "^^xsd:date",
        },
        "artistGender": {
            "predicate": "muser:gender",
            "type": "^^xsd:string",
        },
        "artistBirthPlace": {
            "predicate": "muser:musicalAgentOrigin",
        },
        "artistActivityStartYear": {
            "predicate": "muser:inceptionDate",
            "type": "^^xsd:date",
        },
        "artistActivityEndYear": {
            "predicate": "muser:retiringDate",
            "type": "^^xsd:date",
        },
    }
};



// MusicalArtist   - musicalArtistMember  - MusicalArtist
// MusicalArtist   - relatedMusicalArtist - MusicalArtist  //DBP    
// MusicalArtist   - hasMusicalGenre      - MusicalGenre   //DBP (info about a song)
// MusicalArtist   - released             - Album          //DBP
// MusicalArtist   - performs             - Song           //DBP
// MusicalArtist   - performAt            - Event

// MusicalGenre    - relatedMusicalGenre  - MusicalGenre   //DPB
// MusicalGenre    - embracedBy           - MusicalArtist  
// MusicalGenre    - embracedBy           - Song
// MusicalGenre    - embracedBy           - Album

// Song            - hasMusicalGenre      - MusicalGenre    //DBP
// Song            - performedBy          - MusicalArtist   //DBP WIKI
// Song            - containedBy          - Album           //DBP WIKI
// Song            - partOf               - MusicalPlaylist 

// Album           - hasMusicalGenre      - MusicalGenre    //DBP WIKI
// Album           - releasedBy           - MusicalArtist   //DBP WIKI
// Album           - contains             - Song            //DBP WIKI

// Event           - performers           - MusicalArtist

// MusicalPlaylist - has                - Song


function getQuerySelect(statement, prefixes = M.dbp_prefixes) {
    let prefixesString = '';
    let query = '';
    let builtQuery;

    Object.keys(M.common_prefixes).forEach((key, index) => {
        prefixesString += `PREFIX ${key}: ${M.common_prefixes[key]}\n`;
    });
    Object.keys(prefixes).forEach((key, index) => {
        prefixesString += `PREFIX ${key}: ${prefixes[key]}\n`;
    });

    query = `${prefixesString}${statement}`;
    console.log(query);
    builtQuery = client.query(`${query}`);

    return builtQuery;
}

function parseQueryResult(result) {
    let cleanResult = {};

    Object.keys(result).forEach(key => {
        cleanResult[key] = result[key]['value'];
    });

    return cleanResult;
}

function getArtist(dbpInstance) {

    getQuerySelect(
            `SELECT ?dbpediaArtist ?wikidataArtist  ?artistName ?artistFirstName
    ?artistLastName ?artistBirthName ?artistGender ?artistBirthPlace ?artistActivityStartYear ?artistActivityEndYear WHERE {
      ?dbpediaArtist rdf:type                 ?type ;
                     rdfs:label               ?artistName ;
                     dbo:abstract             ?aboutArtist ;
                     dbo:birthPlace           ?artistBirthPlace .
                    
      OPTIONAL { ?dbpediaArtist dbo:activeYearsStartYear ?artistActivityStartYear }
      OPTIONAL { ?dbpediaArtist dbo:activeYearsEndYear   ?artistActivityEndYear }
      OPTIONAL { ?dbpediaArtist dbo:birthName            ?artistBirthName }
      OPTIONAL { ?dbpediaArtist foaf:givenName           ?artistFirstName }
      OPTIONAL { ?dbpediaArtist foaf:surname             ?artistLastName }
      OPTIONAL { ?dbpediaArtist foaf:gender              ?artistGender }
      OPTIONAL { ?dbpediaArtist owl:sameAs               ?wikidataArtist }
      
      FILTER (?dbpediaArtist = ${dbpInstance})
      FILTER (?type IN (dbo:MusicalArtist, dbo:Band))
      FILTER (regex(?wikidataArtist, "wikidata.org/entity"))
      FILTER (lang(?artistName) = "en")
      FILTER (lang(?aboutArtist) = "en")
    } LIMIT 10`)
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