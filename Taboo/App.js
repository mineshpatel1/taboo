import * as Expo from "expo";
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { Root } from 'native-base';
import { createStore } from 'redux';
import AppNavigator from './src/AppNavigator';
import NavigationService from './src/NavigationService';
import reducers from './src/reducers/index';
import { initSettings } from './src/actions/SettingActions';

const AppContainer = createAppContainer(AppNavigator);
const store = createStore(reducers);

export default class App extends React.Component {
  constructor() {  // For loading screen
    super();
    this.state = {
      isReady: false
    };
  }

  async retrieveItem(key, _init = null) {
    try {
      const result = await AsyncStorage.getItem(key);
      if (_init) {
        store.dispatch(_init(JSON.parse(result)));
      }
      return result;
    } catch(e) {
      return null;
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Raleway': require('./assets/fonts/Raleway.ttf'),
      'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf'),
      'Lobster': require('./assets/fonts/Lobster.ttf'),
    });

    await this.retrieveItem('settings', initSettings);
    this.setState({ isReady: true });
  }

  render() {
    const navigation = {
      dispatch: this.props.dispatch,
      state: this.props.nav,
    };

    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <Provider store={ store }>
        <Root>
          <AppContainer ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}/>
        </Root>
      </Provider>
    );
  }
}
