const { onRequest } = require("firebase-functions/v2/https");

exports.toTheDojo = onRequest((request, response) => {
    response.redirect('https://thenetninja.co.uk');
});