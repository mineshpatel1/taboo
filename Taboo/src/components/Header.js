import React from 'react';
import { View, Modal, Text } from 'react-native';
import { Header, Left, Right, Button, Icon, Body, Title } from 'native-base';
import NavigationService from '../NavigationService';
import style from '../styles/Core';
import utils from '../utils';

export default class CustomHeader extends React.Component {
  nav(route) {
    if (route) {
      NavigationService.navigate(route);
    } else {
      NavigationService.back();
    }
  }

  render() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => this.nav(this.props.nav)}>
            <Icon name='arrow-back' />
          </Button>
        </Left>
        <Body style={{justifyContent: 'center'}}>
          <Text style={style.title}>{this.props.title}</Text>
        </Body>
        <Right />
      </Header>
    )
  }
}
