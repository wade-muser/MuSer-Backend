const async = require('async');

const GraphdbMuserService = require('./graphdb_muser_service');
const SparqlQueryFactory = require('./sparql_query_factory');
const SparqlService = require('./sparql_service');

const MAPS = require('./mappings');
const DBP_SPARQL_ENDPOINT = 'http://dbpedia.org/sparql';

class MuserPopulater {
    constructor() {
        this.sparqlQueryFactory = new SparqlQueryFactory();
        this.dbpediaService = new SparqlService(DBP_SPARQL_ENDPOINT, undefined, [MAPS.prefixes.common, MAPS.prefixes.dbp, MAPS.prefixes.muser]);
        this.graphdbMuserService = new GraphdbMuserService();
    }

    getArtistInfo(artist) {
        let promisifiedFunction = (resolve, reject) => {
            const query = this.sparqlQueryFactory.getQuery(SparqlQueryFactory.ARTIST_INFO, artist);

            this.dbpediaService.getQueryResults(query, artist)
                .then((results) => {
                    const statements = this.dbpediaService.getStatements(results, MAPS.prefixes.muser.muser);

                    
                    let artistLabel = results[artist.replace(/[<>]/g, '')].label[0]
                    let rdfSubject = SparqlService.getCleanUniqueIdentifier(MAPS.prefixes.muser.muser, artistLabel);
                    
                    resolve({statements, rdfSubject});
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisifiedFunction);
    }

    getAlbumInfo(album) {
        let promisifiedFunction = (resolve, reject) => {
            const query = this.sparqlQueryFactory.getQuery(SparqlQueryFactory.ALBUM_INFO, album);
            
            this.dbpediaService.getQueryResults(query, album)
                .then((results) => {
                    const statements = this.dbpediaService.getStatements(results, MAPS.prefixes.muser.muser);
                    resolve(statements);
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisifiedFunction);
    }

    getSongsForArtist(artist) {
        let promisifiedFunction = (resolve, reject) => {
            const query = this.sparqlQueryFactory.getQuery(SparqlQueryFactory.SONGS_FOR_ARTIST, artist);
            
            this.dbpediaService.getQueryResults(query, artist)
                .then((results) => {
                    const statements = this.dbpediaService.getStatements(results, MAPS.prefixes.muser.muser);
                    const songs = Object.keys(results);
                    
                    resolve({statements, songs});
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisifiedFunction);
    }

    getAlbumsForSong(song) {
        let promisifiedFunction = (resolve, reject) => {
            const query = this.sparqlQueryFactory.getQuery(SparqlQueryFactory.ALBUMS_FOR_SONG, song);
            
            this.dbpediaService.getQueryResults(query, song)
                .then((results) => {
                    const statements = this.dbpediaService.getStatements(results, MAPS.prefixes.muser.muser);
                    const albums = Object.keys(results);
                    
                    resolve({statements, albums});
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisifiedFunction);
    }

    getSongInfo(song) {
        let promisifiedFunction = (resolve, reject) => {
            const query = this.sparqlQueryFactory.getQuery(SparqlQueryFactory.SONG_INFO, song);
            
            this.dbpediaService.getQueryResults(query, song)
                .then((results) => {
                    const statements = this.dbpediaService.getStatements(results, MAPS.prefixes.muser.muser);

                    resolve(statements);
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisifiedFunction);
    }

    getGenreInfo(genre) {
        let promisifiedFunction = (resolve, reject) => {
            const query = this.sparqlQueryFactory.getQuery(SparqlQueryFactory.GENRE_INFO, genre);
            
            this.dbpediaService.getQueryResults(query, genre)
                .then((results) => {
                    const statements = this.dbpediaService.getStatements(results, MAPS.prefixes.muser.muser);

                    resolve(statements);
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisifiedFunction);
    }

    getGenresForEntity(entity) {
        let promisifiedFunction = (resolve, reject) => {
            const query = this.sparqlQueryFactory.getQuery(SparqlQueryFactory.GENRES_FOR_ENTITY, entity);
            
            this.dbpediaService.getQueryResults(query, entity)
                .then((results) => {
                    const statements = this.dbpediaService.getStatements(results, MAPS.prefixes.muser.muser);
                    const genres = Object.keys(results);

                    // console.log("For entity :::" + entity);
                    // console.log(statements);
                    // console.log(genres);
                    resolve({statements, genres});
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisifiedFunction);
    }

    getArtistsForAlbum(album) {
        let promisifiedFunction = (resolve, reject) => {
            const query = this.sparqlQueryFactory.getQuery(SparqlQueryFactory.ARTISTS_FOR_ALBUM, album);
            
            this.dbpediaService.getQueryResults(query, album)
                .then((results) => {
                    const statements = this.dbpediaService.getStatements(results, MAPS.prefixes.muser.muser);
                    const artists = Object.keys(results);

                    // console.log("For entity :::" + entity);
                    // console.log(statements);
                    // console.log(genres);
                    resolve({statements, artists});
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisifiedFunction);
    }

    getArtistsRelatedForArtist(artist) {
        let promisifiedFunction = (resolve, reject) => {
            const query = this.sparqlQueryFactory.getQuery(SparqlQueryFactory.ARTISTS_RELATED_FOR_ARTIST, artist);
            
            this.dbpediaService.getQueryResults(query, artist)
                .then((results) => {
                    const statements = this.dbpediaService.getStatements(results, MAPS.prefixes.muser.muser);
                    const artists = Object.keys(results);

                    // console.log("For entity :::" + entity);
                    // console.log(statements);
                    // console.log(genres);
                    resolve({statements, artists});
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisifiedFunction);
    }

    populate(artist) {  
        let mainRdfSubject;

        async.waterfall([
            (callback) => {
                this.getArtistInfo(artist)
                    .then(({statements, rdfSubject}) => {
                        console.log("\n   Insert artist info " + artist);
                        // console.log(statements);
                        this.graphdbMuserService.getQueryInsert(statements)
                            .execute()
                            .then(response => {
                                console.log("Inserted artist info = " + artist);
                            })
                            .catch(err => {
                                callback(err);
                            });
                        
                        mainRdfSubject = rdfSubject;
                        callback(null);
                    })
                    .catch((err) => {
                        console.error(err);
                        callback(err);
                    });
                
            },
            (callback) => {
                this.getSongsForArtist(artist)
                    .then(({statements, songs}) => {
                        // console.log("\n   Get songs for = " + artist);
                        console.log(statements);
                        
                        this.graphdbMuserService.getQueryInsert(statements)
                            .execute()
                            .then(response => {
                                // console.log("Inserted songs for = " + artist);
                            })
                            .catch(err => {
                                callback(err);
                            });

                        // console.log(songs);
                        return songs;
                    })
                    .then((songs) => {
                        async.each(songs, (song, eachSongCallback) => {
                            this.getSongInfo(song)
                                .then((songsStatements) => {
                                    // console.log("\n     Insert these (songs info) = " + song);
                                    
                                    songsStatements.push([{
                                        s:songsStatements[0][0].s,
                                        p: 'rdf:type',
                                        o: 'muser:Song',
                                    }]);
                                    songsStatements.push([{
                                        s: mainRdfSubject,
                                        p: MAPS.varToMuser.performs.predicate,
                                        o: songsStatements[0][0].s,
                                    }]);
                                    songsStatements.push([{
                                        o: mainRdfSubject,
                                        p: MAPS.varToMuser.performedBy.predicate,
                                        s: songsStatements[0][0].s,
                                    }]);
                                    
                                    console.log(songsStatements);
                                    this.graphdbMuserService.getQueryInsert(songsStatements)
                                        .execute()
                                        .then(response => {
                                            // console.log("Inserted song info = " + song);
                                        })
                                        .catch(err => {
                                            callback(err);
                                        });
                                    
                                    eachSongCallback();
                                })
                                .catch((err) => {
                                    eachSongCallback(err);
                                });
                        }, (err) => {
                            if (err) {
                                console.error(err);
                                callback(err);
                                return;
                            }
                        });

                        callback(null, songs);
                    })
                    .catch((err) => {
                        console.error(err);
                        callback(err);
                    });
            },
            (songs, callback) => {
                async.map(songs, (song, eachSongCallback) => {
                    this.getGenresForEntity(song)
                        .then(({genresStatements, genres}) => {
                            // console.log("\n   Insert these (song Genres)");  
                            // console.log("\n   Insert these (artist Genres)");

                            // console.log(genres);
                            eachSongCallback(null, genres);
                        })
                        .catch((err) => {
                            console.error(err);
                            eachSongCallback(err);
                        });
                }, (err, allGenresList) => {
                    let allGenres = new Set();

                    allGenresList.forEach(genresList => {
                        genresList.forEach(genre => {
                            allGenres.add(genre);
                        });
                    });

                    if (err) {
                        console.error(err);
                        callback(err);
                        return;
                    }
                    callback(null, songs, Array.from(allGenres));
                });
            },
            (songs, genres, callback) => {
                // console.log(genres);
                async.each(genres, (genre, eachGenreCallback) => {
                    this.getGenreInfo(genre)
                        .then((genresStatements) => {
                            // console.log("\n     Insert these (genre info)");
                            // console.log(genresStatements);
                            eachGenreCallback(null);
                        })
                        .catch((err) => {
                            eachGenreCallback(err);
                        });
                }, (err) => {
                    if (err) {
                        console.error(err);
                        callback(err);
                    }
                });
                callback(null, songs);
            },
            (songs, callback) => {
                // console.log(songs);
                async.map(songs, (song, eachSongCallback) => {
                    this.getAlbumsForSong(song)
                        .then(({albumsStatements, albums}) => {
                            // console.log("\n   Insert these (song Albums)");  

                            // console.log(albums);
                            eachSongCallback(null, albums);
                        })
                        .catch((err) => {
                            console.error(err);
                            eachSongCallback(err);
                        });
                }, (err, allAlbumsList) => {
                    let allAlbums = new Set();

                    allAlbumsList.forEach(albumsList => {
                        albumsList.forEach(album => {
                            allAlbums.add(album);
                        });
                    });

                    if (err) {
                        console.error(err);
                        callback(err);
                        return;
                    }
                    callback(null, Array.from(allAlbums));
                });
            },
            (albums, callback) => {
                // console.log(albums);

                async.each(albums, (album, eachAlbumCallback) => {
                    this.getAlbumInfo(album)
                        .then((albumsStatements) => {
                            // console.log("\n     Insert these (album info)");
                            // console.log(albumsStatements);
                            eachAlbumCallback(null);
                        })
                        .catch((err) => {
                            eachAlbumCallback(err);
                        });
                }, (err) => {
                    if (err) {
                        console.error(err);
                        callback(err);
                    }
                });
                callback(null, albums);
            },
            (albums, callback) => {
                async.map(albums, (album, eachAlbumCallback) => {
                    this.getGenresForEntity(album)
                        .then(({genresStatements, genres}) => {
                            // console.log("\n   Insert these (album Genres)");  
                            // console.log("\n   Insert these (artist Genres)");

                            // console.log(genres);
                            eachAlbumCallback(null, genres);
                        })
                        .catch((err) => {
                            console.error(err);
                            eachAlbumCallback(err);
                        });
                }, (err, allGenresList) => {
                    let allGenres = new Set();

                    allGenresList.forEach(genresList => {
                        genresList.forEach(genre => {
                            allGenres.add(genre);
                        });
                    });

                    if (err) {
                        console.error(err);
                        callback(err);
                        return;
                    }
                    callback(null, albums, Array.from(allGenres));
                });
            },
            (albums, genres, callback) => {
                // console.log(genres);
                async.each(genres, (genre, eachGenreCallback) => {
                    this.getGenreInfo(genre)
                        .then((genresStatements) => {
                            // console.log("\n     Insert these (genre info)");
                            // console.log(genresStatements);
                            eachGenreCallback(null);
                        })
                        .catch((err) => {
                            eachGenreCallback(err);
                        });
                }, (err) => {
                    if (err) {
                        console.error(err);
                        callback(err);
                    }
                });
                callback(null, albums);
            },//wat2
            (albums, callback) => {
                async.map(albums, (album, eachAlbumCallback) => {
                    this.getArtistsForAlbum(album)
                        .then(({artistsStatements, artists}) => {
                            // console.log("\n   Insert these (album Artists)");  

                            // console.log(genres);
                            eachAlbumCallback(null, artists);
                        })
                        .catch((err) => {
                            console.error(err);
                            eachAlbumCallback(err);
                        });
                }, (err, allArtistsList) => {
                    let allArtists = new Set();

                    allArtistsList.forEach(artistsList => {
                        artistsList.forEach(genre => {
                            allArtists.add(genre);
                        });
                    });

                    if (err) {
                        console.error(err);
                        callback(err);
                        return;
                    }
                    callback(null, Array.from(allArtists));
                });
            },
            (artists, callback) => {
                // console.log(artists);
                async.each(artists, (artist, eachArtistCallback) => {
                    this.getArtistInfo(artist)
                        .then((artistsStatements) => {
                            // console.log("\n     Insert these (artist info)");
                            // console.log(artistsStatements);
                            eachArtistCallback(null);
                        })
                        .catch((err) => {
                            eachArtistCallback(err);
                        });
                }, (err) => {
                    if (err) {
                        console.error(err);
                        callback(err);
                    }
                });
                callback(null);
            },
            (callback) => {
                this.getArtistsRelatedForArtist(artist)
                .then(({statements, artists}) => {
                    // console.log("\n   Insert these (artists Artist)");
                    // console.log(statements);

                    // console.log(artists);
                    callback(null, artists);
                })
                .catch((err) => {
                    if (err) {
                        console.error(err);
                        callback(err);
                        return;
                    }
                });
            },
            (artists, callback) => {
                // console.log(artists);

                async.each(artists, (relatedArtist, eachArtistCallback) => {
                    this.getArtistInfo(relatedArtist)
                        .then((statements) => {
                            // console.log("\n     Insert these (artist info)");
                            // console.log(statements);
                            eachArtistCallback(null);
                        })
                        .catch((err) => {
                            // console.log('PUUUUUUUUUUUUUUUUUUUUUUUUUUUULI + ' + relatedArtist);
                            eachArtistCallback(err);
                        });
                }, (err) => {
                    if (err) {
                        console.error(err);
                        callback(err);
                        return;
                    }
                });

                callback(null);
            },
            (callback) => {

            }
        ],
        (err, result) => {
            console.error(err);
        });
    }
};



let artist1 = '<http://dbpedia.org/resource/Cashis>';
let artist2 = '<http://dbpedia.org/resource/Eminem>';
let artist3 = '<http://dbpedia.org/resource/Queen_(band)>';
let artist4 = '<http://dbpedia.org/resource/Rage_Against_the_Machine>';

mp = new MuserPopulater();
mp.populate(artist2);