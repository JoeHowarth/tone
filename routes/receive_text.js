var express = require('express');
var request = require('request');
var router = express.Router();
var bodyparser = require('body-parser');
const Speech = require('@google-cloud/speech');
const fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const linear16 = require('linear16');

var config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 44100,
    languageCode: 'en-US'
};

// POST route for receiving text from front-end
router.post('/send', function(req, res) {
    var tmp = new Buffer(req.body.toString("binary"), "binary");
    fs.writeFile('./tmp/input.aac', tmp, {encoding: null});

    var command = ffmpeg('./tmp/input.aac')
        .outputFormat('s16le')
        .audioCodec('pcm_s16le')
        .save('./tmp/output.raw')
        .on('end', function(err){
            if (err) {
                console.log(err);
            }
            res.send(next_steps());
        });
});

function next_steps() {
    var to_send = fs.readFileSync('./tmp/output.raw').toString('base64');
    var transcription;

    // audio encoding features
    var audio = {
        content: to_send
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
            transcription = response.results.map(result =>
                result.alternatives[0].transcript).join('\n');
            console.log(`Transcription: ${transcription}`);
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });

    return transcription;
    // fs.unlink('./tmp/*');
}

module.exports = router;