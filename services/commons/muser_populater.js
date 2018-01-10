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

const VAR_TO_MUSER = require('./mappings').varToMuser;
const DbpediaService = require('./dbpedia_service');
const GraphdbMuserService = require('./graphdb_muser_service');
const { normalize, normalizeSync } = require('normalize-diacritics');

function buildStatements(rdfSubject, result) {
    let statements = [];
    let rdfPredicate, rdfObject;

    Object.keys(result).forEach(key => {
        // console.log(key);
        // console.log(VAR_TO_MUSER[key]);

        rdfPredicate = VAR_TO_MUSER[key].predicate;

        result[key].forEach(resRdfObj => {
            if (VAR_TO_MUSER[key].type !== undefined) {
                rdfObject = `"${resRdfObj}"${VAR_TO_MUSER[key].type}` ;
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

function populateMuser() {
    let dbpediaService = new DbpediaService();
    let graphdbMuserService = new GraphdbMuserService();
    
    let queryArtistInfo = dbpediaService.getQueryArtistInfo('<http://dbpedia.org/resource/Rage_Against_the_Machine>');
    console.log(queryArtistInfo.originalText);

    queryArtistInfo.execute()
    .then(res => {
        console.log(res);
        let cleanResult = DbpediaService.parseQueryResult(res.results.bindings);
        
        console.log(cleanResult);

        //rdfSubject = 'muser: wsToUnderscore(normalizeSync(label))'
        let rdfSubject = `muser:${normalizeSync(cleanResult.name[0])}`;
        delete cleanResult['artist'];

        let statements = buildStatements(rdfSubject, cleanResult);
        console.log(statements);
    })
    .catch(err => {
        console.error(err);
    });

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