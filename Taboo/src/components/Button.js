import React, { Component } from 'react';
import { View, TouchableOpacity, } from 'react-native';
import { Icon, Text } from 'native-base';
import coreStyle from '../styles/Core';

export default class Button extends Component {
  static defaultProps = {
      btnColour: '#f5f5f5',
      fontColour: '#000',
  }

  render() {
    let { props } = this;
    let {btnColour, fontColour, onPress, label, icon, style, ...otherProps} = props;

    return (
      <View {...otherProps} style={[style, {backgroundColor: 'white', borderRadius: 50, elevation: 2}]}>
        {
          props.label && props.icon &&
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPress}
            style={[{borderRadius: 50, height: 50}]}
          >
            <View style={[coreStyle.row, coreStyle.f1]}>
              <View style={[{
                flex: 6, justifyContent: 'center', alignItems: 'flex-start',
                paddingLeft: 30, borderRadius: 50, backgroundColor: props.btnColour,
              }]}>
                <Text style={coreStyle.sansSerif}>{props.label.toUpperCase()}</Text>
              </View>
              <View style={[{
                flex: 2, justifyContent: 'center', alignItems: 'center',
              }]}>
                <Icon style={{fontSize: 24, color: fontColour}} name={props.icon} />
              </View>
            </View>
          </TouchableOpacity>
        }
      </View>
    )
  }
}
