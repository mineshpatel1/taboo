import React, { Component } from 'react';
import { View, TouchableOpacity, } from 'react-native';
import { Icon, Text } from 'native-base';
import coreStyle from '../styles/Core';
import { colours } from '../styles/colours';

export default class Button extends Component {
  static defaultProps = {
      btnColour: colours.lightBg,
      fontColour: colours.black,
      activeOpacity: 0.6,
  }

  render() {
    let { props } = this;
    let {
      btnColour, fontColour, onPress, label, icon, style, success, danger,
      disabled, activeOpacity, ...otherProps
    } = props;

    if (success || danger) fontColour = colours.white;

    if (success) btnColour = colours.success;
    if (danger) btnColour = colours.danger;
    if (disabled) {
      btnColour = colours.disabled;
      onPress = null;
      activeOpacity = 1;
    }

    return (
      <View {...otherProps} style={[style, {backgroundColor: 'white', borderRadius: 50, elevation: 2}]}>
        <TouchableOpacity
          activeOpacity={activeOpacity}
          onPress={onPress}
          style={[{borderRadius: 50, height: 50}]}
        >
          {
            label && icon &&
            <View style={[
              coreStyle.row, coreStyle.f1,
              {paddingLeft: 30, borderRadius: 50, backgroundColor: btnColour,}
            ]}>
              <View style={[{
                flex: 6, justifyContent: 'center', alignItems: 'flex-start',
              }]}>
                <Text style={coreStyle.sansSerif}>{label.toUpperCase()}</Text>
              </View>
              <View style={[{
                flex: 2, justifyContent: 'center', alignItems: 'center',
              }]}>
                <Icon style={{fontSize: 24, color: fontColour}} name={icon} />
              </View>
            </View>
          }
          {
            label && !icon &&
            <View style={[
              coreStyle.row, coreStyle.f1, coreStyle.center,
              {borderRadius: 50, backgroundColor: btnColour}
            ]}>
              <Text style={coreStyle.sansSerif}>{label.toUpperCase()}</Text>
            </View>
          }
          {
            !label && icon &&
            <View style={[
              coreStyle.row, coreStyle.f1, coreStyle.center,
              {borderRadius: 50, backgroundColor: btnColour}
            ]}>
              <Icon style={{fontSize: 24, color: fontColour}} name={icon} />
            </View>
          }
        </TouchableOpacity>
      </View>
    )
  }
}
