import React, { Component } from 'react';
import { View, ScrollView, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { Header, Title, Content, Footer, FooterTab, Left, Right, Body, Icon, Text } from 'native-base';
import Modal from "../components/Modal";
import ThemeContainer from '../components/ThemeContainer';
import ConfirmButtons from '../components/ConfirmButtons';
import Button from '../components/Button';
import style from '../styles/Core';
import animationDuration from '../constants';

const menu = [
  {
    page: 'NewGame',
    text: 'Play Taboo',
    icon: 'play',
  },
  {
    page: 'Info',
    text: 'Rules',
    icon: 'information-circle',
  },
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
      margin: new Animated.Value(0),
      page: 0,
      width: 280,
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
            this.setState({page: 0, margin: new Animated.Value(0)});  // Rest info
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

  animatePage(page) {
    Animated.timing(
      this.state.margin,
      {
        toValue: page * -1 * this.state.width,
        duration: 200,
        useNativeDriver: true,
      }
    ).start();
  }

  prevPage = () => {
    this.setState((prev) => {
      this.animatePage(prev.page - 1);
      return {page: prev.page - 1};
    });
  }

  nextPage = () => {
    this.setState((prev) => {
        this.animatePage(prev.page + 1);
        return {page: prev.page + 1};
    });
  }

  render() {
    const info = [
      "Divide yourself into teams, each team will be assigned a colour.",
      "Players on each team take turns as the \"giver\", who attempts to prompt their teammates to guess as many keywords as possible in the allotted time.",
      "When a player on the giver's team guesses the word correctly, the giver may press the tick (left) button.",
      "However, each card also has 5 \"taboo\" (forbidden) words listed which may not be spoken.",
      "If the giver says one, any player can call them out and the giver must click the cross (right) button.",
      "Any word may be skipped by pressing the skip (middle) button.",
      "A point is awarded to the team for each correctly guessed word, and deducted for each taboo word said.",
    ];

    return (
      <ThemeContainer>
        <Modal
          isVisible={this.state.info} onCancel={this.hideInfo}
          width={this.state.width + 70} height={450}
        >
          <Animated.View style={{
            flexDirection: 'row', width: (this.state.width * (info.length + 1)), height: 300,
            translateX: this.state.margin,
          }}>
            {
              info.map((txt, i) => (
                <View key={i} style={[style.center, {
                  padding: 10, width: this.state.width,
                }]}>
                  <Text style={style.modalText}>{info[i]}</Text>
                </View>
              ))
            }
          </Animated.View>
          <View style={[style.center, {height: 30}]}>
            <Text style={[style.fs20]}>{(this.state.page + 1) + '/' + info.length}</Text>
          </View>
          <ConfirmButtons
            light yesIcon='arrow-back' noIcon='arrow-forward'
            yesPress={this.prevPage}
            noPress={this.nextPage}
            yesDisabled={this.state.page == 0}
            noDisabled={this.state.page == info.length - 1}
            style={{width: this.state.width}}
          />
        </Modal>
        <Content contentContainerStyle={[style.theme, style.container, {
          flex: 1, justifyContent: 'center', alignItems: 'center'
        }]}>
          <View style={{marginTop: 300, width: 400, height: 240}}>
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
