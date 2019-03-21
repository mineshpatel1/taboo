import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getWord } from '../actions/WordActions';
import styles from '../styles/Core';
import ButtonView from '../components/ButtonView';

class Words extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.keyword}>{ this.props.words.keyword.toUpperCase() }</Text>
        {
          this.props.words.tabooWords.map((word, index) => (
            <Text key={word}>{ word.toUpperCase() }</Text>
          ))
        }
        <ButtonView
          title="Get New Word"
          color='steelblue'
          onPress={() =>
            this.props.getWord()
          }
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { words } = state
  return { words }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getWord,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Words);
