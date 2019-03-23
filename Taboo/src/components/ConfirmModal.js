import React from 'react';
import { View } from 'react-native';
import Modal from "react-native-modal";
import { Grid, Col, Row, Text, Button, Icon } from 'native-base';
import ConfirmButtons from '../components/ConfirmButtons';
import style from '../styles/Core';

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
        animationIn='fadeIn'
        animationOut='fadeOut'
        animationInTiming={300}
        animationOutTiming={300}
        onBackButtonPress={this.props.onCancel}
        onBackdropPress={this.props.onCancel}
        style={[style.center]}
        backdropOpacity={0.75}
      >
        <View style={[
          style.lightBox, style.center,
          {
            width: this.props.width, height: this.props.height,
            paddingLeft: 50, paddingRight: 50, paddingTop: 50, paddingBottom: 15,
          },
        ]}>
          <View style={{flex: 9}}>
            <Text style={style.modalText}>{this.props.text}</Text>
          </View>
          <ConfirmButtons
            yesPress={this.props.onSuccess}
            noPress={this.props.onCancel}
            coloured={true}
            style={{width: this.props.width}}
          />
        </View>

        {/* <Grid style={styles.modalBackdrop}>
          <Col style={styles.columnBottom}>
            <Text style={styles.modalText}>
              {this.props.text}
            </Text>
            <View style={styles.row100}>
              <Button
                style={styles.h100f50}
                full success onPress={this.props.onSuccess}>
                <Icon name="checkmark" style={styles.bigIcon}></Icon>
              </Button>
              <Button
                style={styles.h100f50}
                full danger onPress={this.props.onCancel}>
                <Icon name="close" style={styles.bigIcon}></Icon>
              </Button>
            </View>
          </Col>
        </Grid> */}
      </Modal>
    )
  }
}
