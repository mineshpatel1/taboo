import { createStackNavigator } from 'react-navigation';
import { fromLeft, fadeIn, zoomIn, zoomOut, fromTop } from 'react-navigation-transitions';

import Home from './screens/Home';
import NewGame from './screens/NewGame';
import Settings from './screens/Settings';
import Game from './screens/Game';

const AppNavigator = createStackNavigator({
  Home: { screen: Home, navigationOptions: {title: "Taboo", header: null} },
  NewGame: { screen: NewGame, navigationOptions: {title: "Choose Settings", header: null} },
  Settings: { screen: Settings, navigationOptions: {title: "Settings", header: null} },
  Game: { screen: Game, navigationOptions: {title: "Play Taboo", header: null} },
},
{
  initialRouteName: "Home",
  transitionConfig: () => fadeIn(),
});

export default AppNavigator;
