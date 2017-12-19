const crypto = require('crypto');

const CustomError = require("../../commons/utils/custom_error");
const UsersService = require('../users/users_service');
const TokenService = require("./utils/token_service");

const HASH_ALGORITHM = "sha256";
const HTTP_STATUS_CODES = require("../../commons/utils/http_status_codes");


function authenticate(credentials) {

    const email = credentials.email;
    const password = credentials.password;

    return new Promise((resolve, reject) => {
        UsersService.find(credentials.email)
            .then(items => {
                if (items.length == 0) {
                    console.log("Invalid Email");
                    throw new CustomError("Invalid Email", HTTP_STATUS_CODES.UNAUTHORIZED);
                }

                const dbPassword = items[0].password;
                const hash = crypto.createHash(HASH_ALGORITHM);
                hash.update(credentials.password);
                const hashPassword = hash.digest("hex");
                
                if (dbPassword === hashPassword) {
                    // Passwords matches
                    // Generate tokens
                    const payload = {
                        data: {
                            email: credentials.email
                        }
                    };
                    console.log("[Authenticate Service]" + payload);
                    const token = TokenService.generate(payload);
                    resolve(token);
                } else {
                    console.log("Wrong password");
                    throw new CustomError("Wrong Password", HTTP_STATUS_CODES.UNAUTHORIZED);
                }
            })
            .catch(err => {
                reject(err);
            });

    });
}

function register(credentials) {

    return new Promise((resolve, reject) => {

        UsersService.find(credentials.email)
            .then(items => {
                if (items.length !== 0) {
                    console.log("Email is already used");
                    throw new CustomError("Email is already used", HTTP_STATUS_CODES.CONFLICT);
                }
                return;
            })
            .then(() => {
                hash = crypto.createHash(HASH_ALGORITHM);
                hash.update(credentials.password);
                credentials.password = hash.digest("hex");
                return UsersService.insert(credentials);
            })
            .then(data => {
                console.log("User inserted");
                console.log(data);
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

function validateCredentials(credentials) {
    for (let key in credentials) {
        if (credentials[key] === undefined) {
            return false;
        }
    }
    return true;
}

module.exports = {
    authenticate: authenticate,
    register: register,
    validateCredentials: validateCredentials
};

// const credentials = {
//     email: "ciprian.lazar95@gmail.com",
//     password: "admin"
// };

// authenticate(credentials)
//     .then(token => {
//         console.log(token);
//     })
//     .catch(err => {
//         console.log(err);
//     });