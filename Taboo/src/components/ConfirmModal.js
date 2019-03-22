import React from 'react';
import { View, Modal } from 'react-native';
import { Grid, Col, Row, Text, Button, Icon } from 'native-base';
import styles from '../styles/Core';

export default class ConfirmModal extends React.Component {
  static defaultProps = {
      animationType: 'fade',
  }

  render() {
    return (
      <Modal
        animationType={this.props.animationType}
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onRequestClose}
      >
        <Grid style={styles.modalBackdrop}>
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
        </Grid>
      </Modal>
    )
  }
}

// export TestModal;
