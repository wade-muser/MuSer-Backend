const fs = require('fs');
const dot = require("dot");
dot.templateSettings.strip = false;

const genre_info_query = fs.readFileSync("services/commons/queries/dbp/genre_info.rq", "utf-8");
const genres_for_entity_query = fs.readFileSync("services/commons/queries/dbp/genres_for_entity.rq", "utf-8");
const genres_related_for_genre_query = fs.readFileSync("services/commons/queries/dbp/genres_related_for_genre.rq", "utf-8");
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
const find_songs = fs.readFileSync("services/commons/queries/muser/find_songs.rq", "utf-8");
const find_event = fs.readFileSync("services/commons/queries/muser/find_event.rq", "utf-8");
const find_events = fs.readFileSync("services/commons/queries/muser/find_events.rq", "utf-8");
const find_genres = fs.readFileSync("services/commons/queries/muser/find_genres.rq", "utf-8");



const find_artist_by_id = fs.readFileSync("services/commons/queries/muser/find_artist_by_id.rq", "utf-8");
const find_song_by_id = fs.readFileSync("services/commons/queries/muser/find_song_by_id.rq", "utf-8");
const find_album_by_id = fs.readFileSync("services/commons/queries/muser/find_album_by_id.rq", "utf-8");
const find_genre_by_id = fs.readFileSync("services/commons/queries/muser/find_genre_by_id.rq", "utf-8");
const find_artist_features = fs.readFileSync("services/commons/queries/muser/find_artist_features.rq", "utf-8");

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
    FIND_SONGS: 16,
    GENRES_RELATED_FOR_GENRE: 17,
    FIND_EVENT: 18,
    FIND_EVENTS: 75,
    FIND_GENRES: 49,
    FIND_ARTIST_BY_ID: 19,
    FIND_SONG_BY_ID: 20,
    FIND_ALBUM_BY_ID: 21,
    FIND_GENRE_BY_ID: 22,
    FIND_ARTIST_FEATURES: 23,
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

    static get GENRES_RELATED_FOR_GENRE() {
        return QUERY.GENRES_RELATED_FOR_GENRE;
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

    static get FIND_SONGS() {
        return QUERY.FIND_SONGS;
    }

    static get FIND_EVENT() {
        return QUERY.FIND_EVENT;
    }

    static get FIND_EVENTS() {
        return QUERY.FIND_EVENTS;
    }

    static get FIND_GENRES() {
        return QUERY.FIND_GENRES;
    }
    static get FIND_ARTIST_BY_ID() {
        return QUERY.FIND_ARTIST_BY_ID;
    }

    static get FIND_SONG_BY_ID() {
        return QUERY.FIND_SONG_BY_ID;
    }

    static get FIND_ALBUM_BY_ID() {
        return QUERY.FIND_ALBUM_BY_ID;
    }

    static get FIND_GENRE_BY_ID() {
        return QUERY.FIND_GENRE_BY_ID;
    }

    static get FIND_ARTIST_FEATURES() {
        return QUERY.FIND_ARTIST_FEATURES;
    }

    getQuery(queryType, entityValue = undefined) {
        switch (queryType) {
            case QueryFactory.GENRE_INFO:
                return this.buildQuery(genre_info_query, entityValue);
            case QueryFactory.GENRES_FOR_ENTITY:
                return this.buildQuery(genres_for_entity_query, entityValue);
            case QueryFactory.GENRES_RELATED_FOR_GENRE:
                return this.buildQuery(genres_related_for_genre_query, entityValue);
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
            case QueryFactory.FIND_SONGS:
                return this.buildQuery2(find_songs, entityValue);
            case QueryFactory.FIND_EVENT:
                return this.buildQuery2(find_event, entityValue);
            case QueryFactory.FIND_EVENTS:
                return this.buildQuery2(find_events, entityValue);
            case QueryFactory.FIND_GENRES:
                return this.buildQuery2(find_genres, entityValue);
            case QueryFactory.FIND_ARTIST_BY_ID:
                return this.buildQuery2(find_artist_by_id, entityValue);
            case QueryFactory.FIND_SONG_BY_ID:
                return this.buildQuery2(find_song_by_id, entityValue);
            case QueryFactory.FIND_ALBUM_BY_ID:
                return this.buildQuery2(find_album_by_id, entityValue);
            case QueryFactory.FIND_GENRE_BY_ID:
                return this.buildQuery2(find_genre_by_id, entityValue);
            case QueryFactory.FIND_ARTIST_FEATURES:
                return this.buildQuery2(find_artist_features, entityValue);   
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