const AuthenticationService = require("../../services/authentication_service");
const HTTP_STATUS_CODE = require("../../utils/status_codes");

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
            const responseBody = {
                message: "Success",
                token:token
            };
            console.log("[Login] Build response Body");
            const response = {
                statusCode: HTTP_STATUS_CODE.OK,
                headers: {
                    "Authorization": token
                },
                body: JSON.stringify(responseBody),
                isBase64Encoded: false
            };
            console.log("[Login] Response:" + JSON.stringify(response));
            callback(null, response);
            console.log("[Login] After callback call");
            return;
        })
        .catch(err => {
            console.log(err);
            const responseBody = {
                message: "Wrong Credentials"
            };
            const response = {
                statusCode: HTTP_STATUS_CODE.UNAUTHORIZED,
                body: JSON.stringify(responseBody)
            };
            callback(null, response);
        });
};