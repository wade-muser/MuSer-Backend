const AuthenticationService = require("../../services/authentication_service");
const HTTP_STATUS_CODE = require("../../utils/status_codes");
const HttpResponse = require("../../utils/http_response");


module.exports.handler = (event, context, callback) => {
    event.body = JSON.parse(event.body);
    const credentials = {
        email: event.body.email,
        password: event.body.password,
        firstName: event.body.firstName,
        lastName: event.body.lastName
    };
    console.log("[REGISTER] " + credentials);
    if (!AuthenticationService.validateCredentials(credentials)) {
        console.log("Not all fields were completed");
        const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
            .statusCode(HTTP_STATUS_CODE.BAD_REQUEST)
            .body({
                message: "Complete all fields"
            })
            .build()
            .getLambdaResponse();

        console.log("[Register] " + AWSLambdaResponse);
        callback(null, AWSLambdaResponse);
        return;
    }

    AuthenticationService.register(credentials)
        .then(() => {
            console.log("User was registered");
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODE.CREATED)
                .body({
                    message: "Account was created"
                })
                .build()
                .getLambdaResponse();

            console.log("[Register] " + AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        })
        .catch(err => {
            console.log(err);
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(err.httpStatusCode || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
                .body({
                    message: "Some error occurred"
                })
                .build()
                .getLambdaResponse();

            console.log("[Register] " + AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });
};