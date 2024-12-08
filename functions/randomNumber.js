const { onRequest } = require("firebase-functions/v2/https");

exports.randomNumber = onRequest((request, response) => {
    const number = Math.round(Math.random() * 100);
    response.send(number.toString());
});