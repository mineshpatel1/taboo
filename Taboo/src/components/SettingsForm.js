import React, { Component } from 'react';
import { TextInput, View, ScrollView } from 'react-native';
import { Container, Content, Button, ListItem, Body, Right, Left, Text, Icon } from 'native-base';
import Header from '../components/Header';
import Setting from '../components/Setting';
import ConfirmButtons from '../components/ConfirmButtons';
import styles from '../styles/Core';

export default class SettingsForm extends Component {
  state = {
    dirty: new Set(),
    roundLength: null,
    numTurns: null,
    numTeams: null,
  }

  config = [
    {
      name: 'numTeams',
      label: "Number of Teams",
      icon: "people",
      type: "numeric",
      validator: (val) => {return (2 <= val && val <= 5)},
    },
    {
      name: 'roundLength',
      label: "Round Length (s)",
      icon: "time",
      type: "numeric",
      validator: (val) => {return (3 <= val && val <= 300)},
    },
    {
      name: 'numTurns',
      label: "Number of Rounds",
      icon: "stats",
      type: "numeric",
      validator: (val) => {return (1 <= val && val <= 10)},
    },
  ]

  update(param, val) {
    let _dirty = new Set([param]);
    this.state.dirty.forEach((val) => {
      _dirty.add(val);
    });

    let newState = { dirty: _dirty };
    newState[param] = val;
    this.setState(newState);
  }

  render() {
    let { props, state, config } = this;
    let values = {};
    let valid = true;

    for (param in props.settings) {
      if (!state.dirty.has(param)) {
        values[param] = props.settings[param];
      } else {
        values[param] = state[param];
      }
    }

    for (let setting of config) {
      if (valid) {
        valid = setting.validator(values[setting.name]);
      }
    }

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 10}}>
          {
            config.map((setting, i) => (
              <Setting
                key={i}
                label={setting.label} icon={setting.icon}
                keyboardType={setting.type}
                value={values[setting.name]}
                validator={setting.validator}
                onChangeText={(val) => {
                  this.update(setting.name, val);
                }}
              />
            ))
          }
        </View>
        <ConfirmButtons
          yesPress={() => {
            props.confirm(values);
          }}
          yesDisabled={!valid}
          noPress={props.cancel}
          coloured={props.coloured}
          yesText={props.yesText}
          noText={props.noText}
          justifyContent='space-evenly'
        />
      </View>
    )
  }
}
