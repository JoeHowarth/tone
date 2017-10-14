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
    // audio encoding features
    var audio = {
        content: req.body
    };

    var request = {
        audio: audio,
        config: config
    };

    // google speech client
    const projectId = 'polytest-182204';
    const speechClient = Speech({
        projectId: projectId
    });

    speechClient.recognize(request)
        .then((data) => {
        console.log(data);
        const response = data[0];
        const transcription = response.results.map(result =>
            result.alternatives[0].transcript).join('\n');
        console.log(`Transcription: ${transcription}`);
    })
    .catch((err) => {
            console.error('ERROR:', err);
    });
});

module.exports = router;