var express = require('express');
var request = require('request');
var router = express.Router();
var bodyparser = require('body-parser');
var spawn = require("child_process").spawn;

const Speech = require('@google-cloud/speech');
const fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const input_file = './tmp/input.aac';
const output_file = './tmp/output.raw';

var config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 44100,
    languageCode: 'en-US'
};

// POST route for receiving text from front-end
router.post('/send', function(req, res) {
    var tmp = new Buffer(req.body.toString("binary"), "binary");
    fs.writeFile(input_file, tmp, {encoding: null});

    // fix frequency based on text
    var command0 = ffmpeg(input_file)
        .ffprobe(function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                config.sampleRateHertz = data.streams[0].sample_rate;
            }
        });

    // create file and perform computation
    var command = ffmpeg(input_file)
        .outputFormat('s16le')
        .audioCodec('pcm_s16le')
        .save(output_file)
        .on('end', function(err){
            if (err) {
                console.log(err);
            }
            res.send(next_steps());
        });
});

function next_steps() {
    var text = get_text();
    var avg_amp = get_amplitude();
    console.log(amplitude);
    // var sentiment = get_sentiment();
    // return matching_song(speech_characteristics);
}

function get_amplitude() {
    var process = spawn('python', ['./scripts/volume.py', input_file]);
    process.stdout.on('data', function(data) {
       return data;
    });
}

function get_text() {
    var to_send = fs.readFileSync(output_file).toString('base64');
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
            const response = data[0];
            transcription = response.results.map(result =>
                result.alternatives[0].transcript).join('\n');
            console.log(`Transcription: ${transcription}`);
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });

    // fs.unlink('./tmp/*');
}

module.exports = router;