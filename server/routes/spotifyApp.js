'use strict'

var  $;



require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    $ = require("jquery")(window);
});

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

//const IP_ADDRESS = "http://b30ddca1.ngrok.io";
//console.log(IP_ADDRESS);
const SPOTIFY_USERNAME = "zmunnro";

var playlist = [];
var songImages = [];
var artistNames = [];
var currentSong;
var paused; // flag for paused or not
var songNumber; // keeps track of where we are in playlist
var songImage;
var song;
var volume;


function get_uri(song){
        if(song !== undefined) {
                song = song.replace(/ /g,"%20");
        }
                var songRequest = new XMLHttpRequest();
                                // Step 2: Make request to remote resource
                                // NOTE: https://messagehub.herokuapp.com has cross-origin resource sharing enabled
                songRequest.open("get", "https://api.spotify.com/v1/search?q=" + song + "&type=track", false);
                songRequest.send();     
                        //console.log(songRequest.readyState);
                        if(songRequest.readyState == 4) {
                                var obj = JSON.parse(songRequest.responseText);
                                if(obj.tracks.items[0] == undefined) {
                                    console.log("Not a song.");
                                } else {
                                    var songContent = '<ContentItem source="SPOTIFY" type="uri" location=https://open.spotify.com/track/4tERsdVCLtLtrGdFBf9DGC sourceAccount="zmunro"></ContentItem>'

                                    currentSong = songContent;  
                                }
                        }
}

function play_song(song_name){
    element = document.getElementById('songBox');
    element.innerHTML = get_uri(song_name);
}