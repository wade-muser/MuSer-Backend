require("dotenv").config({
    path: "env/config.env"
});
const fs = require('fs');
const jwt = require("jsonwebtoken");
const tokenOptions = {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
    algorithm: "RS256"
};
const publicKey = fs.readFileSync(process.env.JWT_PUBLIC_KEY_PATH);
const privateKey = fs.readFileSync(process.env.JWT_PRIVATE_KEY_PATH);

function tokenGenerator(payload) {
    const token = jwt.sign(payload, privateKey, tokenOptions);
    return token;
}

function tokenValidator(token) {
    const options = {
        algorithm: "RS256"
    };
    return new Promise((resolve, reject) => {
        jwt.verify(token, publicKey, options, (err, decode) => {
            if (err) {
                reject(err);
                return;
            }
            console.log("[Token Service]" + decode);
            const payload = decode.data;
            console.log("[Token Service]" + payload);
            resolve(payload);
        });
    });
}


module.exports = {
    generate: tokenGenerator,
    validate: tokenValidator
};

// const payload = {
//     data: {
//         email: "admin@admin.com"
//     }
// };
// const token = generateToken(payload);

// tokenValidator(token)
//     .then(payload => {
//         console.log(payload);
//     })
//     .catch(err => {

//         console.log(err);
//     });