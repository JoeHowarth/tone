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
    TouchableHighlight
} from 'react-native';

const SpotifyAuth = NativeModules.SpotifyAuth;
import {AudioRecorder, AudioUtils} from 'react-native-audio';

export default class Main extends Component<{}> {
    // static navigationOptions = {
    //     header: null,
    //     gesturesEnabled: false,
    // };

    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     currentTime: 0.0,
    //     //     recording: false,
    //     //     stoppedRecording: false,
    //     //     finished: false,
    //     //     currentSongPlaying: "",
    //     //     currentVolume: 5,
    //     //     audioPath: AudioUtils.DocumentDirectoryPath + '/analysis.aac',
    //     // }
    // }
    //
    // componentDidMount() {
    //     // this.prepareRecordingPath(this.state.audioPath);
    //     //
    //     // AudioRecorder.onProgress = (data) => {
    //     //     this.setState({currentTime: Math.floor(data.currentTime)});
    //     // };
    //     //
    //     // AudioRecorder.onFinished = (data) => {
    //     //     // Android callback comes in the form of a promise instead.
    //     //     if (Platform.OS === 'ios') {
    //     //         this._finishRecording(data.status === "OK", data.audioFileURL);
    //     //     }
    //     // };
    //
    //     // this._record();
    // };
    //
    // _finishRecording(didSucceed, filePath) {
    //     this.setState({finished: didSucceed});
    //     console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
    // }
    //
    //
    // prepareRecordingPath(audioPath) {
    //     AudioRecorder.prepareRecordingAtPath(audioPath, {
    //         SampleRate: 22050,
    //         Channels: 1,
    //         AudioQuality: "Low",
    //         AudioEncoding: "aac",
    //         AudioEncodingBitRate: 32000
    //     });
    // }
    //
    // async _record() {
    //     if (this.state.stoppedRecording) {
    //         this.prepareRecordingPath(this.state.audioPath);
    //     }
    //
    //     this.setState({recording: true});
    //
    //     try {
    //         await AudioRecorder.startRecording();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    //
    // async _stop() {
    //     try {
    //         const filePath = await AudioRecorder.stopRecording();
    //
    //         if (Platform.OS === 'android') {
    //             this._finishRecording(true, filePath);
    //         }
    //         return filePath;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    //
    // getRecording = async() => {
    //
    // };
    //
    // play = () => {
    //     SpotifyAuth.playURIs(["spotify:track:6LGabqtvan3SGYcL4guT0o", "spotify:track:58s6EuEYJdlb0kO7awm3Vp"], {trackIndex :0, startTime:0},(error)=>{console.log('error',error)});
    //
    // };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit App.js
                </Text>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
                {/*<TouchableHighlight onPress={this.play}>*/}
                    {/*<Text>Play</Text>*/}
                {/*</TouchableHighlight>*/}

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
