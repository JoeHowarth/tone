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
    StatusBar
} from 'react-native';

const SpotifyAuth = NativeModules.SpotifyAuth;


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class Login extends Component<{}> {
    componentDidMount() {

    }

    static navigationOptions = {
        header: null,
        gesturesEnabled: false
    };

    test = () => {
        SpotifyAuth.setClientID('de293e4d607845e8afac9bdaf4a07f4c','tone://callback',['streaming'],(error)=>{
            if(!error){
                // alert('heya');
                this.props.navigation.navigate('Music');

            } else {
                alert('FUCKKKK');
                console.log('error:',error);
            }
        });
    };

    // play = () => {
    //     SpotifyAuth.playURIs(["spotify:track:6LGabqtvan3SGYcL4guT0o", "spotify:track:58s6EuEYJdlb0kO7awm3Vp"], {trackIndex :0, startTime:0},(error)=>{console.log('error',error)});
    //
    // };
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true}/>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit App.js
                </Text>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
                <TouchableHighlight onPress={this.test}>
                    <Text>CLICK ME</Text>
                </TouchableHighlight>

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
