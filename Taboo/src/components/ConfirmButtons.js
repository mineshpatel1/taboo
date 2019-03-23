import React from 'react';
import { View } from 'react-native';
import { Text, Icon } from 'native-base';
import Button from './Button';
import styles from '../styles/Core';

export default class ConfirmButtons extends React.Component {
  static defaultProps = {
      coloured: false,
      yesIcon: 'checkmark',
      noIcon: 'close',
      neutralIcon: null,
      neutralPress: null,
      width: 120,
  }

  render() {
    let { props } = this;
    let {style, ...otherProps} = props;
    let success = false;
    let danger = false;

    if (otherProps.coloured) {
      success = true;
      danger = true;
    }

    let width = otherProps.width;
    if (otherProps.neutralPress) {
      width = 100;
    }

    return (
      <View style={[style, { height: 60, justifyContent: 'center' }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button
            style={{width: width}} icon={otherProps.yesIcon} onPress={otherProps.yesPress} success={otherProps.coloured}
            disabled={otherProps.yesDisabled}
           />
          {
            otherProps.neutralPress &&
            <Button
              style={{width: width}} icon={otherProps.neutralIcon} onPress={otherProps.neutralPress} disabled={otherProps.neutralDisabled}
            />
          }
          <Button
            style={{width: width}} icon={otherProps.noIcon} onPress={otherProps.noPress} danger={otherProps.coloured}
            disabled={otherProps.noDisabled}
          />
        </View>
      </View>
    )
  }
}
