const EventsService = require("./events_service");
const HttpResponse = require("../../commons/utils/http_response");
const HTTP_STATUS_CODES = require("../../commons/utils/http_status_codes");

const eventsService = new EventsService();

module.exports.getEvents = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: '/events/ response',
        }),
    };
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
                .statusCode(err.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
                .body({
                    message: "Some error occurred",
                })
                .build()
                .getLambdaResponse();

            console.log("[EVENTS] Response:", AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });
};