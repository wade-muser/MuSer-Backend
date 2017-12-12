const AuthenticationService = require("../../services/authentication_service");
const HTTP_STATUS_CODE = require("../../utils/status_codes");

module.exports.handler = (event, context, callback) => {
    const credentials = {
        email: event.body.email,
        password: event.body.password,
        firstName: event.body.firstName,
        secondName: event.body.secondName
    };
    if (!AuthenticationService.validateCredentials(credentials)) {
        callback(null, {
            statusCode: HTTP_STATUS_CODE.BAD_REQUEST,
            body: {
                message: "Complete all fields"
            }

        });
        return;
    }

    AuthenticationService.register(credentials)
        .then(() => {
            console.log("User was registered");
            callback(null, {
                statusCode: HTTP_STATUS_CODE.CREATED,
                body: {
                    message: "Account was created"
                }
            });
        })
        .catch(err => {
            console.log(err);
            callback(null, {
                statusCode: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
                body: {
                    message: "Some error occurred"
                }
            });
        });
};