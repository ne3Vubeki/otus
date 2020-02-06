import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './screens/Home';
import Detail from './screens/Detail';
import Auth from './screens/Auth';
import Profile from './screens/Profile';

const AuthenticatedStack = createStackNavigator(
    {
        Home: {
            screen: Home,
        },
        Detail: {
            screen: Detail,
        },
        Profile: {
            screen: Profile,
        },
    },{
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    });

const AppNavigator = createSwitchNavigator({
    Login: {
        screen: Auth,
    },
    Main: {
        screen: AuthenticatedStack,
    },
});

export default createAppContainer(AppNavigator);
