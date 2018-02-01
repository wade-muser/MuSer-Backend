const async = require("async");
const shuffle = require("shuffle-array");
const HttpResponse = require("../../commons/utils/http_response");
const HTTP_STATUS_CODES = require("../../commons/utils/http_status_codes");

const PlaylistsService = require("./playlists_service");
const SongsService = require("../songs/songs_service");
const ArtistsService = require("../artists/artists_service");

const playlistsService = new PlaylistsService();
const songsService = new SongsService();
const artistsService = new ArtistsService();

module.exports.createPlaylist = (event, context, callback) => {
    if (!event.body) {
        const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
            .statusCode(HTTP_STATUS_CODES.BAD_REQUEST)
            .body({
                message: "Body wasn't provided"
            })
            .build()
            .getLambdaResponse();

        console.log("[PLAYLISTS] CREATE Response:", AWSLambdaResponse);

        callback(null, AWSLambdaResponse);
        return;
    }

    event.body = JSON.parse(event.body);
    const name = event.body.name;
    const emailCreator = event.body.emailCreator;

    playlistsService.createPlaylist(name, emailCreator)
        .then(res => {
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.OK)
                .body({
                    results: res
                })
                .build()
                .getLambdaResponse();

            console.log("[PLAYLISTS] CREATE Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        })
        .catch(err => {
            console.log(err);

            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(err.httpStatusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .body({
                    message: "Some error occurred",
                })
                .build()
                .getLambdaResponse();

            console.log("[PLAYLISTS] CREATE Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });

}; // createPlaylist

module.exports.getPlaylists = (event, context, callback) => {
    if (!event.queryStringParameters) {
        const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
            .statusCode(HTTP_STATUS_CODES.BAD_REQUEST)
            .body({
                message: "Query Parameters weren't provided"
            })
            .build()
            .getLambdaResponse();

        console.log("[PLAYLISTS] GET Response:", AWSLambdaResponse);
        callback(null, AWSLambdaResponse);
        return;
    }

    const emailCreator = event.queryStringParameters.emailCreator;

    playlistsService.getPlaylists(emailCreator)
        .then(res => {
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.OK)
                .body({
                    results: res
                })
                .build()
                .getLambdaResponse();

            console.log("[PLAYLISTS] GET Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        })
        .catch(err => {
            console.log(err);

            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(err.httpStatusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .body({
                    message: "Some error occurred",
                })
                .build()
                .getLambdaResponse();

            console.log("[PLAYLISTS] GET Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });
}; // getPlaylists

module.exports.getPlaylist = (event, context, callback) => {
    if (!event.pathParameters) {
        const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
            .statusCode(HTTP_STATUS_CODES.BAD_REQUEST)
            .body({
                message: "Path Parameters weren't provided"
            })
            .build()
            .getLambdaResponse();

        console.log("[PLAYLISTS] GET id Response:", AWSLambdaResponse);
        callback(null, AWSLambdaResponse);
        return;
    }

    const id = event.pathParameters.id;

    playlistsService.getPlaylist(id)
        .then(res => {
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.OK)
                .body({
                    results: res
                })
                .build()
                .getLambdaResponse();

            console.log("[PLAYLISTS] GET id Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        })
        .catch(err => {
            console.log(err);

            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(err.httpStatusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .body({
                    message: "Some error occurred",
                })
                .build()
                .getLambdaResponse();

            console.log("[PLAYLISTS] GET id Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });
}; // getPlaylist

module.exports.deletePlaylist = (event, context, callback) => {
    if (!event.pathParameters) {
        const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
            .statusCode(HTTP_STATUS_CODES.BAD_REQUEST)
            .body({
                message: "Path Parameters weren't provided"
            })
            .build()
            .getLambdaResponse();

        console.log("[PLAYLISTS] DELETE id Response:", AWSLambdaResponse);
        callback(null, AWSLambdaResponse);
        return;
    }

    const id = event.pathParameters.id;

    playlistsService.deletePlaylist(id)
        .then(res => {
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.OK)
                .body({
                    results: res
                })
                .build()
                .getLambdaResponse();

            console.log("[PLAYLISTS] DELETE id Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        })
        .catch(err => {
            console.log(err);

            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(err.httpStatusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .body({
                    message: "Some error occurred",
                })
                .build()
                .getLambdaResponse();

            console.log("[PLAYLISTS] DELETE id Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });
}; // deletePlaylist

module.exports.insertPlaylistSong = (event, context, mainCallback) => {
    if (!event.body || !event.pathParameters) {
        const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
            .statusCode(HTTP_STATUS_CODES.BAD_REQUEST)
            .body({
                message: "Body or Path Parameters wasn't provided"
            })
            .build()
            .getLambdaResponse();

        console.log("[PLAYLISTS] INSERT id/songs Response:", AWSLambdaResponse);

        mainCallback(null, AWSLambdaResponse);
        return;
    }

    event.body = JSON.parse(event.body);
    const id = event.pathParameters.id;
    const idSong = event.body.idSong;

    async.waterfall([
        // Check if song exists
        (callback) => {
            songsService.getSong(idSong)
                .then(res => {
                    sExists = Object.keys(res).length !== 0;
                    callback(null, sExists, false);
                })
                .catch(err => {
                    console.error(err);
                    callback(err);
                    return;
                });
        },

        // Check if playlist exists
        (songExists, playlistExists, callback) => {
            playlistsService.getPlaylist(id)
                .then(res => {
                    pExists = Object.keys(res).length !== 0;
                    callback(null, sExists, pExists);
                })
                .catch(err => {
                    console.error(err);
                    callback(err);
                    return;
                });
        },

        // insert if both exist
        (songExists, playlistExists, callback) => {
            if (!songExists) {
                const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                    .statusCode(HTTP_STATUS_CODES.PRECONDITION_FAILED)
                    .body({
                        message: `Song with id ${idSong} does not exist`,
                    })
                    .build()
                    .getLambdaResponse();

                console.log("[PLAYLISTS] INSERT id/songs Response:", AWSLambdaResponse);
                mainCallback(null, AWSLambdaResponse);
                return;
            }

            if (!playlistExists) {
                const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                    .statusCode(HTTP_STATUS_CODES.PRECONDITION_FAILED)
                    .body({
                        message: `Playlist with id ${id} does not exist`,
                    })
                    .build()
                    .getLambdaResponse();

                console.log("[PLAYLISTS] INSERT id/songs Response:", AWSLambdaResponse);
                mainCallback(null, AWSLambdaResponse);
                return;
            }

            playlistsService.insertPlaylistSong(id, idSong)
                .then(res => {
                    const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                        .statusCode(HTTP_STATUS_CODES.OK)
                        .body({
                            results: res
                        })
                        .build()
                        .getLambdaResponse();

                    console.log("[PLAYLISTS] INSERT id/songs Response:", AWSLambdaResponse);
                    mainCallback(null, AWSLambdaResponse);
                    return;
                })
                .catch(err => {
                    console.log(err);

                    const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                        .statusCode(err.httpStatusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                        .body({
                            message: "Some error occurred",
                        })
                        .build()
                        .getLambdaResponse();

                    console.log("[PLAYLISTS] INSERT id/songs Response:", AWSLambdaResponse);
                    mainCallback(null, AWSLambdaResponse);
                    return;
                });
        },
    ], (err, res) => {
        if (err) {
            console.error(err);

            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(err.httpStatusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .body({
                    message: "Some error occurred",
                })
                .build()
                .getLambdaResponse();

            console.log("[PLAYLISTS] INSERT id/songs Response:", AWSLambdaResponse);
            mainCallback(null, AWSLambdaResponse);
            return;
        }
    });
}; // insertPlaylistSong

module.exports.getPlaylistSongs = (event, context, callback) => {
    if (!event.pathParameters) {
        const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
            .statusCode(HTTP_STATUS_CODES.BAD_REQUEST)
            .body({
                message: "Path Parameters weren't provided"
            })
            .build()
            .getLambdaResponse();

        console.log("[PLAYLISTS] GET Response:", AWSLambdaResponse);
        callback(null, AWSLambdaResponse);
        return;
    }

    const id = event.pathParameters.id;

    playlistsService.getPlaylistSongs(id)
        .then(res => {
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.OK)
                .body({
                    results: res
                })
                .build()
                .getLambdaResponse();

            console.log("[PLAYLISTS] GET id/songs Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        })
        .catch(err => {
            console.log(err);

            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(err.httpStatusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .body({
                    message: "Some error occurred",
                })
                .build()
                .getLambdaResponse();

            console.log("[PLAYLISTS] GET id/songs Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });
}; // getPlaylistSongs

module.exports.deletePlaylistSong = (event, context, callback) => {
    if (!event.pathParameters) {
        const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
            .statusCode(HTTP_STATUS_CODES.BAD_REQUEST)
            .body({
                message: "Path Parameters weren't provided"
            })
            .build()
            .getLambdaResponse();

        console.log("[PLAYLISTS] DELETE id/songs/id Response:", AWSLambdaResponse);
        callback(null, AWSLambdaResponse);
        return;
    }

    const id = event.pathParameters.id;
    const idSong = event.pathParameters.idSong;

    playlistsService.deletePlaylistSong(id, idSong)
        .then(res => {
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.OK)
                .body({
                    results: res
                })
                .build()
                .getLambdaResponse();

            console.log("[PLAYLISTS] DELETE id/songs/id Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        })
        .catch(err => {
            console.log(err);

            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(err.httpStatusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .body({
                    message: "Some error occurred",
                })
                .build()
                .getLambdaResponse();

            console.log("[PLAYLISTS] DELETE id/songs/id Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });
}; // deletePlaylist

module.exports.smartGeneration = (event, context, mainCallback) => {
    if (!event.body) {
        const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
            .statusCode(HTTP_STATUS_CODES.BAD_REQUEST)
            .body({
                message: "Body wasn't provided"
            })
            .build()
            .getLambdaResponse();

        console.log("[PLAYLISTS] POST smartgens Response:", AWSLambdaResponse);
        mainCallback(null, AWSLambdaResponse);
        return;
    }

    event.body = JSON.parse(event.body);
    const artists = event.body.artists;
    const emailCreator = event.body.emailCreator;


    async.waterfall([
        // get songs of all keywords-artists
        (callback) => {
            async.map(artists, (artist, eachArtistCallback) => {
                artistsService.getArtistSongs(artist)
                    .then(res => {
                        Object.keys(res).forEach(songEntity => {
                            res[songEntity].artist = [artist];
                        });

                        eachArtistCallback(null, res);
                    })
                    .catch(err => {
                        console.error(err);
                        eachArtistCallback(err);
                    });
            }, (err, allSongsList) => {
                if (err) {
                    console.log(err);
                    callback(err);
                    return;
                }
                let allArtistsSongs = {};

                allSongsList.forEach(songsDict => {
                    Object.keys(songsDict).forEach(songEntity => {
                        if (allArtistsSongs[songEntity] === undefined) {
                            allArtistsSongs[songEntity] = songsDict[songEntity];
                        }
                    });
                });

                callback(null, allArtistsSongs);
            }); // async.map
        },

        // get all playlists of user
        (songs1, callback) => {
            playlistsService.getPlaylists(emailCreator)
                .then(res => {
                    let playlists = [];
                    Object.keys(res).forEach(fullPlaylistEntity => {
                        playlists.push(fullPlaylistEntity.split("#")[1]);
                    });

                    callback(null, songs1, playlists);
                })
                .catch(err => {
                    console.error(err);
                    callback(err);
                    return;
                });
        },

        // get all songs of all playlists of user
        (songs1, playlists, callback) => {
            async.map(playlists, (playlist, eachPlaylistCallback) => {
                playlistsService.getPlaylistSongs(playlist)
                    .then(res => {
                        eachPlaylistCallback(null, res);
                    })
                    .catch(err => {
                        console.error(err);
                        callback(err);
                        return;
                    });
            }, (err, allSongsList) => {
                if (err) {
                    console.error(err);
                    callback(err);
                    return;
                }
                let allArtistsSongs = {};
                allSongsList.forEach(songsDict => {
                    Object.keys(songsDict).forEach(songEntity => {
                        if (allArtistsSongs[songEntity] === undefined) {
                            allArtistsSongs[songEntity] = songsDict[songEntity];
                        }
                    });
                });

                callback(null, songs1, allArtistsSongs);
            });
        },

        // get song recommendations for all songs of all playlists of user
        (songs1, songs, callback) => {
            let shortNameSongs = [];
            Object.keys(songs).forEach(song => {
                shortNameSongs.push(song.split("#")[1]);
            });

            async.map(shortNameSongs, (song, eachSongCallback) => {
                songsService.getSongRecommendations(song, "artist")
                    .then(res => {
                        eachSongCallback(null, res);
                    })
                    .catch(err => {
                        console.error(err);
                        eachSongCallback(err);
                        return;
                    });
            }, (err, allSongsList) => {
                if (err) {
                    console.error(err);
                    callback(err);
                    return;
                }
                let allArtistsSongs = {};
                allSongsList.forEach(songsDict => {
                    Object.keys(songsDict).forEach(songEntity => {
                        if (allArtistsSongs[songEntity] === undefined) {
                            allArtistsSongs[songEntity] = songsDict[songEntity];
                        }
                    });
                });

                callback(null, songs1, allArtistsSongs);
            });
        },

        // randomize and minimize
        (songs1, songs2, callback) => {
            let results = Object.assign({}, songs1, songs2);
            const songs = shuffle(Object.keys(results));

            const randomResults = {};
            for (let i = 0; i < 15 && i < songs.length; i++) {
                randomResults[songs[i]] = results[songs[i]];
            }

            callback(null, randomResults);
        }
    ], (err, results) => {
        if (err) {
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.BAD_REQUEST)
                .body({
                    message: "Body wasn't provided"
                })
                .build()
                .getLambdaResponse();

            console.log("[PLAYLISTS] POST smartgens Response:", AWSLambdaResponse);
            mainCallback(null, AWSLambdaResponse);
            return;
        }

        const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
            .statusCode(HTTP_STATUS_CODES.OK)
            .body({
                results: results
            })
            .build()
            .getLambdaResponse();

        console.log("[PLAYLISTS] POST smartgens Response:", AWSLambdaResponse);
        mainCallback(null, AWSLambdaResponse);
    });
};


// timeline input