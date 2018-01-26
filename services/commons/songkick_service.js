require("dotenv").config({
    path: "env/config.env"
});

const SongKick = require('songkick-api-node');
const SONGKICK_API_KEY = process.env.SONGKICK_API_KEY;

class SongKickService {

    constructor() {
        this.song_kick_api = new SongKick(SONGKICK_API_KEY);
    }

    findArtistId(artistName) {
        const promisified_function = (resolve, reject) => {
            this.song_kick_api.searchArtists(this.buildParams(artistName))
                .then(result => {
                    const data = {};
                    if (result) {
                        data.idSongkick = result[0].id;
                    }
                    resolve(data);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        };

        return new Promise(promisified_function);
    }

    findArtistEvents(artistId) {
        const promisified_function = (resolve, reject) => {
            this.song_kick_api.getArtistUpcomingEvents(artistId)
                .then(result => {
                    resolve(result);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });

        };

        return new Promise(promisified_function);
    }

    buildParams(query) {
        return {
            "query": query
        };
    }

}

module.exports = SongKickService;