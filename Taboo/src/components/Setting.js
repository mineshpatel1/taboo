import React, { Component } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { View, Button, ListItem, Body, Right, Left, Text, Icon } from 'native-base';
import style from '../styles/Core';

export default class Setting extends Component {
  render() {
    let { props } = this;

    let value = null;
    if (props.value) {  // Even numeric inputs need strings
      value = props.value.toString();
    }

    let valid = true;
    if (props.validator) {
      valid = props.validator(props.value);
    }

    let labelStyle = null;
    if (!valid) {
      labelStyle = style.danger;
    }

    let bgStyle = style.theme;
    if (!valid) {
      bgStyle = style.danger;
    }

    return (
      <View style={[bgStyle, style.shadow, {
        height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
        marginBottom: 10, borderRadius: 50,
      }]}>
        <View style={{marginLeft: 10, width: 50, padding: 10}}>
          <TouchableOpacity onPress={() => {this.input.focus()}}>
            <Icon active name={props.icon} style={style.lightText} />
          </TouchableOpacity>
        </View>
        <View style={{flex: 8, paddingLeft: 10}}>
          <TouchableOpacity onPress={() => {this.input.focus()}} activeOpacity={1}>
            <Text style={[style.settingLabelText]}>{props.label}</Text>
          </TouchableOpacity>
        </View>
        <View style={[style.bgLight, {
          flex: 2, paddingLeft: 15, justifyContent: 'center',
          alignItems: 'flex-start', height: 50,
          borderTopRightRadius: 50, borderBottomRightRadius: 50,
        }]}>
          <TextInput
            {...props}
            value={value}
            style={style.settingInputText}
            ref={x => this.input = x}
          />
        </View>
      </View>
    )
  }
}
