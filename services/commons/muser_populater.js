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

// foreach k in res
    //     ob = $map[k].type !== undefined ? `'{$res[k]}'{$map[k].type}` : ob = $res[k]
    //     st = muser:sub $map[k][predicate]  $ob .

function getArtist(dbpInstance) {

    getQuerySelect()
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

const 
const DbpediaService = require('./dbpedia_service');
const GraphdbMuserService = require('./graphdb_muser_service');

function populateMuser() {
    let dbpediaService = DbpediaService();
    let graphdbMuserService = GraphdbMuserService();
    
    // get artist info
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