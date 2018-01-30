const GenresServices = require('./genres_service');
const HttpResponse = require("../../commons/utils/http_response");
const HTTP_STATUS_CODES = require("../../commons/utils/http_status_codes");

const genresService = new GenresServices();

module.exports.getGenres = (event, context, callback) => {

    genresService.getGenres()
        .then(results => {
            console.log(results);
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.OK)
                .body({
                    results: results
                })
                .build()
                .getLambdaResponse();

            console.log("[GENRES] Response:", AWSLambdaResponse);
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

            console.log("[GENRES] Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });
};

module.exports.getGenreById = (event, context, callback) => {
    
    const genreId = event.pathParameters.id;

    genresService.getGenre(genreId)
        .then(results => {
            console.log(results);
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.OK)
                .body({
                    results: results
                })
                .build()
                .getLambdaResponse();

            console.log("[Genre] Response:", AWSLambdaResponse);
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

            console.log("[Genre] Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });

};

module.exports.getGenresRelatedById = (event, context, callback) => {
    const genreId = event.pathParameters.id;

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: `/genres/{id}/related response: id = ${genreId}`,
        }),
    };

    callback(null, response);
};

module.exports.getTimelineForGenre = (event, context, callback) => {
    const genreId = event.pathParameters.id;

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: `/genres/{id}/timeline response: id = ${genreId}`,
        }),
    };

    callback(null, response);
};