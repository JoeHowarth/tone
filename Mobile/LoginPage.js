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
    StatusBar,
    Image,
    Dimensions,
} from 'react-native';

const SpotifyAuth = NativeModules.SpotifyAuth;
const {width, height} = Dimensions.get('window');

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
                this.props.navigation.navigate('Music');
            } else {
                console.log('error:',error);
            }
        });
    };


    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.test}>
                <Image source={require('./background.jpg')} resizeMode="cover"
                       style={{height: height, width: width + 2}}/>
                </TouchableHighlight>
                <StatusBar hidden={true}/>
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
