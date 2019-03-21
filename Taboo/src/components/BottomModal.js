import React from 'react';
import { Animated, View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Text, Icon } from 'native-base';
import styles from '../styles/Core';

export default class BottomModal extends React.Component {
  static defaultProps = {
      duration: 200,
      height: 350,
      maxHeight: 350,
      buttons: null,
      closeBtn: true,
  }

  state = {
    height: new Animated.Value(0),
  };

  componentWillUpdate(nextProps, nextState) {
    if (!this.props.isVisible && nextProps.isVisible) {
      this.show(this.props);
    } else if (this.props.isVisible && !nextProps.isVisible) {
      this.hide(this.props);
    } else if (this.props.isVisible && nextProps.isVisible) {  // Update size
      if (this.props.height != nextProps.height) {
        this.show(this.props);
      }
    }
  }

  animateHeight(val, callback) {
    Animated.timing(
      this.state.height,
      {
        toValue: val,
        duration: this.props.duration,
      }
    ).start(callback);
  }

  hide() {
    this.animateHeight(0, this.props.onHide);
  }

  show() {
    this.animateHeight(this.resolveHeight(this.props.height), this.props.onShow);
  }

  resolveHeight(height) {
    let out = 0;
    if (typeof(height) == 'function') {
      out = height();
    } else {
      out = height;
    }
    if (out < this.props.maxHeight) {
      return out;
    } else {
      return this.props.maxHeight;
    }
  }

  render() {
    let {props, state} = this;
    return (
      <View>
        {
          <Animated.View style={[{paddingLeft: 25, height: state.height}, styles.bottomModal]}>
            <View style={{height: 50, flexDirection: 'row'}}>
              <View style={{flex: 7, justifyContent: 'center'}}>
                <Text style={[styles.light, {fontSize: 24, fontWeight: 'bold'}]}>{props.title}</Text>
              </View>
              {
                props.buttons && props.buttons.map((btn, i) => (
                  <View key={i} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={btn.onPress}>
                      <Icon style={styles.light} name={btn.icon}/>
                    </TouchableOpacity>
                  </View>
                ))
              }
              {
                props.closeBtn &&
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => {this.hide()}}>
                    <Icon style={styles.light} name='close'/>
                  </TouchableOpacity>
                </View>
              }
            </View>
            <ScrollView>
              {props.content}
            </ScrollView>
          </Animated.View>
        }
      </View>
    )
  }
}
