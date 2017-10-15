/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    NativeModules,
    TouchableHighlight,
    PermissionsAndroid,
    Image,
    Dimensions
} from 'react-native';

const SpotifyAuth = NativeModules.SpotifyAuth;
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import Sound from 'react-native-sound';
import RNFetchBlob from 'react-native-fetch-blob';
const {width, height} = Dimensions.get('window');


export default class Music extends Component<{}> {
    static navigationOptions = {
        header: null,
        gesturesEnabled: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            currentTime: 0.0,
            buffer: false,
            recording: false,
            stoppedRecording: false,
            finished: false,
            currentSongPlaying: "3S4px9f4lceWdKf0gWciFu",
            currentVolume: 0.5,
            audioPath: AudioUtils.DocumentDirectoryPath + '/analysis.aac',
            hasPermission: undefined,
        }
    }

    componentDidMount() {
        this._checkPermission().then((hasPermission) => {
            this.setState({hasPermission});

            if (!hasPermission) return;

            this.prepareRecordingPath(this.state.audioPath);

            AudioRecorder.onProgress = (data) => {
                this.setState({currentTime: Math.floor(data.currentTime)});
            };

            AudioRecorder.onFinished = (data) => {
                // Android callback comes in the form of a promise instead.
                if (Platform.OS === 'ios') {
                    this._finishRecording(data.status === "OK", data.audioFileURL);
                }
            };
        });

        setTimeout(() => {
            this.getRecording();
        }, 1000);


        setTimeout(() => {
            SpotifyAuth.playURIs(["spotify:track:6vECYJHxYmm3Ydt3fF01pE", "spotify:track:58s6EuEYJdlb0kO7awm3Vp"], {trackIndex :0, startTime:0},(error)=>{console.log('error',error)});
        }, 1000);



        // setInterval(this.getData, 5000);
    };

    _finishRecording(didSucceed, filePath) {
        this.setState({finished: didSucceed});
        console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
    }

    _play = async () => {
        // this.setState({AudioUtils.DocumentDirectoryPath + '/analysis.aac'})
        AudioRecorder.pauseRecording();
        // AudioRecorder.stopRecording();

        setTimeout(() => {
        RNFetchBlob.fetch('POST', 'https://tone-server.herokuapp.com/send', {
            // dropbox upload headers
            'Content-Type' : 'audio/aac',
            // Change BASE64 encoded data to a file path with prefix `RNFetchBlob-file://`.
            // Or simply wrap the file path with RNFetchBlob.wrap().
        }, RNFetchBlob.wrap(this.state.audioPath))
            .then((res) => {
                alert(res.data);
                let data = JSON.parse(res.data);
                let id = data['song_ID'];
                // SpotifyModule.setVolume(0.8,(error)=>{console.log(error);});
                SpotifyAuth.playURIs(["spotify:track:" + id], {trackIndex :0, startTime:20},(error)=>{console.log('error',error)});
            })
            .catch((err) => {
                // error handling ..
            });
        }, 1000);


        // // These timeouts are a hacky workaround for some issues with react-native-sound.
        // // See https://github.com/zmxv/react-native-sound/issues/89.
        // setTimeout(() => {
        //     var sound = new Sound(this.state.audioPath, '', (error) => {
        //         if (error) {
        //             alert('error1');
        //             console.log('failed to load the sound', error);
        //         }
        //     });
        //
        //     setTimeout(() => {
        //         sound.play((success) => {
        //             if (success) {
        //                 alert('?!');
        //                 console.log('successfully finished playing');
        //             } else {
        //                 alert('error');
        //                 console.log('playback failed due to audio decoding errors');
        //             }
        //         });
        //     }, 1000);
        // }, 1000);
    };

    prepareRecordingPath(audioPath) {
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 22050,
            Channels: 2,
            AudioQuality: "Low",
            AudioEncoding: "aac",
            AudioEncodingBitRate: 32000
        });
    }

    decreaseVolume = () => {
            SpotifyModule.setVolume(0.8,(error)=>{console.log(error);});
    };

    getData = async() => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                alert('success', request.responseText);
            } else {
                console.warn('error');
            }
        };

        request.open('GET', 'https://mywebsite.com/endpoint/');
        request.send();
    };

    _checkPermission() {
        if (Platform.OS !== 'android') {
            return Promise.resolve(true);
        }

        const rationale = {
            'title': 'Microphone Permission',
            'message': 'Tone needs access to your microphone so you can record audio.'
        };

        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
            .then((result) => {
                console.log('Permission result:', result);
                return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
            });
    }

    _record = async () => {
        this.prepareRecordingPath(this.state.audioPath);

        this.setState({recording: true});

        try {
            await AudioRecorder.startRecording();
        } catch (error) {
            console.error(error);
        }
    };

    async _stop() {
        try {
            const filePath = await AudioRecorder.stopRecording();

            if (Platform.OS === 'android') {
                this._finishRecording(true, filePath);
            }
            return filePath;
        } catch (error) {
            console.error(error);
        }
    }

    getRecording = async() => {
        this._record();

        setTimeout(() => {
            // Send data out
            this._play();
            setTimeout(() => {
                this.getRecording();
            }, 2000);
        }, 20000);
    };

    play = () => {
        SpotifyAuth.playURIs(["spotify:track:6LGabqtvan3SGYcL4guT0o", "spotify:track:58s6EuEYJdlb0kO7awm3Vp"], {trackIndex :0, startTime:30.0},(error)=>{console.log('error',error)});

    };

    record = async () => {
        await this._record();
    };

    render() {
        return (
            <View style={styles.container}>
                    <Image source={require('./bg2.jpg')} resizeMode="cover"
                           style={{height: height, width: width + 2}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
