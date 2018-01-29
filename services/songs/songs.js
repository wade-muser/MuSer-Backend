const SongsService = require("./songs_service");
const HttpResponse = require("../../commons/utils/http_response");
const HTTP_STATUS_CODES = require("../../commons/utils/http_status_codes");

const songsService = new SongsService();


module.exports.getSongs = (event, context, callback) => {
    if (!event.queryStringParameters) {
        const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
            .statusCode(HTTP_STATUS_CODES.BAD_REQUEST)
            .body({
                message: "Parameters weren't provided"
            })
            .build()
            .getLambdaResponse();

        console.log("[SONGS] Response:", AWSLambdaResponse);
        callback(null, AWSLambdaResponse);
        return;
    }

    const name = event.queryStringParameters.name;

    songsService.getSongs(name)
        .then(results => {
            console.log(results);
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.OK)
                .body({
                    results: results
                })
                .build()
                .getLambdaResponse();

            console.log("[SONGS] Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        })
        .catch(err => {
            console.log(err);
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(err.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .body({
                    message: "Some error occurred",
                })
                .build()
                .getLambdaResponse();

            console.log("[ALBUMS] Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });
};

module.exports.getSong = (event, context, callback) => {

    const songId = event.pathParameters.id;

    songsService.getSong(songId)
        .then(results => {
            console.log(results);
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.OK)
                .body({
                    results: results
                })
                .build()
                .getLambdaResponse();

            console.log("[ARTISTS] Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        })
        .catch(err => {
            console.log(err);
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(err.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .body({
                    message: "Some error occurred",
                })
                .build()
                .getLambdaResponse();

            console.log("[ARTISTS] Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });
};

module.exports.getRecommendedSongs = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: '/songs/{id}/ reccomendation',
        }),
    };

    callback(null, response);
};