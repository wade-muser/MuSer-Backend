const ArtistsService = require("./artists_service");
const HttpResponse = require("../../commons/utils/http_response");
const HTTP_STATUS_CODES = require("../../commons/utils/http_status_codes");

const artistsService = new ArtistsService();

module.exports.getArtists = (event, context, callback) => {
    if (!event.queryStringParameters) {
        const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
            .statusCode(HTTP_STATUS_CODES.BAD_REQUEST)
            .body({
                message: "Parameters weren't provided"
            })
            .build()
            .getLambdaResponse();

        console.log("[ARTISTS] Response:", AWSLambdaResponse);
        callback(null, AWSLambdaResponse);
        return;
    }

    const name = event.queryStringParameters.name;
    const type = event.queryStringParameters.type;

    artistsService.getArtists(name, type)
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

module.exports.getArtist = (event, context, callback) => {

    const artistId = event.pathParameters.id;

    artistsService.getArtist(artistId)
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

module.exports.getArtistFeatures = (event, context, callback) => {

    const artistId = event.pathParameters.id;

    artistsService.getArtistFeatures(artistId)
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

module.exports.getRecommendedArtistsForArtist = (event, context, callback) => {

    console.log(event);
    const queryStringIsInvalid = !event.queryStringParameters || !event.queryStringParameters.type;
    if (queryStringIsInvalid) {
        const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
            .statusCode(HTTP_STATUS_CODES.BAD_REQUEST)
            .body({
                message: "Parameters weren't provided"
            })
            .build()
            .getLambdaResponse();

        console.log("[ARTISTS] Response:", AWSLambdaResponse);
        callback(null, AWSLambdaResponse);
        return;
    }

    const id = event.pathParameters.id;
    const type = event.queryStringParameters.type;
    artistsService.getArtistRecommendation(id, type)
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