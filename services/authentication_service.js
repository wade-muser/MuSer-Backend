const UsersService = require('./users_service');
const crypto = require('crypto');
const TokenService = require("./token_service");
const HASH_ALGORITHM = "sha256";


function authenticate(credentials) {

    const email = credentials.email;
    const password = credentials.password;

    return new Promise((resolve, reject) => {
        UsersService.find(credentials.email)
            .then(items => {
                if (items.length == 0) {
                    console.log("Invalid Email");
                    throw (new Error("Wrong Email or password"));
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
                    throw new Error("Wrong Email or password");
                }
            })
            .catch(err => {
                reject(err);
            });

    });
}

function register(credentials) {

    return new Promise((resolve, reject) => {
        hash = crypto.createHash(HASH_ALGORITHM);
        hash.update(credentials.password);
        credentials.password = hash.digest("hex");

        UsersService.insert(credentials)
            .then(data => {
                console.lor("User inserted");
                console.log(data);
                resolve();
            })
            .catch(err => {
                reject(err);
            });
    });
}

function validateCredentials(credentials) {
    for (let key of credentials) {
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