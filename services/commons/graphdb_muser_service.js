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
