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
                    const {
                        statements,
                        cleanResults
                    } = this.dbpediaService.getStatements(results, MAPS.prefixes.muser.muser);


                    let artistLabel = results[artist.replace(/[<>]/g, '')].label[0];
                    let rdfSubject = SparqlService.getCleanUniqueIdentifier(MAPS.prefixes.muser.muser, artistLabel);

                    resolve({
                        statements,
                        rdfSubject
                    });
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
                    const {
                        statements,
                        cleanResults
                    } = this.dbpediaService.getStatements(results, MAPS.prefixes.muser.muser);
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
                    const {
                        statements,
                        cleanResults
                    } = this.dbpediaService.getStatements(results, MAPS.prefixes.muser.muser);
                    const songs = Object.keys(results);

                    resolve({
                        statements,
                        songs
                    });
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
                    const {
                        statements,
                        cleanResults
                    } = this.dbpediaService.getStatements(results, MAPS.prefixes.muser.muser);
                    const albums = Object.keys(results);

                    resolve({
                        statements,
                        albums
                    });
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
                    const {
                        statements,
                        cleanResults
                    } = this.dbpediaService.getStatements(results, MAPS.prefixes.muser.muser);

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
                    const {
                        statements,
                        cleanResults
                    } = this.dbpediaService.getStatements(results, MAPS.prefixes.muser.muser);

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
                    const {
                        statements,
                        cleanResults
                    } = this.dbpediaService.getStatements(results, MAPS.prefixes.muser.muser);
                    const genres = Object.keys(results);

                    // console.log("For entity :::" + entity);
                    // console.log(statements);
                    // console.log(genres);
                    resolve({
                        statements,
                        genres
                    });
                })
                .catch(err => {
                    console.log(err);
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
                    const {
                        statements,
                        cleanResults
                    } = this.dbpediaService.getStatements(results, MAPS.prefixes.muser.muser);
                    const artists = Object.keys(results);

                    // console.log("For entity :::" + entity);
                    // console.log(statements);
                    // console.log(genres);
                    resolve({
                        statements,
                        artists
                    });
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
                    const {
                        statements,
                        cleanResults
                    } = this.dbpediaService.getStatements(results, MAPS.prefixes.muser.muser);
                    const artists = Object.keys(results);

                    // console.log("For entity :::" + entity);
                    // console.log(statements);
                    // console.log(genres);
                    resolve({
                        statements,
                        artists
                    });
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisifiedFunction);
    }

    getMuserEntityFromDBPediaEntity(entity) {
        const muserEntity = `<${entity.replace("http://dbpedia.org/resource/", "http://example.com/muser#")}>`;
        return muserEntity;
    }



    populate(artist) {
        let mainRdfSubject;

        async.waterfall([
                /* 
                    Function retrieves the info about an artist
                    Function inserts the artist info into the ontology
                 */
                (callback) => {
                    this.getArtistInfo(artist)
                        .then(({
                            statements,
                            rdfSubject
                        }) => {
                            console.log("\n   Insert artist info " + artist);
                            console.log(statements);
                            // console.log(statements);
                            this.graphdbMuserService.getQueryInsert(statements)
                                .execute()
                                .then(response => {
                                    console.log("Inserted artist info = " + artist);
                                })
                                .catch(err => {
                                    console.error(err);
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
                /* 
                    Function retrieves the songs that have been performed by an artist
                    Function inserts the song into the ontology
                    Function inserts info about every song into the ontology
                    Function inserts the relationship between Artist <-> Song
                    Function returns the songs that have been performed by an artist
                */
                (callback) => {
                    this.getSongsForArtist(artist)
                        .then(({
                            statements,
                            songs
                        }) => {
                            console.log("\n   Get songs for = " + artist);
                            // console.log(statements);

                            this.graphdbMuserService.getQueryInsert(statements)
                                .execute()
                                .then(response => {
                                    console.log("Inserted songs for = " + artist);
                                })
                                .catch(err => {
                                    console.error(err);
                                    callback(err);
                                });

                            console.log("Songs inserted for entity:" + artist + songs);
                            return songs;
                        })
                        .then((songs) => {
                            async.each(songs, (song, eachSongCallback) => {
                                this.getSongInfo(song)
                                    .then((songsStatements) => {
                                        // console.log("\n     Insert these (songs info) = " + song);

                                        songsStatements.push([{
                                            s: songsStatements[0][0].s,
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

                                        // console.log(songsStatements);
                                        this.graphdbMuserService.getQueryInsert(songsStatements)
                                            .execute()
                                            .then(response => {
                                                // console.log("Inserted song info = " + song);
                                            })
                                            .catch(err => {
                                                console.error(err);
                                                callback(err);
                                            });

                                        eachSongCallback(null);
                                    })
                                    .catch((err) => {
                                        console.error(err);
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
                /*
                    Function retrieves the genres of each song
                    Function inserts the relations between Artist <-> Genre, Song <-> Genre
                    Function returns all songs of an artist and an union of all genres of each song 
                */
                (songs, callback) => {
                    console.log(songs);
                    async.map(songs, (song, eachSongCallback) => {
                        this.getGenresForEntity(song)
                            .then(({
                                statements,
                                genres
                            }) => {
                                const muserSongEntity = this.getMuserEntityFromDBPediaEntity(song);
                                console.log("[GENRES OF A SONG] " + genres);

                                if (statements.length === 0) {
                                    eachSongCallback(null, genres);
                                    return;
                                }

                                genres.forEach(genre => {
                                    //Add Song <-> Genre Mapping 
                                    statements.push([{
                                        s: muserSongEntity,
                                        p: 'muser:hasMusicalGenre',
                                        o: statements[0][0].s,
                                    }], [{
                                        s: statements[0][0].s,
                                        p: 'muser:embracedBy',
                                        o: muserSongEntity,
                                    }]);

                                    //Add Artist <-> Genre Mapping
                                    statements.push([{
                                        s: mainRdfSubject,
                                        p: 'muser:hasMusicalGenre',
                                        o: statements[0][0].s,
                                    }], [{
                                        s: statements[0][0].s,
                                        p: 'muser:embracedBy',
                                        o: mainRdfSubject,
                                    }]);
                                });

                                // console.log("\n   Insert these (song Genres)");  
                                // console.log("\n   Insert these (artist Genres)");


                                // console.log(statements);
                                // console.log(genres);


                                this.graphdbMuserService.getQueryInsert(statements)
                                    .execute()
                                    .then(response => {
                                        console.log("Inserted genres for entity:" + song);
                                        console.log("Inserted genres for entity:" + mainRdfSubject);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        eachSongCallback(err);
                                    });

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
                /*
                    Function inserts genre info about each genre of an artist
                    Function returns all the songs that have been performed by an artist
                */
                (songs, genres, callback) => {
                    // console.log(genres);
                    async.each(genres, (genre, eachGenreCallback) => {
                        this.getGenreInfo(genre)
                            .then((genresStatements) => {
                                // console.log(genresStatements);
                                console.log("\n     Insert these (genre info)" + genre);
                                this.graphdbMuserService.getQueryInsert(genresStatements)
                                    .execute()
                                    .then(response => {
                                        console.log("Inserted genre info for:" + genre);
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        eachGenreCallback(err);
                                    });
                                eachGenreCallback(null);
                            })
                            .catch((err) => {
                                console.error(err);
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
                /*
                    Function retrieves all the albums of each song that have been performed by an artsit
                    Function inserts the albums and the relation between Song <-> Album
                    Function returns an union of all albums from songs
                */
                (songs, callback) => {
                    // console.log(songs);
                    async.map(songs, (song, eachSongCallback) => {
                        this.getAlbumsForSong(song)
                            .then(({
                                statements,
                                albums
                            }) => {
                                const muserSongEntity = this.getMuserEntityFromDBPediaEntity(song);
                                console.log("\n   Insert these (song Albums)");
                                if (statements.length === 0) {
                                    eachSongCallback(null, albums);
                                    return;
                                }
                                albums.forEach(album => {
                                    //Add Song <-> Album Mapping
                                    statements.push([{
                                        s: muserSongEntity,
                                        p: "muser:containedBy",
                                        o: statements[0][0].s
                                    }], [{
                                        s: statements[0][0].s,
                                        p: "muser:contains",
                                        o: muserSongEntity,
                                    }]);
                                });

                                this.graphdbMuserService.getQueryInsert(statements)
                                    .execute()
                                    .then(response => {
                                        console.log("Insert SONG <-> Album mapping:" + song);
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        eachSongCallback(err);
                                    });

                                // console.log(albums);
                                // console.log(statements);
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
                /*
                    Function retrieves and inserst into ontoloft info about all albums
                    Function inserts the relataion between Artist <-> Album
                    Function returns all the albums
                */
                (albums, callback) => {
                    async.each(albums, (album, eachAlbumCallback) => {
                        this.getAlbumInfo(album)
                            .then((albumsStatements) => {
                                console.log("\n     Insert these (album info)" + album);
                                console.log("\n     Insert Artist <-> Album mapping:" + album);

                                if (albumsStatements.length === 0) {
                                    eachAlbumCallback(null);
                                    return;
                                }

                                const muserAlbumEntity = this.getMuserEntityFromDBPediaEntity(album);
                                // Add Artist <-> Album
                                albumsStatements.push([{
                                    s: mainRdfSubject,
                                    p: "muser:performs",
                                    o: muserAlbumEntity,
                                }], [{
                                    s: muserAlbumEntity,
                                    p: "muser:performedBy",
                                    o: mainRdfSubject,
                                }]);

                                // console.log(albumsStatements);
                                this.graphdbMuserService.getQueryInsert(albumsStatements)
                                    .execute()
                                    .then(result => {
                                        console.log("Inserted album info for:" + album);
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        eachAlbumCallback(err);
                                    });

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
                /*
                    Function retrieves the genres of all albums
                    Function inserts the relation between Album <-> Genre and Artist <-> Genre
                    Function returns all the albums and the union of all  genres of all albums
                */
                (albums, callback) => {
                    async.map(albums, (album, eachAlbumCallback) => {
                        this.getGenresForEntity(album)
                            .then(({
                                statements,
                                genres
                            }) => {
                                console.log("\n   Insert these (album Genres)", album);
                                console.log("\n   Insert these (artist Genres)", mainRdfSubject);
                                // console.log(genres);
                                // console.log(statements);

                                if (statements.length === 0) {
                                    eachAlbumCallback(genres);
                                    return;
                                }

                                const muserAlbumEntity = this.getMuserEntityFromDBPediaEntity(album);
                                genres.forEach(genre => {
                                    //Add Album <-> Genre Mapping
                                    const muserGenreEntity = this.getMuserEntityFromDBPediaEntity(genre);
                                    statements.push([{
                                        s: muserGenreEntity,
                                        p: "muser:embracedBy",
                                        o: muserAlbumEntity,
                                    }], [{
                                        s: muserAlbumEntity,
                                        p: "muser:hasMusicalGenre",
                                        o: muserGenreEntity,
                                    }]);

                                    //Add Artits <-> Genre Mapping
                                    statements.push([{
                                        s: muserGenreEntity,
                                        p: "muser:embracedBy",
                                        o: mainRdfSubject,
                                    }], [{
                                        s: mainRdfSubject,
                                        p: "muser:hasMusicalGenre",
                                        o: muserGenreEntity,
                                    }]);
                                });

                                this.graphdbMuserService.getQueryInsert(statements)
                                    .execute()
                                    .then(response => {
                                        console.log("Inserted Genres for albums");
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        eachAlbumCallback(err);
                                    });

                                // console.log(statements);
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
                /*
                    Function retrieves genre info about the union of genres of albums
                    Function returns the albums
                */
                (albums, genres, callback) => {
                    async.each(genres, (genre, eachGenreCallback) => {
                        this.getGenreInfo(genre)
                            .then((genresStatements) => {
                                console.log("\n     Insert these (genre info)");
                                // console.log(genresStatements);
                                this.graphdbMuserService.getQueryInsert(genresStatements)
                                    .execute()
                                    .then(response => {
                                        console.log("Inserted genre info about:", genre);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                        eachGenreCallback(err);
                                    });
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
                },
                //#region code
                //wat2
                // (albums, callback) => {
                //     async.map(albums, (album, eachAlbumCallback) => {
                //         this.getArtistsForAlbum(album)
                //             .then(({
                //                 artistsStatements,
                //                 artists
                //             }) => {
                //                 // console.log("\n   Insert these (album Artists)");  

                //                 // console.log(genres);
                //                 eachAlbumCallback(null, artists);
                //             })
                //             .catch((err) => {
                //                 console.error(err);
                //                 eachAlbumCallback(err);
                //             });
                //     }, (err, allArtistsList) => {
                //         let allArtists = new Set();

                //         allArtistsList.forEach(artistsList => {
                //             artistsList.forEach(genre => {
                //                 allArtists.add(genre);
                //             });
                //         });

                //         if (err) {
                //             console.error(err);
                //             callback(err);
                //             return;
                //         }
                //         callback(null, Array.from(allArtists));
                //     });
                // },
                // (artists, callback) => {
                //     // console.log(artists);
                //     async.each(artists, (artist, eachArtistCallback) => {
                //         this.getArtistInfo(artist)
                //             .then((artistsStatements) => {
                //                 // console.log("\n     Insert these (artist info)");
                //                 // console.log(artistsStatements);
                //                 eachArtistCallback(null);
                //             })
                //             .catch((err) => {
                //                 eachArtistCallback(err);
                //             });
                //     }, (err) => {
                //         if (err) {
                //             console.error(err);
                //             callback(err);
                //         }
                //     });
                //     callback(null);
                // },
                // (callback) => {
                //     this.getArtistsRelatedForArtist(artist)
                //         .then(({
                //             statements,
                //             artists
                //         }) => {
                //             // console.log("\n   Insert these (artists Artist)");
                //             // console.log(statements);

                //             // console.log(artists);
                //             callback(null, artists);
                //         })
                //         .catch((err) => {
                //             if (err) {
                //                 console.error(err);
                //                 callback(err);
                //                 return;
                //             }
                //         });
                // },
                // (artists, callback) => {
                //     // console.log(artists);

                //     async.each(artists, (relatedArtist, eachArtistCallback) => {
                //         this.getArtistInfo(relatedArtist)
                //             .then((statements) => {
                //                 // console.log("\n     Insert these (artist info)");
                //                 // console.log(statements);
                //                 eachArtistCallback(null);
                //             })
                //             .catch((err) => {
                //                 // console.log('PUUUUUUUUUUUUUUUUUUUUUUUUUUUULI + ' + relatedArtist);
                //                 eachArtistCallback(err);
                //             });
                //     }, (err) => {
                //         if (err) {
                //             console.error(err);
                //             callback(err);
                //             return;
                //         }
                //     });

                //     callback(null);
                // },
                //#endregion
                (albums, callback) => {
                    // console.log(genres);
                }
            ],
            (err, result) => {
                console.error(err);
            });
    }
}



let artist1 = '<http://dbpedia.org/resource/Cashis>';
let artist2 = '<http://dbpedia.org/resource/Eminem>';
let artist3 = '<http://dbpedia.org/resource/Queen_(band)>';
let artist4 = '<http://dbpedia.org/resource/Rage_Against_the_Machine>';

mp = new MuserPopulater();
mp.populate(artist2);