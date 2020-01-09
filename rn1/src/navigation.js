import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Home from './screens/Home';
import Detail from './screens/Detail';

const AppNavigator = createStackNavigator({
    Home: {
        screen: Home
    },
    Detail: {
        screen: Detail
    }
});

export default createAppContainer(AppNavigator)
