import React from 'react';
import { View } from 'react-native';
import { Grid, Col, Row, Text, Button, Icon } from 'native-base';
import Modal from '../components/Modal';
import ConfirmButtons from '../components/ConfirmButtons';
import style from '../styles/Core';
import animationDuration from '../constants';

export default class ConfirmModal extends React.Component {
  static defaultProps = {
      animationType: 'fade',
      width: 350,
      height: 350,
  }

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onCancel={this.props.onCancel}
        animationIn={this.props.animationIn}
        animationOut={this.props.animationOut}
        width={350} height={350}
      >
        <View style={[style.center, {padding: 10, flex: 9}]}>
          <Text style={style.modalText}>{this.props.text}</Text>
        </View>
        <ConfirmButtons
          yesPress={this.props.onSuccess}
          noPress={this.props.onCancel}
          coloured={true}
          style={{width: this.props.width - 70}}
        />
      </Modal>
    )
  }
}
