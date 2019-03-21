import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { Container, StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';

export default class ThemeContainer extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container {...this.props} />
      </StyleProvider>
    )
  }
}
