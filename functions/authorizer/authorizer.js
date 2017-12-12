const TokenService = require('../../services/token_service');
const HTTP_CODE = require("../../utils/status_codes");
const PolicyBuilder = require("./iam_policy_builder");


module.exports.handler = (event, context, callback) => {
    const token = event.authorizationToken;
    if (token == undefined) {
        const messageBody = {
            message: "Token not provided"
        };
        const body = {
            statusCode: HTTP_CODE.UNAUTHORIZED,
            body: JSON.stringify(messageBody)
        };
        console.log("[Authorizer] Token not provided");
        callback("Unauthorized");
        return;
    }

    TokenService.validate(token)
        .then(payload => {
            console.log("[Authorizer]" + payload);
            const email = payload.email;
            const effect = "Allow";
            const isAllowed = true;
            const authorizedContext = {
                user: JSON.stringify(payload)
            };
            const policyDocument = PolicyBuilder.buildIAMPolicy(email, effect, event.methodArn, authorizedContext);

            callback(null, policyDocument);
        })
        .catch(err => {
            console.log(err);
            callback(err.message);
        });

};