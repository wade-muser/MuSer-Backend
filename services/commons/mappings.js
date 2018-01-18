/*
    *Props:
        WD:
            Wikidata property for items about people: Q18608871
            instance of:   P31
            field of work: P101
            occupation:    P106
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

const MAPS_PREFIXES = {
    common: {
        rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
        rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
        xsd: 'http://www.w3.org/2001/XMLSchema#',
        owl: 'http://www.w3.org/2002/07/owl#',
        schema: 'http://schema.org/',
        foaf: 'http://xmlns.com/foaf/0.1/',
    },
    wd: {
        wde: 'http://www.wikidata.org/entity/',
        wdp: 'http://www.wikidata.org/prop/',
        wdt: 'http://www.wikidata.org/prop/direct/',
    },
    dbp: {
        dbo: 'http://dbpedia.org/ontology/',
        dbr: 'http://dbpedia.org/resource/',
        dbp: 'http://dbpedia.org/property/',
    },
    muser: {
        muser: 'http://example.com/muser#',
    },
};

const MAPS_PROPS = {
    wd: {
        instance_of: "P31",
        occupation: "P106",
        field_of_work: "P101",
        performer: "P175",
        part_of: "P361",
        genre: "P136",

        band: "Q215380",
        musician: "Q639669",
        singer: "Q177220",

        musical_work: "Q2188189",
        release: "Q2031291",
        music_track: "Q7302866",
        single: "Q134556",
        song: "Q7366",
        extended_play: "Q169930",

        album: "Q482994",

        art_genre: "Q1792379",
        music_genre: "Q188451",
    },
    dbp: {
        genre: "dbo:genre",

        MusicalArtist: "dbo:MusicalArtist",
        Band: "dbo:Band",
        Single: "dbo:Single",
        MusicalWork: "dbo:MusicalWork",
        Song: "dbo:Song",

        Album: "dbo:Album",

        Genre: "dbo:Genre",
        MusicalGenre: "dbo:MusicalGenre",
    },

    spotify: {

    }
};

const MAPS_SPARQL_VAR_TO_ENTITY = {
    artist: {
        entity: "muser:MusicalArtist",
    },
    band: {
        entity: "muser:MusicalBand",
    },
    song: {
        entity: "muser:Song",
    },
    album: {
        entity: "muser:Album",
    },
    genre: {
        entity: "muser:MusicalGenre",
    },
    event: {
        entity: "muser:MusicalEvent",
    },
    playlist: {
        entity: "muser:MusicalPlaylist",
    },
};

const MAPS_SPARQL_VAR_TO_PREDICATE = {
    sameDbp: {
        predicate: "owl:sameAs",
    },
    sameWd: {
        predicate: "owl:sameAs",
    },
    idSpotify: {
        predicate: "muser:idSpotify",
        type: "^^xsd:string",
    },
    imageURL: {
        predicate: "muser:imageURL",
        type: "^^xsd:string",
    },
    label: {
        predicate: "muser:label",
        type: "^^xsd:string",
    },
    name: {
        predicate: "muser:name",
        type: "^^xsd:string",
    },
    firstName: {
        predicate: "muser:firstName",
        type: "^^xsd:string",
    },
    lastName: {
        predicate: "muser:lastName",
        type: "^^xsd:string"
    },
    birthName: {
        predicate: "muser:birthName",
        type: "^^xsd:string",
    },
    gender: {
        predicate: "muser:gender",
        type: "^^xsd:string",
    },
    about: {
        predicate: "muser:about",
        type: "^^xsd:string"
    },
    duration: {
        predicate: "muser:duration",
        type: "^^xsd:string",
    },
    musicalAgentOrigin: {
        predicate: "muser:musicalAgentOrigin",
    },
    inceptionDate: {
        predicate: "muser:inceptionDate",
        type: "^^xsd:date",
    },
    retiringDate: {
        predicate: "muser:retiringDate",
        type: "^^xsd:date",
    },
    releaseDate: {
        predicate: "muser:releaseDate",
        type: "^^xsd:date",
    },
    startDate: {
        predicate: "muser:startDate",
        type: "^^xsd:date",
    },
    endDate: {
        predicate: "muser:endDate",
        type: "^^xsd:date",
    },
    dateCreated: {
        predicate: "muser:dateCreated",
        type: "^^xsd:date",
    },
    eventCountry: {
        predicate: "muser:eventCountry",
        type: "^^xsd:string",
    },
    eventCity: {
        predicate: "muser:eventCity ",
        type: "^^xsd:string",
    },
    eventPlace: {
        predicate: "muser:eventPlace",
        type: "^^xsd:string",
    },
    musicalArtistMember: {
        predicate: "muser:musicalArtistMember",
    },
    relatedMusicalAgent: {
        predicate: "muser:relatedMusicalAgent",
    },
    relatedMusicalGenre: {
        predicate: "muser:relatedMusicalGenre",
    },
    hasMusicalGenre: {
        predicate: "muser:hasMusicalGenre",
    },
    embracedBy: {
        predicate: "muser:embracedBy",
    },
    performs: {
        predicate: "muser:performs",
    },
    performedBy: {
        predicate: "muser:performedBy",
    },
    released: {
        predicate: "muser:released",
    },
    releasedBy: {
        predicate: "muser:releasedBy",
    },
    contains: {
        predicate: "muser:contains",
    },
    containedBy: {
        predicate: "muser:containedBy",
    },
    performAt: {
        predicate: "muser:performAt",
    },
    performers: {
        predicate: "muser:performers",
    },
    has: {
        predicate: "muser:has",
    },
    partOf: {
        predicate: "muser:partOf",
    },
};


module.exports = {
    prefixes: MAPS_PREFIXES,
    props: MAPS_PROPS,
    varToPredicate: MAPS_SPARQL_VAR_TO_PREDICATE,
    varToEntity: MAPS_SPARQL_VAR_TO_ENTITY,
};