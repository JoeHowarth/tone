var express = require('express');
var request = require('request');
var router = express.Router();
var bodyparser = require('body-parser');

// POST route for receiving text from front-end
router.post('/send', function(req, res) {
    console.log(req.body);
    res.send(req.body + "Pizza");
    // request('https://language.googleapis.com/v1/documents' +
    //     ':analyzeEntities?key=API_KEY', function(error, response, body) {
    //     console.log(error);
    //     console.log(response);
    //     console.log(body);
    // });
});

module.exports = router;