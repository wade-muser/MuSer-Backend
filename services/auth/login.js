const AuthenticationService = require("./authentication_service");
const HttpResponse = require("../../commons/utils/http_response");
const HTTP_STATUS_CODES = require("../../commons/utils/http_status_codes");

module.exports.handler = (event, context, callback) => {
    event.body = JSON.parse(event.body);
    
    const credentials = {
        email: event.body.email,
        password: event.body.password
    };
    console.log(credentials);

    AuthenticationService.authenticate(credentials)
        .then(token => {
            console.log("[Login] Token:" + token);
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(HTTP_STATUS_CODES.OK)
                .body({
                    message: "Success",
                    token: token
                })
                .build()
                .getLambdaResponse();

            console.log("[Login] Response:" + AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
            return;
        })
        .catch(err => {
            console.log(err);
            const AWSLambdaResponse = new HttpResponse.HttpResponseBuilder()
                .statusCode(err.httpStatusCode || HTTP_STATUS_CODES.UNAUTHORIZED)
                .body({
                    message: "Wrong Credentials"
                })
                .build()
                .getLambdaResponse();

            console.log("[Login] " + AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });
};