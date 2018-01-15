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
                .then((cleanResults) => {
                    let isBand = false;
                    cleanResults[artist.replace(/[<>]/g, '')].type.forEach(type => {
                        if (type.toLowerCase().indexOf('band') !== -1) {
                            isBand = true;
                            return;
                        }
                    });
                    delete cleanResults[artist.replace(/[<>]/g, '')].type;

                    const {
                        statements,
                        results
                    } = this.dbpediaService.getStatements(cleanResults, MAPS.prefixes.muser.muser);

                    resolve({
                        statements,
                        results,
                        isBand: isBand
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
                    const relatedArtists = Object.keys(results);

                    // console.log("For entity :::" + entity);
                    // console.log(statements);
                    // console.log(genres);
                    resolve({
                        statements,
                        relatedArtists
                    });
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisifiedFunction);
    }

    getMuserEntityFromDBPediaEntity(entity) {
        let muserEntity = `<${entity.replace("http://dbpedia.org/resource/", "http://example.com/muser#")}>`;
        muserEntity = SparqlService.escapeSpecialCharacters(muserEntity);
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
                            results,
                            isBand
                        }) => {
                            console.log("\n   Insert artist info " + artist);
                            
                            let artistLabel = results[artist.replace(/[<>]/g, '')].label[0];
                            mainRdfSubject = SparqlService.getCleanUniqueIdentifier(MAPS.prefixes.muser.muser, artistLabel);

                            statements.push([{
                                s: mainRdfSubject,
                                p: 'rdf:type',
                                o: isBand ? MAPS.varToEntity.band.entity : MAPS.varToEntity.artist.entity,
                            }]);

                            // console.log(results);
                            // console.log(isBand);
                            // console.log(statements);
                            // throw 'mata de pe stanca';
                            this.graphdbMuserService.getQueryInsert(statements)
                                .execute()
                                .then(response => {
                                    console.log("Inserted artist info = " + artist);
                                })
                                .catch(err => {
                                    console.error(err);
                                    callback(err);
                                });
                            
                            // console.log(results);
                            // console.log(mainRdfSubject);

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
                                            o: MAPS.varToEntity.song.entity,
                                        }]);
                                        songsStatements.push([{
                                            s: mainRdfSubject,
                                            p: MAPS.varToPredicate.performs.predicate,
                                            o: songsStatements[0][0].s,
                                        }]);
                                        songsStatements.push([{
                                            o: mainRdfSubject,
                                            p: MAPS.varToPredicate.performedBy.predicate,
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
                                    // Add Into Statement that genre is type muser:Genre
                                    statements.push([{
                                        s: statements[0][0].s,
                                        p: "rdf:type",
                                        o: MAPS.varToEntity.genre.entity,
                                    }]);

                                    // Add Song <-> Genre Mapping 
                                    statements.push([{
                                        s: muserSongEntity,
                                        p: MAPS.varToPredicate.hasMusicalGenre.predicate,
                                        o: statements[0][0].s,
                                    }], [{
                                        s: statements[0][0].s,
                                        p: MAPS.varToPredicate.embracedBy.predicate,
                                        o: muserSongEntity,
                                    }]);

                                    // Add Artist <-> Genre Mapping
                                    statements.push([{
                                        s: mainRdfSubject,
                                        p: MAPS.varToPredicate.hasMusicalGenre.predicate,
                                        o: statements[0][0].s,
                                    }], [{
                                        s: statements[0][0].s,
                                        p: MAPS.varToPredicate.embracedBy.predicate,
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
                                        console.error(err);
                                        console.error("\n");
                                        console.error(statements);
                                        console.error("\n");
                                        console.error(this.graphdbMuserService.getQueryInsert(statements).originalText)
                                        throw "smth";
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
                            if (genresList && genresList.length !== 0) {
                                genresList.forEach(genre => {
                                    allGenres.add(genre);
                                });
                            }
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
                                console.log("\n     Insert these (genre info)" + genre);
                                // console.log(genresStatements);
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
                                console.log(muserSongEntity);
                                console.log("\n   Insert these (song Albums)");
                                if (statements.length === 0) {
                                    eachSongCallback(null, albums);
                                    return;
                                }
                                albums.forEach(album => {
                                    //Add that each song is type muser:Song
                                    statements.push([{
                                        s: muserSongEntity,
                                        p: "rdf:type",
                                        o: MAPS.varToEntity.song.entity,
                                    }]);

                                    //Add Song <-> Album Mapping
                                    statements.push([{
                                        s: muserSongEntity,
                                        p: MAPS.varToPredicate.containedBy.predicate,
                                        o: statements[0][0].s
                                    }], [{
                                        s: statements[0][0].s,
                                        p: MAPS.varToPredicate.contains.predicate,
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
                            if (albumsList && albumsList.length !== 0) {
                                albumsList.forEach(album => {
                                    allAlbums.add(album);
                                });
                            }
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
                                //Add that each album is type muser:Album
                                albumsStatements.push([{
                                    s: albumsStatements[0][0].s,
                                    p: "rdf:type",
                                    o: MAPS.varToEntity.album.entity
                                }]);
                                // Add Artist <-> Album
                                albumsStatements.push([{
                                    s: mainRdfSubject,
                                    p: MAPS.varToPredicate.performs.predicate,
                                    o: muserAlbumEntity,
                                }], [{
                                    s: muserAlbumEntity,
                                    p: MAPS.varToPredicate.performedBy.predicate,
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
                                    const muserGenreEntity = this.getMuserEntityFromDBPediaEntity(genre);
                                    //Add that each genre is type muser:Genre
                                    statements.push([{
                                        s: muserGenreEntity,
                                        p: "rdf:type",
                                        o: MAPS.varToEntity.genre.entity
                                    }]);

                                    //Add Album <-> Genre Mapping
                                    statements.push([{
                                        s: muserGenreEntity,
                                        p: MAPS.varToPredicate.embracedBy.predicate,
                                        o: muserAlbumEntity,
                                    }], [{
                                        s: muserAlbumEntity,
                                        p: MAPS.varToPredicate.hasMusicalGenre.predicate,
                                        o: muserGenreEntity,
                                    }]);

                                    //Add Artits <-> Genre Mapping
                                    statements.push([{
                                        s: muserGenreEntity,
                                        p: MAPS.varToPredicate.embracedBy.predicate,
                                        o: mainRdfSubject,
                                    }], [{
                                        s: mainRdfSubject,
                                        p: MAPS.varToPredicate.hasMusicalGenre.predicate,
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
                            if (genresList && genresList.length !== 0) {
                                genresList.forEach(genre => {
                                    allGenres.add(genre);
                                });
                            }
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
                //wat2
                /*
                    Function retrieves all the artists that appear on each album
                    Function inserts the relation between each albums and its performers
                    Function returns an union of all artists that appears on each album
                */
                (albums, callback) => {
                    async.map(albums, (album, eachAlbumCallback) => {
                        this.getArtistsForAlbum(album)
                            .then(({
                                statements,
                                artists
                            }) => {
                                console.log("\n   Insert these (album Artists)" + album);
                                if (statements.length == 0) {
                                    eachAlbumCallback(null, artists);
                                    return;
                                }

                                const muserAlbumEntity = this.getMuserEntityFromDBPediaEntity(album);
                                artists.forEach(albumArtist => {
                                    const artistMuserEntity = this.getMuserEntityFromDBPediaEntity(albumArtist);
                                    // Add that artist is type muser:MusicalArtist
                                    statements.push([{
                                        s: artistMuserEntity,
                                        p: "rdf:type",
                                        o: MAPS.varToEntity.artist.entity,
                                    }]);

                                    // Add Artist <-> Album Mapping
                                    statements.push([{
                                        s: muserAlbumEntity,
                                        p: MAPS.varToPredicate.releasedBy.predicate,
                                        o: artistMuserEntity,
                                    }], [{
                                        s: artistMuserEntity,
                                        p: MAPS.varToPredicate.released.predicate,
                                        o: muserAlbumEntity,
                                    }]);
                                });

                                this.graphdbMuserService.getQueryInsert(statements)
                                    .execute()
                                    .then(response => {
                                        console.log("Inserted these (album Artists)" + album);
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        eachAlbumCallback(err);
                                    });

                                eachAlbumCallback(null, artists);
                            })
                            .catch((err) => {
                                console.error(err);
                                eachAlbumCallback(err);
                            });
                    }, (err, allArtistsList) => {
                        if (err) {
                            console.error(err);
                            callback(err);
                            return;
                        }

                        let allArtists = new Set();
                        allArtistsList.forEach(artistsList => {
                            if (artistsList && artistsList.length !== 0) {
                                artistsList.forEach(genre => {
                                    allArtists.add(genre);
                                });
                            }
                        });

                        callback(null, Array.from(allArtists));
                    });
                },
                /**
                 * Function retrieves all the info about the artists
                 */
                (artists, callback) => {
                    // console.log(artists);
                    async.each(artists, (artistEntity, eachArtistCallback) => {
                        this.getArtistInfo(artistEntity)
                            .then(({
                                statements,
                                results,
                                isBand
                            }) => {
                                console.log("\n     Insert these (artist info) " + artistEntity);
                                // console.log(statements);

                                const albumArtist = this.getMuserEntityFromDBPediaEntity(artistEntity);

                                statements.push([{
                                    s: albumArtist,
                                    p: 'rdf:type',
                                    o: isBand ? MAPS.varToEntity.band.entity : MAPS.varToEntity.artist.entity,
                                }]);    

                                this.graphdbMuserService.getQueryInsert(statements)
                                    .execute()
                                    .then(response => {
                                        console.log("Inserted these (artist info) " + artistEntity);
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        eachArtistCallback(err);
                                    });

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
                /**
                 * Function retrieves all the related artist of the main RDF Subject ("The Artist")
                 * Function returns all the artists that are related with the main RDF Subject ("The Artist")
                 */
                (callback) => {
                    this.getArtistsRelatedForArtist(artist)
                        .then(({
                            statements,
                            relatedArtists
                        }) => {
                            console.log("\n   Insert these (artists Artist) " + relatedArtists);
                            if (statements.length == 0) {
                                callback(null, relatedArtists);
                                return;
                            }

                            relatedArtists.forEach(relatedArtist => {
                                const relatedArtistMuserEntity = this.getMuserEntityFromDBPediaEntity(relatedArtist);

                                // Add that relatedArtist is muser:MusicalArtist
                                statements.push([{
                                    s: relatedArtistMuserEntity,
                                    p: "rdf:type",
                                    o: MAPS.varToEntity.artist.entity,
                                }]);

                                // Add related artists relationship
                                // Add Artist <- related -> Artist 
                                statements.push([{
                                    s: mainRdfSubject,
                                    p: MAPS.varToPredicate.relatedMusicalAgent.predicate,
                                    o: relatedArtistMuserEntity,
                                }], [{
                                    s: relatedArtistMuserEntity,
                                    p: MAPS.varToPredicate.relatedMusicalAgent.predicate,
                                    o: mainRdfSubject,
                                }]);
                            });

                            statements.forEach(localStatement => {
                                localStatement.forEach(statement => {
                                    Object.keys(statement).forEach(key => {
                                        let value = statement[key];
                                        if (!value.startsWith("\"") && !value.startsWith("\'")) {
                                            value = value.replace(/["'\\]/g, "_");
                                        }
                                        statement[key] = value;
                                    });
                                });
                            });

                            // console.log(statements);

                            this.graphdbMuserService.getQueryInsert(statements)
                                .execute()
                                .then(response => {
                                    console.log(" Inserted these (artists Artist) " + relatedArtists);
                                })
                                .catch(err => {
                                    console.error(err);
                                    callback(err);
                                });

                            // console.log(statements);
                            callback(null, relatedArtists);
                        })
                        .catch((err) => {
                            if (err) {
                                console.error(err);
                                callback(err);
                                return;
                            }
                        });
                },
                /**
                 * Function retrieves info about each related artist of the main RDF Subject ("The Artist")
                 * 
                 */
                (artists, callback) => {
                    // console.log(artists);

                    async.each(artists, (relatedArtist, eachArtistCallback) => {
                        this.getArtistInfo(relatedArtist)
                            .then(({
                                statements,
                                results,
                                isBand
                            }) => {
                                // console.log("\n     Insert these related (artist info) " + relatedArtist);

                                relatedArtist = this.getMuserEntityFromDBPediaEntity(relatedArtist);
                                statements.push([{
                                    s: relatedArtist,
                                    p: 'rdf:type',
                                    o: isBand ? MAPS.varToEntity.band.entity : MAPS.varToEntity.artist.entity,
                                }]);

                                statements.forEach(localStatement => {
                                    localStatement.forEach(statement => {
                                        Object.keys(statement).forEach(key => {
                                            let value = statement[key];
                                            if (!value.startsWith("\"") && !value.startsWith("\'")) {
                                                value = value.replace(/["'\\]/g, "_");
                                            }
                                            statement[key] = value;
                                        });
                                    });
                                });

                                this.graphdbMuserService.getQueryInsert(statements)
                                    .execute()
                                    .then(response => {
                                        console.log("\n     Inserted these related (artist info) " + relatedArtist);
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        eachArtistCallback(err);
                                    });

                                console.log(statements);
                                eachArtistCallback(null);
                            })
                            .catch((err) => {
                                console.error(err);
                                eachArtistCallback(err);
                            });
                    }, (err) => {
                        if (err) {
                            console.error(err);
                            callback(err);
                            return;
                        }
                    });

                    // callback(null);
                },
                //#region code
                //#endregion
                (callback) => {
                    // console.log(genres);
                }
            ],
            (err, result) => {
                if (err) {
                    console.error(err);
                }
            });
    }
}



let artist1 = '<http://dbpedia.org/resource/Cashis>';
let artist2 = '<http://dbpedia.org/resource/Eminem>';
let artist3 = '<http://dbpedia.org/resource/Queen_(band)>';
let artist4 = '<http://dbpedia.org/resource/Rage_Against_the_Machine>';

mp = new MuserPopulater();
mp.populate(artist3);