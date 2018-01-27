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

module.exports.getArtist = (event, context, callback) => {
    const artistId = event.pathParameters.id;

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: `/artists/{id} response: id = ${artistId}`,
        }),
    };

    callback(null, response);
};

module.exports.getArtistFeatures = (event, context, callback) => {

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: '/artists/{id}/features response',
        }),
    };

    callback(null, response);

};

module.exports.getRecommendedArtistsForArtist = (event, context, callback) => {

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: '/artists/{id}/recommendation response',
        }),
    };

    callback(null, response);

};