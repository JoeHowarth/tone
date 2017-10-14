var express = require('express');
var request = require('request')
var router = express.Router();

// POST route for receiving text from front-end
router.post('/send', function(req, res) {
    res.send(req);
    // request('', function(error, response, body) {
    //     console.log(error);
    //     console.log(response);
    //     console.log(body);
    // });
});

module.exports = router;