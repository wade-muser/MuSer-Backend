const AuthenticationService = require("../../services/authentication_service");
const HTTP_STATUS_CODE = require("../../utils/status_codes");
const HttpResponse = require("../../utils/http_response");

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
                .statusCode(HTTP_STATUS_CODE.OK)
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
                .statusCode(err.statusCode || HTTP_STATUS_CODE.UNAUTHORIZED)
                .body({
                    message: "Wrong Credentials"
                })
                .build()
                .getLambdaResponse();

            console.log("[Login] " + AWSLambdaResponse);
            callback(null, AWSLambdaResponse);
        });
};