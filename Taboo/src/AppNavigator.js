import { Animated, Easing } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import animationDuration from './constants';
import Home from './screens/Home';
import NewGame from './screens/NewGame';
import Settings from './screens/Settings';
import Game from './screens/Game';

const customTransition = ({ position, layout, scene, scenes, index }) => {
  return {
    transitionSpec: {
      duration: animationDuration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { position, layout, scene, index, scenes } = sceneProps;
      const toIndex = index;
      const lastSceneIndex = scenes[scenes.length - 1].index;
      const thisSceneIndex = scene.index;
      const height = layout.initHeight;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      });

      let translateXMulti;
      if (!isNaN(thisSceneIndex)) {
        translateXMulti = position.interpolate({
          inputRange: [0, thisSceneIndex, thisSceneIndex + 1],
          outputRange: [width, 0, 0],
        });
      }

      if (lastSceneIndex - index > 1) {
        if (scene.index === index) return;
        if (scene.index !== lastSceneIndex) return { opacity: 0 };
        return { transform: [{ translateX: translateXMulti }] };
      }
      return { transform: [{ translateX }] };
    }
  }
}

const AppNavigator = createStackNavigator({
  Home: { screen: Home, navigationOptions: {title: "Taboo", header: null} },
  NewGame: { screen: NewGame, navigationOptions: {title: "Choose Settings", header: null} },
  Settings: { screen: Settings, navigationOptions: {title: "Settings", header: null} },
  Game: { screen: Game, navigationOptions: {title: "Play Taboo", header: null} },
},
{
  initialRouteName: "Home",
  transitionConfig: (nav) => customTransition(nav),
});

export default AppNavigator;
