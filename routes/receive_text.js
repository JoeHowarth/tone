var express = require('express');
var request = require('request');
var router = express.Router();
var bodyparser = require('body-parser');
var spawnSync = require("child_process").spawnSync;
var util = require('util');

const Speech = require('@google-cloud/speech');
const Language = require('@google-cloud/language');

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

    // create file and perform computation
    var command = ffmpeg(input_file)
        .outputFormat('s16le')
        .audioCodec('pcm_s16le')
        .save(output_file)
        .on('end', function(err){
            if (err) {
                console.log(err);
            }
            next_steps(map_to_song).then((result) => res.send(result));
        });
});

next_steps = async (map_to_song) => {
    var sentiment = await get_text();
    var avg_amp = await get_amplitude();
    return await map_to_song(sentiment, avg_amp);
}

get_text = async () => {
    var to_send = await fs.readFileSync(output_file).toString('base64');
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

    const data = await speechClient.recognize(request);
    const response = data[0];
    transcription = response.results.map(result =>
        result.alternatives[0].transcript).join('\n');
    console.log(`Transcription: ${transcription}`);
    return await get_sentiment(transcription);
        // .then((data) => {
        //     const response = data[0];
        //     transcription = response.results.map(result =>
        //         result.alternatives[0].transcript).join('\n');
        //     console.log(`Transcription: ${transcription}`);
        //     return get_sentiment(transcription);
        // })
        // .catch((err) => {
        //     console.error('ERROR:', err);
        // });

    // fs.unlink('./tmp/*');
}

get_sentiment = async (text) => {
    const language = new Language.LanguageServiceClient();
    const document = {
        content: text,
        type: 'PLAIN_TEXT'
    };

    // Detects the sentiment of the text
    let results = await language.analyzeSentiment({document: document, encodingType: "UTF"});
    return results[0].documentSentiment;
        // .then(results => {
        //     const sentiment = results[0].documentSentiment;
        //
        //     console.log(`Text: ${text}`);
        //     console.log(`Sentiment score: ${sentiment.score}`);
        //     console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
        // })
        // .catch(err => {
        //     console.error('ERROR:', err);
        // });
};

get_amplitude = async () => {
    const { stdout, stderr } = spawnSync('python3', ['./scripts/volume.py', input_file]);
    return stdout.toString("utf8");
};

map_to_song = async (sentiment, avg_amp) => {
    const { stdout, stderr } = spawnSync('python3', ['./final.py', sentiment.score, sentiment.magnitude, avg_amp],
        {cwd: "./scripts"});
    console.log(stderr.toString("utf8"));
    return stdout.toString("utf8");
}

module.exports = router;