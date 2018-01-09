const fs = require('fs');
const genre_info_query = fs.readFileSync("queries/dbp/genre_info.rq", "utf-8");
const genres_for_song_query = fs.readFileSync("queries/dbp/genres_for_song.rq", "utf-8");
const genres_for_album_query = fs.readFileSync("queries/dbp/genres_for_album.rq", "utf-8");
const song_info_query = fs.readFileSync("queries/dbp/song_info.rq", "utf-8");
const songs_for_artist_query = fs.readFileSync("queries/dbp/songs_for_artist.rq", "utf-8");
const artist_info_query = fs.readFileSync("queries/dbp/artist_info.rq", "utf-8");
const artists_related_for_artist_query = fs.readFileSync("queries/dbp/artists_related_for_artist.rq", "utf-8");
const album_info_query = fs.readFileSync("queries/dbp/album_info.rq", "utf-8");
const albums_for_songs_query = fs.readFileSync("queries/dbp/albums_for_song.rq", "utf-8");

const QUERY = {
    GENRE_INFO: 0,
    GENRES_FOR_SONG: 1,
    GENRES_FOR_ALBUM: 2,
    SONG_INFO: 3,
    SONGS_FOR_ARTIST: 4,
    ARTIST_INFO: 5,
    ARTISTS_RELATED_FOR_ARTIST: 6,
    ALBUM_INFO: 7,
    ALBUMS_FOR_SONG: 8,
};

function stringTemplate(literal, params) {
    return new Function(params, "return `" + literal + "`;");
}

class QueryFactory {

    constructor() {

    }

    static get GENRE_INFO() {
        return QUERY.GENRE_INFO;
    }

    static get GENRES_FOR_SONG() {
        return QUERY.GENRES_FOR_SONG;
    }

    static get GENRES_FOR_ALBUM() {
        return QUERY.GENRES_FOR_ALBUM;
    }

    static get SONG_INFO() {
        return QUERY.SONG_INFO;
    }

    static get SONGS_FOR_ARTIST() {
        return QUERY.SONGS_FOR_ARTIST;
    }

    static get ARTIST_INFO() {
        return QUERY.ARTIST_INFO;
    }

    static get ARTISTS_RELATED_FOR_ARTIST() {
        return QUERY.ARTISTS_RELATED_FOR_ARTIST;
    }

    static get ALBUM_INFO() {
        return QUERY.ALBUM_INFO;
    }

    static get ALBUMS_FOR_SONG() {
        return QUERY.ALBUMS_FOR_SONG;
    }

    getQuery(queryType, entityValue) {
        switch (queryType) {
            case QueryFactory.GENRE_INFO:
                return this.buildQuery(genre_info_query, entityValue);
            case QueryFactory.GENRES_FOR_SONG:
                return this.buildQuery(genres_for_song_query, entityValue);
            case QueryFactory.GENRES_FOR_ALBUM:
                return this.buildQuery(genres_for_album_query, entityValue);
            case QueryFactory.SONG_INFO:
                return this.buildQuery(song_info_query, entityValue);
            case QueryFactory.SONGS_FOR_ARTIST:
                return this.buildQuery(songs_for_artist_query, entityValue);
            case QueryFactory.ARTIST_INFO:
                return this.buildQuery(artist_info_query, entityValue);
            case QueryFactory.ARTISTS_RELATED_FOR_ARTIST:
                return this.buildQuery(artists_related_for_artist_query, entityValue);
            case QueryFactory.ALBUM_INFO:
                return this.buildQuery(album_info_query, entityValue);
            case QueryFactory.ALBUMS_FOR_SONG:
                return this.buildQuery(albums_for_songs_query, entityValue);
        }
    }

    buildQuery(query, entityValue) {
        return stringTemplate(query, "dbpInstance")(entityValue);
    }

}

module.exports = QueryFactory;