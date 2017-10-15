import { StackNavigator } from 'react-navigation';

import Login from './LoginPage';
import Main from './Main';
import Music from './Music'


const Navigator = StackNavigator({
    Login: { screen: Login },
    Music: { screen: Music },
}, {
    initialRouteName: 'Login',
});


export default Navigator;