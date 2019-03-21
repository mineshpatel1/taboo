import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Header, Title, Content, Footer, FooterTab, Left, Right, Body, Icon, Text } from 'native-base';
import ThemeContainer from '../components/ThemeContainer';
import Button from '../components/Button';
import style from '../styles/Core';

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
      key={i} style={{marginBottom: 15}} label={btn.text} icon={btn.icon}
      onPress={() => props.navigation.navigate(btn.page)}
    />
  )
}

class Home extends React.Component {
  render() {
    return (
      <ThemeContainer>
        <Content contentContainerStyle={[style.theme, style.container, {
          flex: 1, justifyContent: 'center', alignItems: 'center'
        }]}>
          <View style={{marginTop: 300, width: 400, height: 300}}>
            <Image style={{width: 400, height: 150}} source={require('../../assets/images/title.png')} />
          </View>
          <View style={{width: 300, height: 300}}>
            {menu.map((btn, i) => renderButton(btn, i, this.props))}
          </View>
        </Content>
      </ThemeContainer>
    );
  }
}

export default Home;
