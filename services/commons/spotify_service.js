require("dotenv").config({
    path: "env/config.env"
});
const SpotifyWebAPI = require('spotify-web-api-node');

class SpotifyService {

    constructor(spotify_api) {
        this.spotify_api = new SpotifyWebAPI({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        });
    }

    authorize() {
        const promisified_function = (resolve, reject) => {
            this.spotify_api.clientCredentialsGrant()
                .then(data => {
                    const access_token = data.body.access_token;
                    this.spotify_api.setAccessToken(access_token);
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisified_function);
    }

    searchTrack(trackName, artistName) {
        let promisified_function = (resolve, reject) => {
            this.spotify_api.search(trackName + " " + artistName, ['track'])
                .then(data => {
                    let searchItem;
                    // console.log(JSON.stringify(data.body.tracks));

                    for (let item of data.body.tracks.items) {
                        for (let artist of item.artists) {
                            if (artist.name.toLowerCase() === artistName &&
                                item.name.toLowerCase().includes(trackName)) {
                                searchItem = item;
                                resolve(searchItem);
                                return;
                            }
                        }
                    }
                    resolve(searchItem);
                })
                .catch(err => {
                    reject(err);
                });
        };
        return new Promise(promisified_function);
    }

    searchArtist(artistName) {
        let promisified_function = (resolve, reject) => {
            this.spotify_api.search(artistName, ['artist'])
                .then(data => {
                    let searchItem;
                    for (let item of data.body.artists.items) {
                        if (item.name.toLowerCase() === artistName) {
                            searchItem = item;
                            resolve(searchItem);
                            return;
                        }
                    }

                    resolve(searchItem);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        };

        return new Promise(promisified_function);
    }

    searchAlbum(albumName, artistName) {
        let promisified_function = (resolve, reject) => {
            this.spotify_api.search(albumName, ['album'])
                .then(data => {
                    let searchItem;

                    for (let item of data.body.albums.items) {
                        for (let artist of item.artists) {
                            if (artist.name.toLowerCase() === artistName &&
                                item.name.toLowerCase().includes(albumName)) {
                                searchItem = item;
                                resolve(searchItem);
                                return;
                            }
                        }
                    }
                    resolve(searchItem);
                })
                .catch(err => {
                    reject(err);
                });
        };

        return new Promise(promisified_function);
    }

    getStatements(entity, result) {
        let statements = [];




    }

}

module.exports = SpotifyService;