const fs = require('fs');
const dot = require("dot");
dot.templateSettings.strip = false;

const genre_info_query = fs.readFileSync("services/commons/queries/dbp/genre_info.rq", "utf-8");
const genres_for_entity_query = fs.readFileSync("services/commons/queries/dbp/genres_for_entity.rq", "utf-8");
const song_info_query = fs.readFileSync("services/commons/queries/dbp/song_info.rq", "utf-8");
const songs_for_artist_query = fs.readFileSync("services/commons/queries/dbp/songs_for_artist.rq", "utf-8");
const artist_info_query = fs.readFileSync("services/commons/queries/dbp/artist_info.rq", "utf-8");
const artists_related_for_artist_query = fs.readFileSync("services/commons/queries/dbp/artists_related_for_artist.rq", "utf-8");
const album_info_query = fs.readFileSync("services/commons/queries/dbp/album_info.rq", "utf-8");
const albums_for_songs_query = fs.readFileSync("services/commons/queries/dbp/albums_for_song.rq", "utf-8");
const artists_for_album_query = fs.readFileSync("services/commons/queries/dbp/artists_for_album.rq", "utf-8");
const all_artists_query = fs.readFileSync("services/commons/queries/muser/all_artists.rq", "utf-8");
const artists_without_query = fs.readFileSync("services/commons/queries/muser/artists_without_spotify.rq", "utf-8");
const songs_without_query = fs.readFileSync("services/commons/queries/muser/songs_without_spotify.rq", "utf-8");
const albums_without_query = fs.readFileSync("services/commons/queries/muser/albums_without_spotify.rq", "utf-8");
const artists_without_songkick = fs.readFileSync("services/commons/queries/muser/artists_without_songkick.rq", "utf-8");
const find_artists = fs.readFileSync("services/commons/queries/muser/find_artists.rq", "utf-8");
const find_albums = fs.readFileSync("services/commons/queries/muser/find_albums.rq", "utf-8");


const QUERY = {
    GENRE_INFO: 0,
    GENRES_FOR_ENTITY: 1,
    SONG_INFO: 2,
    SONGS_FOR_ARTIST: 3,
    ARTIST_INFO: 4,
    ARTISTS_RELATED_FOR_ARTIST: 5,
    ALBUM_INFO: 6,
    ALBUMS_FOR_SONG: 7,
    ARTISTS_FOR_ALBUM: 8,
    ALL_ARTISTS: 9,
    ARTISTS_WITHOUT_SPOTIFY: 10,
    SONGS_WITHOUT_SPOTIFY: 11,
    ALBUM_WITHOUT_SPOTIFY: 12,
    ARTISTS_WITHOUT_SONGKICK: 13,
    FIND_ARTISTS: 14,
    FIND_ALBUMS: 15,
};

function stringTemplate(literal, params = "") {
    return new Function(params, "return `" + literal + "`;");
}

class QueryFactory {

    constructor() {

    }

    static get GENRE_INFO() {
        return QUERY.GENRE_INFO;
    }

    static get GENRES_FOR_ENTITY() {
        return QUERY.GENRES_FOR_ENTITY;
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

    static get ARTISTS_FOR_ALBUM() {
        return QUERY.ARTISTS_FOR_ALBUM;
    }

    static get ALL_ARTISTS() {
        return QUERY.ALL_ARTISTS;
    }

    static get ARTISTS_WITHOUT_SPOTIFY() {
        return QUERY.ARTISTS_WITHOUT_SPOTIFY;
    }

    static get SONGS_WITHOUT_SPOTIFY() {
        return QUERY.SONGS_WITHOUT_SPOTIFY;
    }

    static get ALBUMS_WITHOUT_SPOTIFY() {
        return QUERY.ALBUM_WITHOUT_SPOTIFY;
    }

    static get ARTISTS_WITHOUT_SONGKICK() {
        return QUERY.ARTISTS_WITHOUT_SONGKICK;
    }

    static get FIND_ARTISTS() {
        return QUERY.FIND_ARTISTS;
    }

    static get FIND_ALBUMS() {
        return QUERY.FIND_ALBUMS;
    }

    getQuery(queryType, entityValue = undefined) {
        switch (queryType) {
            case QueryFactory.GENRE_INFO:
                return this.buildQuery(genre_info_query, entityValue);
            case QueryFactory.GENRES_FOR_ENTITY:
                return this.buildQuery(genres_for_entity_query, entityValue);
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
            case QueryFactory.ARTISTS_FOR_ALBUM:
                return this.buildQuery(artists_for_album_query, entityValue);
            case QueryFactory.ALL_ARTISTS:
                return this.buildQuery(all_artists_query, entityValue);
            case QueryFactory.ARTISTS_WITHOUT_SPOTIFY:
                return this.buildQuery(artists_without_query, entityValue);
            case QueryFactory.SONGS_WITHOUT_SPOTIFY:
                return this.buildQuery(songs_without_query, entityValue);
            case QueryFactory.ALBUMS_WITHOUT_SPOTIFY:
                return this.buildQuery(albums_without_query, entityValue);
            case QueryFactory.ARTISTS_WITHOUT_SONGKICK:
                return this.buildQuery(artists_without_songkick, entityValue);
            case QueryFactory.FIND_ARTISTS:
                return this.buildQuery2(find_artists, entityValue);
            case QueryFactory.FIND_ALBUMS:
                return this.buildQuery2(find_albums, entityValue);
        }
    }

    buildQuery(query, entityValue = undefined) {
        if (!entityValue) {
            return query;
        }
        const interpolationValue = entityValue.startsWith('http://') ? `<${entityValue}>` : `${entityValue}`;
        return stringTemplate(query, "dbpInstance")(interpolationValue);
    }

    buildQuery2(query, values) {
        return dot.template(query)(values);
    }

}

module.exports = QueryFactory;