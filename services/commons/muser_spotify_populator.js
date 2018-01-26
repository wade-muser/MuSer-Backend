const async = require('async');
const SpotifyService = require("./spotify_service");
const GraphDBMuserService = require("./graphdb_muser_service");




class MuserSpotifyPopulator {

    constructor() {
        this.spotifyService = new SpotifyService();
        this.graphdbMuserService = new GraphDBMuserService();
    }

    addArtistsInfo() {
        const promisified_function = (resolve, reject) => {
            async.waterfall([

                (callback) => {
                    this.spotifyService.authorize()
                        .then(() => {
                            callback(null);
                            console.log("Authorized");
                        })
                        .catch(err => {
                            console.error(err);
                            callback(err);
                        });
                },

                (callback) => {
                    this.graphdbMuserService.findArtistsWithoutSpotify()
                        .then(data => {
                            callback(null, data);
                        })
                        .catch(err => {
                            callback(err);
                        });
                },

                (artists, callback) => {
                    console.log("Retrieved artists:" + Object.keys(artists).length);
                    const results = {};

                    async.each(Object.keys(artists),
                        (artist, eachArtistCallback) => {
                            const artistName = artists[artist].name[0].toLowerCase();
                            console.log(`Retrieve spotify info about:${artistName}`);

                            this.spotifyService.searchArtist(artistName)
                                .then(data => {
                                    if (data) {
                                        const result = {
                                            "idSpotify": data.external_urls.spotify,
                                        };
                                        if (data.images.length != 0) {
                                            result.imageURL = data.images[1].url;
                                        }
                                        results[artist] = result;
                                    }
                                    eachArtistCallback(null);
                                })
                                .catch(err => {
                                    console.error(err);
                                    eachArtistCallback(err);
                                });
                        }, (err) => {
                            if (err) {
                                console.error(err);
                                callback(err);
                                return;
                            }
                            console.log("Retrieved info about all artists");
                            callback(null, results);
                        });
                },

                (artistsInfo, callback) => {
                    console.log("Retrieved artists:" + Object.keys(artistsInfo).length);
                    console.log("Build insert statements");
                    const statements = this.graphdbMuserService.buildStatementFromAPIResponse(artistsInfo);
                    callback(null, statements);
                },

                (statements, callback) => {
                    if (statements.length === 0) {
                        console.log("No statements to insert");
                        callback(null);
                        return;
                    }

                    this.graphdbMuserService.getQueryInsert(statements).execute()
                        .then(response => {
                            console.log("Inserted Spotify info for artists");
                            callback(null);
                        })
                        .catch(err => {
                            console.error(err);
                            callback(err);
                        });
                }

            ], (err, results) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                console.log("Artist Info Chain had finished");
                resolve();
            });
        };

        return new Promise(promisified_function);
    }

    addSongsInfo() {
        const promisified_function = (resolve, reject) => {
            async.waterfall([

                (callback) => {
                    this.spotifyService.authorize()
                        .then(() => {
                            callback(null);
                            console.log("Authorized");
                        })
                        .catch(err => {
                            console.error(err);
                            callback(err);
                        });
                },

                (callback) => {
                    this.graphdbMuserService.findSongWithoutSpotify()
                        .then(data => {
                            callback(null, data);
                        })
                        .catch(err => {
                            console.error(err);
                            callback(err);
                        });
                },

                (songs, callback) => {
                    console.log("Retrieved  songs:" + Object.keys(songs).length);
                    const results = {};

                    async.each(Object.keys(songs),
                        (song, eachSongCallback) => {
                            const songName = songs[song].name[0].toLowerCase();
                            const artistName = songs[song].artistName[0].toLowerCase();

                            this.spotifyService.searchTrack(songName, artistName)
                                .then(data => {
                                    if (data) {
                                        const result = {
                                            "idSpotify": data.external_urls.spotify,
                                        };
                                        if (data.album.images.length != 0) {
                                            result.imageURL = data.album.images[1].url;
                                        }
                                        results[song] = result;
                                    }
                                    eachSongCallback(null);
                                })
                                .catch(err => {
                                    console.error(err);
                                    eachSongCallback(err);
                                });

                        }, (err) => {
                            if (err) {
                                console.error(err);
                                callback(err);
                                return;
                            }
                            console.log("Retrieved info about all songs");
                            callback(null, results);
                        });
                },

                (songsInfo, callback) => {
                    console.log("Retrieved songs`:", Object.keys(songsInfo).length);
                    console.log("Build insert statements");
                    const statements = this.graphdbMuserService.buildStatementFromAPIResponse(songsInfo);
                    callback(null, statements);
                },

                (statements, callback) => {
                    if (statements.length === 0) {
                        console.log("No statements to insert");
                        callback(null);
                        return;
                    }

                    this.graphdbMuserService.getQueryInsert(statements).execute()
                        .then(response => {
                            console.log("Inserted Spotify info for artists");
                            callback(null);
                        })
                        .catch(err => {
                            console.error(err);
                            callback(err);
                        });
                }


            ], (err, results) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                console.log("Song Info Chain had finished");
                resolve();
            });
        }

        return new Promise(promisified_function);
    }

    addAlbumsInfo() {
        const promisified_function = (resolve, reject) => {
            async.waterfall([

                (callback) => {
                    this.spotifyService.authorize()
                        .then(() => {
                            callback(null);
                            console.log("Authorized");
                        })
                        .catch(err => {
                            console.error(err);
                            callback(err);
                        });
                },

                (callback) => {
                    this.graphdbMuserService.findAlbumsWithoutSpotify()
                        .then(data => {
                            callback(null, data);
                        })
                        .catch(err => {
                            console.error(err);
                            callback(err);
                        });
                },

                (albums, callback) => {
                    console.log("Retrieved Albums:" + Object.keys(albums).length);
                    const results = {};

                    async.each(Object.keys(albums),
                        (album, eachAlbumCallback) => {
                            const albumName = albums[album].name[0].toLowerCase();
                            const artistName = albums[album].artistName[0].toLowerCase();
                            console.log("Seach query:" + albumName + " " + artistName);

                            this.spotifyService.searchAlbum(albumName, artistName)
                                .then(data => {
                                    if (data) {
                                        const result = {
                                            "idSpotify": data.external_urls.spotify,
                                        };
                                        if (data.images.length != 0) {
                                            result.imageURL = data.images[1].url;
                                        }
                                        results[album] = result;
                                    }
                                    eachAlbumCallback(null);
                                })
                                .catch(err => {
                                    console.error(err);
                                    eachAlbumCallback(err);
                                });
                        }, (err) => {
                            if (err) {
                                console.error(err);
                                callback(err);
                                return;
                            }
                            console.log("Retrieved info about all albums");
                            callback(null, results);
                        }
                    );
                },

                (albumsInfo, callback) => {
                    console.log("Retrieved albums:", Object.keys(albumsInfo).length);
                    console.log("Build insert statements");
                    const statements = this.graphdbMuserService.buildStatementFromAPIResponse(albumsInfo);
                    callback(null, statements);
                },

                (statemens, callback) => {
                    if (statemens.length === 0) {
                        console.log("No statements to insert");
                        callback(null);
                        return;
                    }

                    this.graphdbMuserService.getQueryInsert(statemens).execute()
                        .then(response => {
                            console.log("Inserted Spotify info for albums");
                            callback(null);
                        })
                        .catch(err => {
                            console.error(err);
                            callback(err);
                        });
                }

            ], (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                console.log("Albums Info Chain had finished");
                resolve();
            });
        }

        return new Promise(promisified_function);
    }

}

module.exports = MuserSpotifyPopulator;