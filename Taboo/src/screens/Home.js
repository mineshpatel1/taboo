import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Header, Title, Content, Footer, FooterTab, Left, Right, Body, Icon, Text } from 'native-base';
import Modal from "react-native-modal";
import ThemeContainer from '../components/ThemeContainer';
import Button from '../components/Button';
import style from '../styles/Core';
import animationDuration from '../constants';

const menu = [
  {
    page: 'NewGame',
    text: 'Play Taboo',
    icon: 'play',
  },
  // {
  //   page: 'Info',
  //   text: 'Rules',
  //   icon: 'information-circle',
  // },
  {
    page: 'Settings',
    text: 'Default Settings',
    icon: 'cog',
  }
];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: false,
    }
  }

  renderButton = (btn, i, props) => {
    if (!btn.hasOwnProperty('text')) {
      btn.text = btn.page;
    }
    return (
      <Button
        key={i} style={{marginBottom: 15}} label={btn.text} icon={btn.icon}
        onPress={() => {
          if (btn.page != 'Info') {
            props.navigation.navigate(btn.page);
          } else {
            this.showInfo();
          }
        }}
      />
    )
  }

  showInfo = () => {
    this.setState({info: true});
  }

  hideInfo = () => {
    this.setState({info: false});
  }

  render() {
    return (
      <ThemeContainer>
        <Modal
          isVisible={this.state.info}
          animationIn='fadeIn'
          animationOut='fadeOut'
          animationInTiming={animationDuration}
          animationOutTiming={animationDuration}
          onBackButtonPress={this.hideInfo}
          onBackdropPress={this.hideInfo}
          style={[style.center]}
          backdropOpacity={0.75}
        >
          <View style={[
            style.lightBox, style.center,
            {
              width: 350, height: 450,
              paddingLeft: 50, paddingRight: 50, paddingTop: 50, paddingBottom: 15,
            },
          ]}>
            <View style={{flex: 9}}>
              <Text style={style.modalText}>Divide yourself into teams.</Text>
            </View>
          </View>
        </Modal>
        <Content contentContainerStyle={[style.theme, style.container, {
          flex: 1, justifyContent: 'center', alignItems: 'center'
        }]}>
          <View style={{marginTop: 350, width: 400, height: 300}}>
            <Image style={{width: 400, height: 150}} source={require('../../assets/images/title.png')} />
          </View>
          <View style={{width: 300, height: 300}}>
            {menu.map((btn, i) => this.renderButton(btn, i, this.props))}
          </View>
        </Content>
      </ThemeContainer>
    );
  }
}

export default Home;
