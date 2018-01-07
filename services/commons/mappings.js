'use strict';

/*
    *Props:
        WD:
            Wikidata property for items about people: Q18608871
            instance of:   P31
            occupation:    P106
            field of work: P101
            performer:     P175
            part of:       P361
            genre:         P136
        DBP:
            dbo:genre


    Artist:
        WD:
            (instance of)   band:     Q215380
            (field of work) musician: Q639669
            (occupation)    singer:   Q177220
        DBP:
            (rdf:type) dbo:MusicalArtist
            (rdf:type) dbo:Band

    Song:
        WD:
            (instance of)  release:  Q2031291
            (instance of)  musical work: Q2188189
            (instance of)  music track: Q7302866
            (instance of)  single: Q134556
            (instance of)  song: Q7366
            (instance of)  extended play: Q169930
        DBP:
            (rdf:type) dbo:Single
            (rdf:type) dbo:MusicalWork
            (rdf:type) dbo:Song

    Album:
        WD:
            (instance of)  album: Q482994
            (instance of)  musical work: Q2188189
        DBP:
            (rdf:type)     dbo:Album
            (rdf:type)     dbo:MusicalWork

    Genre:
        WD:
            (subclass of)  art genre:   Q1792379
            (instance of)  music genre: Q188451
        DBP:
            (rdf:type)  dbo:Genre
            (rdf:type)  dbo:MusicalGenre
*/

const MAPPINGS = {
    wd: {
        //props
        instance_of:   "P31",
        occupation:    "P106",
        field_of_work: "P101",
        performer:     "P175",
        part_of:       "P361",
        genre:         "P136",

        band:          "Q215380",
        musician:      "Q639669",
        singer:        "Q177220",

        musical_work:  "Q2188189",
        release:       "Q2031291",
        music_track:   "Q7302866",
        single:        "Q134556",
        song:          "Q7366",
        extended_play: "Q169930",

        album:         "Q482994",

        art_genre:     "Q1792379",
        music_genre:   "Q188451",
    },

    dbp: {
        //props
        genre:         "dbo:genre",

        MusicalArtist: "dbo:MusicalArtist",
        Band:          "dbo:Band",
        Single:        "dbo:Single",
        MusicalWork:   "dbo:MusicalWork",
        Song:          "dbo:Song",

        Album:         "dbo:Album",

        Genre:         "dbo:Genre",
        MusicalGenre:  "dbo:MusicalGenre",
    },

    spotify: {

    }
};

module.exports = MAPPINGS