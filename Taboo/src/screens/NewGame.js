import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import ThemeContainer from '../components/ThemeContainer';
import Header from '../components/Header';
import SettingsForm from '../components/SettingsForm';
import style from '../styles/Core';
import { newGame } from '../actions/GameActions';

class NewGame extends React.Component {
  render() {
    let { props } = this;
    return (
      <ThemeContainer>
        <Header title="New Game"/>
        <View style={style.container}>
          <SettingsForm
            settings={props.settings}
            confirm={(values) => {
              props.newGame(values);
              props.navigation.navigate('Game');
            }}
            cancel={() => {
              props.navigation.goBack();
            }}
            coloured={true}
            yesText="Play"
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
    newGame,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(NewGame);
