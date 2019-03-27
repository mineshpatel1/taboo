import React from 'react';
import { View } from 'react-native';
import { Grid, Col, Row, Text, Button, Icon } from 'native-base';
import Modal from '../components/Modal';
import ConfirmButtons from '../components/ConfirmButtons';
import style from '../styles/Core';
import { colours } from '../styles/colours';
import animationDuration from '../constants';

export default class ConfirmModal extends React.Component {
  static defaultProps = {
      animationType: 'fade',
      width: 350,
      height: 350,
      theme: false,
  }

  render() {
    let coloured = true;
    let fontStyle = { color: colours.black };

    if (this.props.theme) {
      coloured = false;
      fontStyle = { color: colours.white };
    }

    return (
      <Modal
        isVisible={this.props.isVisible}
        onCancel={this.props.onCancel}
        animationIn={this.props.animationIn}
        animationOut={this.props.animationOut}
        theme={this.props.theme}
        width={350} height={350}
      >
        <View style={[style.center, {padding: 10, flex: 9}]}>
          <Text style={[style.modalText, fontStyle]}>{this.props.text}</Text>
        </View>
        <ConfirmButtons
          yesPress={this.props.onSuccess}
          noPress={this.props.onCancel}
          coloured={coloured}
          style={{width: this.props.width - 70}}
        />
      </Modal>
    )
  }
}
