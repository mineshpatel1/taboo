import React, { Component } from 'react';
import Modal from "react-native-modal";
import { View, Image, TouchableOpacity } from 'react-native';
import { Header, Title, Content, Footer, FooterTab, Left, Right, Body, Icon, Text } from 'native-base';
import animationDuration from '../constants';
import style from '../styles/Core';
import { colours } from '../styles/colours';

export default class CustomModal extends Component {
  static defaultProps = {
    width: 350,
    height: 450,
    animationIn: 'slideInRight',
    animationOut: 'slideOutRight',
    theme: false,
  }
  render() {
    const sidePadding = 35;
    let bgColour = colours.white;
    let crossColour = colours.danger;

    if (this.props.theme) {
      bgColour = colours.primary;
      crossColour = colours.white;
    }

    return (
      <Modal
        isVisible={this.props.isVisible}
        animationIn={this.props.animationIn}
        animationOut={this.props.animationOut}
        animationInTiming={animationDuration}
        animationOutTiming={animationDuration}
        onBackButtonPress={this.props.onCancel}
        onBackdropPress={this.props.onCancel}
        style={[style.center]}
        backdropOpacity={0.75}
        useNativeDriver={true}
        hideModalContentWhileAnimating
        hardwareAccelerated
      >
        <View style={[
          {
            width: this.props.width, height: this.props.height,
            backgroundColor: bgColour, borderRadius: 5,
          },
        ]}>
          <View style={{
            height: 45, width: this.props.width, borderRadius: 0,
            flexDirection: 'row', paddingRight: 15,
            justifyContent: 'flex-end', alignItems: 'center',
          }}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Icon style={{fontSize: 30, color: crossColour}} name={'close'} />
            </TouchableOpacity>
          </View>
          <View style={{
            width: this.props.width, height: this.props.height - 45,
            paddingLeft: sidePadding, paddingRight: sidePadding,
            paddingBottom: 15, borderRadius: 5,
          }}>
            <View style={{
              flex: 1, overflow: 'hidden',
            }}>
              {this.props.children}
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
