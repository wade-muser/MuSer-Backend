require("dotenv").config({
    path: "env/config.env"
});
const CustomError = require("../utils/custom_error");
const HTTP_STATUS_CODES = require("../utils/status_codes");
const aws = require('aws-sdk');
const config = {
    accessKeyId: process.env.DB_ACCESS_KEY_ID,
    secretAccessKey: process.env.DB_SECRET_ACCESS_KEY,
    region: process.env.DB_REGION
};
aws.config.update(config);
const dynamoDB = new aws.DynamoDB.DocumentClient();
const USERS_TABLE_NAME = process.env.DB_USERS_TABLE_NAME;

function findAll() {
    const query = {
        TableName: USERS_TABLE_NAME
    };
    return new Promise((resolve, reject) => {
        dynamoDB.scan(query, (err, data) => {
            if (err) {
                console.log(err);
                reject(new CustomError("Some error occurred", HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR));
                return;
            }
            resolve(data.Items);
        });
    });
}

function insertUser(item) {
    const query = {
        TableName: USERS_TABLE_NAME,
        Item: item
    };

    return new Promise((resolve, reject) => {
        dynamoDB.put(query, (err, data) => {
            if (err) {
                console.log(err);
                reject(new CustomError("Some error occurred", HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR));
                return;
            }
            resolve(JSON.stringify(data, null, 4));
        });
    });
}

function find(email) {
    const query = {
        TableName: USERS_TABLE_NAME,
        KeyConditionExpression: "#email = :email",
        ExpressionAttributeNames: {
            "#email": "email"
        },
        ExpressionAttributeValues: {
            ":email": email
        }
    };

    return new Promise((resolve, reject) => {
        dynamoDB.query(query, (err, data) => {
            if (err) {
                console.log(err);
                reject(new CustomError("Some error occurred", HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR));
                return;
            }
            const items = data.Items;
            resolve(items);
        });
    });
}



// hash.update("pufosu");

// const newUser = {
//     email: "cristea@gmail.com",
//     password: hash.digest("hex"),
//     firstName: "Alexandru",
//     lastName: "Cristea"
// };

// const email = "ciprian.lazar95@gmail.com";
// find(email)
//     .then(items => {
//         if (items.length == 0) {
//             console.log("No user found");
//             return;
//         }
//         const user = items[0];
//         hash = crypto.createHash('sha256');
//         hash.update("admin");
//         console.log(hash.digest("hex"));
//         console.log(user.password);
//     })
//     .catch(err => {
//         console.log(err);
//     });

// insertUser(newUser)
//     .then(data => {
//         console.log("User inserted");
//         console.log(data);
//     })
//     .catch(err => {
//         console.log(err);
//     });


// findAll()
//     .then(items => {
//         console.log(items);
//     })
//     .catch(err => {
//         console.log(err);
//     });


module.exports = {
    findAll: findAll,
    insert: insertUser,
    find: find
};