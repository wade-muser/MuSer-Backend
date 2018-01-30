const AlbumsService = require("./albums_service");
const HttpResponse = require("../../commons/utils/http_response");
const HTTP_STATUS_CODES = require("../../commons/utils/http_status_codes");

const albumsService = new AlbumsService();


module.exports.getAlbums = (event, context, callback) => {
    if (!event.queryStringParameters) {
        const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
            .statusCode(HTTP_STATUS_CODES.BAD_REQUEST)
            .body({
                message: "Parameters weren't provided"
            })
            .build()
            .getLambdaResponse();

        console.log("[ALBUMS] Response:", AWSLambdaResponse);
        callback(null, AWSLambdaResponse);
        return;
    }

    const name = event.queryStringParameters.name;

    albumsService.getAlbums(name)
        .then(results => {
            console.log(results);
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.OK)
                .body({
                    results: results
                })
                .build()
                .getLambdaResponse();

            console.log("[ALBUMS] Response:", AWSLambdaResponse);
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

module.exports.getAlbum = (event, context, callback) => {

    const albumId = event.pathParameters.id;

    albumsService.getAlbum(albumId)
        .then(results => {
            console.log(results);
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.OK)
                .body({
                    results: results
                })
                .build()
                .getLambdaResponse();

            console.log("[ALBUM] Response:", AWSLambdaResponse);
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

            console.log("[ALBUM] Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });
};


module.exports.getAlbumRecommendations = (event, context, callback) => {

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: '/albums/{id}/recommended response',
        }),
    };

    callback(null, response);
};