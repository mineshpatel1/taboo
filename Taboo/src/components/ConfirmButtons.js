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
    let success = false;
    let danger = false;

    if (props.coloured) {
      success = true;
      danger = true;
    }

    let width = props.width;
    if (props.neutralPress) {
      width = 100;
    }

    return (
      <View style={{ height: 60, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button
            style={{width: width}} icon={props.yesIcon} onPress={props.yesPress} success={props.coloured}
            disabled={props.yesDisabled}
           />
          {
            props.neutralPress &&
            <Button
              style={{width: width}} icon={props.neutralIcon} onPress={props.neutralPress} disabled={props.neutralDisabled}
            />
          }
          <Button
            style={{width: width}} icon={props.noIcon} onPress={props.noPress} danger={props.coloured}
            disabled={props.noDisabled}
          />
        </View>
      </View>
    )
  }
}
