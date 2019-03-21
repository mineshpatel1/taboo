import React from 'react';
import { Animated, View } from 'react-native';
import { Text } from 'native-base';
import utils from '../utils';
import style from '../styles/Core';

export default class Timer extends React.Component {
  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  constructor(props) {
    super(props);

    this.state = {
      timer: props.length,
    };

    setInterval(() => {
      if (this.mounted) {
        if (this.state.timer > 0) {
          this.setState(prev => (
            { timer: prev.timer - 1 }
          ));
        }
      }
    }, 1000);
  }

  reset() {
    this.setState({
      timer: this.props.length,
    });
  }

  render() {
    let {props, state} = this;

    return (
      <Text style={props.style}>
        {utils.formatSeconds(state.timer)}
      </Text>
    )
  }
}
