import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput, View } from 'react-native';
import { Content, Button } from 'native-base';
import ThemeContainer from '../components/ThemeContainer';
import Header from '../components/Header';
import SettingsForm from '../components/SettingsForm';
import { saveSettings } from '../actions/SettingActions';
import style from '../styles/Core';

class Settings extends Component {
  render() {
    let { props } = this;
    return (
        <ThemeContainer>
          <Header title="Default Settings"/>
          <View style={style.container}>
            <SettingsForm
              coloured
              settings={props.settings}
              confirm={(values) => {
                props.saveSettings(values);
                props.navigation.goBack();
              }}
              cancel={() => {
                props.navigation.goBack();
              }}
            />
          </View>
        </ThemeContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    settings: state.settings.settings,
  }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    saveSettings,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
