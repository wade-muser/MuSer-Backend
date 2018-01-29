const async = require('async');

const GraphdbMuserService = require('./graphdb_muser_service');
const SparqlQueryFactory = require('./sparql_query_factory');
const SparqlService = require('./sparql_service');

const MAPS = require('./mappings');
const DBP_SPARQL_ENDPOINT = 'http://dbpedia.org/sparql';

class MuserPopulater {
    constructor() {
        this.sparqlQueryFactory = new SparqlQueryFactory();
        this.dbpediaService = new SparqlService(
            DBP_SPARQL_ENDPOINT,
            undefined,
            [MAPS.prefixes.common, MAPS.prefixes.dbp, MAPS.prefixes.muser]
        );
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
                        isBand
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

    getGenresRelatedForGenre(genre) {
        let promisifiedFunction = (resolve, reject) => {
            const query = this.sparqlQueryFactory.getQuery(SparqlQueryFactory.GENRES_RELATED_FOR_GENRE, genre);

            this.dbpediaService.getQueryResults(query, genre)
                .then((results) => {
                    const {
                        statements,
                        cleanResults
                    } = this.dbpediaService.getStatements(results, MAPS.prefixes.muser.muser);
                    const genres = Object.keys(results);

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
                            let artistLabel = results[artist.replace(/[<>]/g, '')].label[0];
                            mainRdfSubject = SparqlService.getCleanUniqueIdentifier(MAPS.prefixes.muser.muser, artistLabel);

                            statements.push([{
                                s: mainRdfSubject,
                                p: 'rdf:type',
                                o: isBand ? MAPS.varToEntity.band.entity : MAPS.varToEntity.artist.entity,
                            }]);

                            this.graphdbMuserService.getQueryInsert(statements)
                                .execute()
                                .then(response => {
                                    console.log("Inserted artist info for " + artist);
                                })
                                .catch(err => {
                                    console.error(err);
                                    callback(err);
                                });

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
                            this.graphdbMuserService.getQueryInsert(statements)
                                .execute()
                                .then(response => {
                                    console.log("Inserted songs of " + artist);
                                })
                                .catch(err => {
                                    console.error(err);
                                    callback(err);
                                });

                            return songs;
                        })
                        .then((songs) => {
                            async.each(songs, (song, eachSongCallback) => {
                                this.getSongInfo(song)
                                    .then((songsStatements) => {
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

                                        this.graphdbMuserService.getQueryInsert(songsStatements)
                                            .execute()
                                            .then(response => {
                                                console.log("Inserted song info for " + song);
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
                    async.map(songs, (song, eachSongCallback) => {
                        this.getGenresForEntity(song)
                            .then(({
                                statements,
                                genres
                            }) => {
                                const muserSongEntity = this.getMuserEntityFromDBPediaEntity(song);

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

                                this.graphdbMuserService.getQueryInsert(statements)
                                    .execute()
                                    .then(response => {
                                        console.log("Inserted genres for " + song);
                                    })
                                    .catch(err => {
                                        console.error(err);
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
                    async.each(genres, (genre, eachGenreCallback) => {
                        this.getGenreInfo(genre)
                            .then((genresStatements) => {
                                this.graphdbMuserService.getQueryInsert(genresStatements)
                                    .execute()
                                    .then(response => {
                                        console.log("Inserted genre info for " + genre);
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
                    callback(null, songs, genres);
                },
                /*
                    Function retrieves the related genres of each song's genres
                */
                (songs, genres, callback) => {
                    async.map(genres, (genre, eachGenreCallback) => {
                        this.getGenresRelatedForGenre(genre)
                            .then(({
                                statements,
                                genres
                            }) => {
                                const muserGenreEntity = this.getMuserEntityFromDBPediaEntity(genre);

                                if (statements.length === 0) {
                                    eachGenreCallback(null, songs);
                                    return;
                                }

                                genres.forEach(genre => {
                                    // Add Into Statement that genre is type muser:Genre
                                    statements.push([{
                                        s: statements[0][0].s,
                                        p: "rdf:type",
                                        o: MAPS.varToEntity.genre.entity,
                                    }]);

                                    // Add Main Genre <-> related Genre Mapping 
                                    statements.push([{
                                        s: muserGenreEntity,
                                        p: MAPS.varToPredicate.relatedMusicalGenre.predicate,
                                        o: statements[0][0].s,
                                    }], [{
                                        s: statements[0][0].s,
                                        p: MAPS.varToPredicate.relatedMusicalGenre.predicate,
                                        o: muserGenreEntity,
                                    }]);
                                });

                                this.graphdbMuserService.getQueryInsert(statements)
                                    .execute()
                                    .then(response => {
                                        console.log("Inserted related genres for (from songs) " + genre);
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        eachSongCallback(err);
                                    });

                                eachGenreCallback(null, genres);
                            })
                            .catch((err) => {
                                console.error(err);
                                eachGenreCallback(err);
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
                    Function retrieves info for the related genres of each song's genres
                */
                (songs, genres, callback) => {
                    async.each(genres, (genre, eachGenreCallback) => {
                        this.getGenreInfo(genre)
                            .then((genresStatements) => {
                                this.graphdbMuserService.getQueryInsert(genresStatements)
                                    .execute()
                                    .then(response => {
                                        console.log("Inserted related (from songs) genre info for " + genre);
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
                    Function retrieves all the albums of each song that have been performed by an artist
                    Function inserts the albums and the relation between Song <-> Album
                    Function returns an union of all albums from songs
                */
                (songs, callback) => {
                    async.map(songs, (song, eachSongCallback) => {
                        this.getAlbumsForSong(song)
                            .then(({
                                statements,
                                albums
                            }) => {
                                const muserSongEntity = this.getMuserEntityFromDBPediaEntity(song);
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
                                        console.log("Inserted album <-> song for " + song);
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        eachSongCallback(err);
                                    });
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
                    Function retrieves and insert into GraphDB info about all albums
                    Function inserts the relation between Artist <-> Album
                    Function returns all the albums
                */
                (albums, callback) => {
                    async.each(albums, (album, eachAlbumCallback) => {
                        this.getAlbumInfo(album)
                            .then((albumsStatements) => {
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

                                this.graphdbMuserService.getQueryInsert(albumsStatements)
                                    .execute()
                                    .then(result => {
                                        console.log("Inserted album info for " + album);
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
                                        console.log("Inserted genres <-> albums of " + mainRdfSubject);
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        eachAlbumCallback(err);
                                    });

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
                                this.graphdbMuserService.getQueryInsert(genresStatements)
                                    .execute()
                                    .then(response => {
                                        console.log("Inserted genre info for " + genre);
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
                                        console.log("Inserted artists for album " + album);
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
                    async.each(artists, (artistEntity, eachArtistCallback) => {
                        this.getArtistInfo(artistEntity)
                            .then(({
                                statements,
                                results,
                                isBand
                            }) => {
                                const albumArtist = this.getMuserEntityFromDBPediaEntity(artistEntity);

                                statements.push([{
                                    s: albumArtist,
                                    p: 'rdf:type',
                                    o: isBand ? MAPS.varToEntity.band.entity : MAPS.varToEntity.artist.entity,
                                }]);

                                this.graphdbMuserService.getQueryInsert(statements)
                                    .execute()
                                    .then(response => {
                                        console.log("Inserted artist info for " + artistEntity);
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


                            this.graphdbMuserService.getQueryInsert(statements)
                                .execute()
                                .then(response => {
                                    console.log("Inserted related artists for " + mainRdfSubject);
                                })
                                .catch(err => {
                                    console.error(err);
                                    callback(err);
                                });

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
                    async.each(artists, (relatedArtist, eachArtistCallback) => {
                        this.getArtistInfo(relatedArtist)
                            .then(({
                                statements,
                                results,
                                isBand
                            }) => {
                                relatedArtist = this.getMuserEntityFromDBPediaEntity(relatedArtist);
                                statements.push([{
                                    s: relatedArtist,
                                    p: "rdf:type",
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
                                        console.log("Inserted related artist info for " + relatedArtist);
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        eachArtistCallback(err);
                                    });

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
                    console.log(genres);
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
let artist5 = '<http://dbpedia.org/resource/Phil_Collins>'
mp = new MuserPopulater();
mp.populate(artist5);