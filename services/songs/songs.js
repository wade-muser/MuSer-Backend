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
                .statusCode(err.httpStatusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
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

            console.log("[SONG] Response:", AWSLambdaResponse);
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

            console.log("[SONG] Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });
};

module.exports.getSongRecommendations = (event, context, callback) => {

    const isInvalidQueryString = !event.queryStringParameters || !event.queryStringParameters.type;
    if (isInvalidQueryString) {
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

    const id = event.pathParameters.id;
    const type = event.queryStringParameters.type;

    songsService.getSongRecommendations(id, type)
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
                .statusCode(err.httpStatusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .body({
                    message: "Some error occurred",
                })
                .build()
                .getLambdaResponse();

            console.log("[ARTISTS] Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });
};