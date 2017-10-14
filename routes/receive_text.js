var express = require('express');
var request = require('request');
var router = express.Router();
var bodyparser = require('body-parser');
const Speech = require('@google-cloud/speech');
const fs = require('fs');
var config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US'
};

// POST route for receiving text from front-end
router.post('/send', function(req, res) {
    res.send(req.body);
//     // audio encoding features
//     var audio = {
//         content: req.body
//     };
//     var request = {
//         audio: audio,
//         config: config
//     };
//
// // google speech client
//     const projectId = 'polytest-182204';
//     const speechClient = Speech({
//         projectId: projectId
//     });
//     request('https://speech.googleapis.com/v1/documents' +
//         ':analyzeEntities?key=' + app.config, function(error, response, body) {
//
//     });
});

module.exports = router;