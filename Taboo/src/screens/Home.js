import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import ThemeContainer from '../components/ThemeContainer';
import styles from '../styles/Core';

const menu = [
  {
    page: 'NewGame',
    text: 'Play Taboo',
    icon: 'play',
  },
  {
    page: 'Settings',
    text: 'Default Settings',
    icon: 'cog',
  }
];

const renderButton = (btn, i, props) => {
  if (!btn.hasOwnProperty('text')) {
    btn.text = btn.page;
  }
  return (
    <Button
      key={i} block rounded
      light style={{marginTop: 15}}
      onPress={() => props.navigation.navigate(btn.page)}
    >
      <Text style={{marginLeft: 10}}>{btn.text}</Text>
      <Right style={{marginRight: 20}}>
        <Icon style={{fontSize: 25}} name={btn.icon} />
      </Right>
    </Button>
  )
}

class Home extends React.Component {
  render() {
    return (
      <ThemeContainer>
        <Content contentContainerStyle={[styles.theme, styles.container, {
          flex: 1, justifyContent: 'center', alignItems: 'center'
        }]}>
          <View style={{width: 400, height: 300}}>
            <Image style={{width: 400, height: 150}} source={require('../../assets/titleImage.png')} />
          </View>
          <View style={{width: 300, height: 100}}>
            {menu.map((btn, i) => renderButton(btn, i, this.props))}
          </View>
        </Content>
      </ThemeContainer>
    );
  }
}

export default Home;
