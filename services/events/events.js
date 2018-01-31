const EventsService = require("./events_service");
const HttpResponse = require("../../commons/utils/http_response");
const HTTP_STATUS_CODES = require("../../commons/utils/http_status_codes");

const eventsService = new EventsService();

module.exports.getEvents = (event, context, callback) => {
    console.log(event);
    const queryStringIsInvalid = !event.queryStringParameters || !event.queryStringParameters.keyword || !event.queryStringParameters.type;
    if (queryStringIsInvalid) {
        console.log("Invalid request");
        const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
            .statusCode(HTTP_STATUS_CODES.BAD_REQUEST)
            .body({
                message: "Parameters weren't provided"
            })
            .build()    
            .getLambdaResponse();

        console.log("[EVENTS] Response:", AWSLambdaResponse);
        callback(null, AWSLambdaResponse);
        return;
    }

    const keyword = event.queryStringParameters.keyword;
    const type = event.queryStringParameters.type;

    eventsService.getEvents(keyword, type)
        .then(results => {
            console.log(results);
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.OK)
                .body({
                    results: results
                })
                .build()
                .getLambdaResponse();

            console.log("[EVENTS] Response:", AWSLambdaResponse);
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

            console.log("[EVENTS] Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });
};


module.exports.getEvent = (event, context, callback) => {

    const eventId = event.pathParameters.id;
    eventsService.getEvent(eventId)
        .then(results => {
            console.log(results);
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.OK)
                .body({
                    results: results
                })
                .build()
                .getLambdaResponse();

            console.log("[EVENTS] Response:", AWSLambdaResponse);
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

            console.log("[EVENTS] Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });
};