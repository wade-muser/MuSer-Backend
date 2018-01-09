const fs = require('fs');
const genre_info_query = fs.readFileSync("queries/dbp/genre_info.rq", 'utf-8');
const genres_for_song_query = fs.readFileSync("queries/dbp/genres_for_song.rq", 'utf-8');


function stringTemplate(literal, params) {
    return new Function(params, "return `" + literal + "`;");
}

const GENRE_INFO = 0;
const GENRES_FOR_SONG = 1;

class QueryFactory {

    constructor() {

    }

    static get GENRE_INFO() {
        return GENRE_INFO;
    }

    static get GENRES_FOR_SONG() {
        return GENRES_FOR_SONG;
    }

    getQuery(queryType, entityValue) {
        switch (queryType) {
            case GENRE_INFO:
                return this.buildQuery(genre_info_query, entityValue);
            case GENRES_FOR_SONG:
                return this.buildQuery(genres_for_song_query, entityValue);
        }
    }

    buildQuery(query, entityValue) {
        return stringTemplate(query, "dbpInstance")(entityValue);
    }

}

module.exports = QueryFactory;