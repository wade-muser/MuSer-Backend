const HttpResponse = require("../../commons/utils/http_response");
const HTTP_STATUS_CODES = require("../../commons/utils/http_status_codes");

const PlaylistsService = require("./playlists_service");
const playlistsService = new PlaylistsService();

module.exports.createPlaylist = (event, context, callback) => {
    if (!event.body) {
        const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
            .statusCode(HTTP_STATUS_CODES.BAD_REQUEST)
            .body({
                message: "Body wasn't provided"
            })
            .build()
            .getLambdaResponse();

        console.log("[PLAYLISTS] CREATE Response:", AWSLambdaResponse);

        callback(null, AWSLambdaResponse);
        return;
    }

    const name = event.body.name;
    const emailCreator = event.body.emailCreator;

    playlistsService.createPlaylist(name, emailCreator)
        .then(res => {
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.OK)
                .body({
                    results: res
                })
                .build()
                .getLambdaResponse();

            console.log("[PLAYLISTS] CREATE Response:", AWSLambdaResponse);
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

            console.log("[PLAYLISTS] CREATE Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });

}; // createPlaylist

module.exports.getPlaylists = (event, context, callback) => {
    if (!event.queryStringParameters) {
        const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
            .statusCode(HTTP_STATUS_CODES.BAD_REQUEST)
            .body({
                message: "Query Parameters weren't provided"
            })
            .build()
            .getLambdaResponse();

        console.log("[PLAYLISTS] GET Response:", AWSLambdaResponse);
        callback(null, AWSLambdaResponse);
        return;
    }

    const emailCreator = event.queryStringParameters.emailCreator;

    playlistsService.getPlaylists(emailCreator)
        .then(res => {
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.OK)
                .body({
                    results: res
                })
                .build()
                .getLambdaResponse();

            console.log("[PLAYLISTS] GET Response:", AWSLambdaResponse);
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

            console.log("[PLAYLISTS] GET Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });
}; // getPlaylists

module.exports.getPlaylist = (event, context, callback) => {
    if (!event.pathParameters) {
        const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
            .statusCode(HTTP_STATUS_CODES.BAD_REQUEST)
            .body({
                message: "Path Parameters weren't provided"
            })
            .build()
            .getLambdaResponse();

        console.log("[PLAYLISTS] GET id Response:", AWSLambdaResponse);
        callback(null, AWSLambdaResponse);
        return;
    }

    const id = event.pathParameters.id;

    playlistsService.getPlaylist(id)
        .then(res => {
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.OK)
                .body({
                    results: res
                })
                .build()
                .getLambdaResponse();

            console.log("[PLAYLISTS] GET id Response:", AWSLambdaResponse);
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

            console.log("[PLAYLISTS] GET id Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });
}; // getPlaylist

module.exports.deletePlaylist = (event, context, callback) => {
    if (!event.pathParameters) {
        const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
            .statusCode(HTTP_STATUS_CODES.BAD_REQUEST)
            .body({
                message: "Path Parameters weren't provided"
            })
            .build()
            .getLambdaResponse();

        console.log("[PLAYLISTS] DELETE id Response:", AWSLambdaResponse);
        callback(null, AWSLambdaResponse);
        return;
    }

    const id = event.pathParameters.id;

    playlistsService.deletePlaylist(id)
        .then(res => {
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.OK)
                .body({
                    results: res
                })
                .build()
                .getLambdaResponse();

            console.log("[PLAYLISTS] DELETE id Response:", AWSLambdaResponse);
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

            console.log("[PLAYLISTS] DELETE id Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });
}; // deletePlaylist