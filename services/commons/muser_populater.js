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

const PREFIXES = require('./mappings').prefixes;
const DbpediaService = require('./dbpedia_service');
const GraphdbMuserService = require('./graphdb_muser_service');

function populateMuser(artist) {
    let dbpediaService = new DbpediaService();
    let graphdbMuserService = new GraphdbMuserService();

    dbpediaService.getArtistInfoStatements(artist, PREFIXES.muser.muser)
        .then(statements => {
            console.log(statements);
        })
        .catch(err => {
            console.error(err);
        });

    // get dbp artist info (Done)
    // insert muser artist info
    // get dbp songs for artist
    // insert muser song <-> artist
    // get dbp songs info 
    // insert muser songs info
    // get dbp albums for songs
    // insert muser albums <-> songs
    // get dbp albums info
    // insert muser albums info
    // get dbp artists for albums
    // insert muser artists <-> albums
    // get dbp genres for songs
    // insert muser genres <-> songs
    // get dbp genres info
    // insert muser genres info
    // get dbp genres for albums
    // insert muser genres <-> albums
    // get dbp genres info
    // insert  muser genres info
    // union artist genres (albums genres + songs genres)
    // insert muser artist <-> genres
    // get dbp related artists for artist
    // insert muser related artists
    // get dbp related genres for genres
    // insert muser related genres
}

let artist = '<http://dbpedia.org/resource/Cashis>';
populateMuser(artist);