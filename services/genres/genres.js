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

module.exports.getGenre = (event, context, callback) => {

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

module.exports.getGenreRelated = (event, context, callback) => {
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

module.exports.getGenreTimeline = (event, context, callback) => {
    const genreId = event.pathParameters.id;
    const startDate = event.queryStringParameters.start_date;
    const endDate = event.queryStringParameters.end_date;
    console.log(genreId + " " + startDate + " " + endDate);
    genresService.getGenreTimeline(genreId, startDate, endDate)
        .then(results => {
            const agregated_results = Object.assign(results.artists_timeline, results.albums_timeline);
            const sorted_entities = Object.keys(agregated_results)
                .sort(function (a, b) {
                    const first_date = new Date(agregated_results[a].inceptionDate[0]);
                    const second_date = new Date(agregated_results[b].inceptionDate[0]);
                    return first_date - second_date;
                });

            for (let entity of sorted_entities) {
                console.log(entity + " " + agregated_results[entity].inceptionDate);
            }

            const aggregated_sorted_results = [];
            for (let entity of sorted_entities) {
                aggregated_sorted_results.push(agregated_results[entity]);
            }

            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.OK)
                .body({
                    results: aggregated_sorted_results,
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