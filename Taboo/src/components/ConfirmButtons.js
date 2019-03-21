import React from 'react';
import { View } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import styles from '../styles/Core';

export default class ConfirmButtons extends React.Component {
  static defaultProps = {
      yesText: 'Save',
      noText: 'Cancel',
      coloured: false,
      neutralText: null,
      neutralPress: null,
      yesIcon: 'checkmark',
      noIcon: 'close',
      neutralIcon: null,
  }

  render() {
    let { props } = this;

    let primary = true;
    let light = true;
    let success = false;
    let danger = false;
    let allLight = false;

    if (props.coloured) {
      primary = false;
      light = false;
      success = true;
      danger = true;
    }

    if (props.light) {
      light = true;
      allLight = true;
      primary = false;
      success = false;
      danger = false;
    }
    return (
      <View style={{ height: 60, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <Button
            primary={primary} success={success} rounded
            style={styles.formBtn} onPress={props.yesPress}
            bordered={props.bordered}
            disabled={props.yesDisabled}
            light={allLight}
          >
            {
              !props.yesIcon &&
              <Text>{props.yesText}</Text>
            }
            {
              props.yesIcon &&
              <Icon name={props.yesIcon} />
            }
          </Button>
          { props.neutralPress &&
            <Button
              light rounded
              style={styles.formBtn} onPress={props.neutralPress}
              bordered={props.bordered}
              disabled={props.neutralDisabled}
            >
              {
                !props.neutralIcon &&
                <Text>{props.neutralText}</Text>
              }
              {
                props.neutralIcon &&
                <Icon name={props.neutralIcon} />
              }
            </Button>
          }
          <Button
            light={light} danger={danger}
            rounded style={styles.formBtn}
            bordered={props.bordered}
            onPress={props.noPress} disabled={props.noDisabled}
            light={allLight}
          >
            {
              !props.noIcon &&
              <Text>{props.noText}</Text>
            }
            {
              props.noIcon &&
              <Icon name={props.noIcon} />
            }
          </Button>
        </View>
      </View>
    )
  }
}
