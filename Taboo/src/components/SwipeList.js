import React from 'react';
import { ScrollView, TouchableOpacity, View, ListView } from 'react-native';
import { Text, Icon, SwipeRow, Button, ListItem, Left, Right, CheckBox } from 'native-base';
import utils from '../utils';

const ds = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
})

export default class SwipeList extends React.Component {
  static defaultProps = {
      onPress: () => {},
      onLeftPress: () => {},
      onRightPress: () => {},
      leftIcon: 'create',
      leftPrimary: true,
      leftSuccess: false,
      leftDanger: false,
      rightIcon: 'trash',
      rightPrimary: false,
      rightSuccess: false,
      rightDanger: true,
      btnWidth: 75,
      checkbox: false,
  }
  
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      swipeItems: {},
      selected: [],
    }
  }

  toggle(i) {
    let newSelected = this.state.selected;

    if (newSelected.indexOf(i) > -1) {
      newSelected.splice(newSelected.indexOf(i), 1);
    } else {
      newSelected.push(i);
    }
    
    this.setState({
      selected: newSelected,
    });
  }

  render() {
    let { props, defaultProps } = this;
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#F2F2F2'}}>
        <ListView
          dataSource={ds.cloneWithRows(this.state.items)}
          renderRow={(item, sectionId, rowId, highlight) =>
            <SwipeRow
              ref={(c) => {
                this.state.swipeItems[rowId] = c;
              }}
              body={
                  <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                      <TouchableOpacity
                        style={{flex: 1}}
                        onPress={() => {
                          this.state.swipeItems[rowId]._root.closeRow();
                          this.toggle(rowId);
                          props.onPress(item);
                        }}
                      >
                        <Text>{item[props.labelKey]}</Text>
                      </TouchableOpacity>
                    {
                      props.checkbox && 
                      <CheckBox 
                        style={{marginRight: 15}}
                        checked={this.state.selected.indexOf(rowId) > -1} 
                        onPress={() => {this.toggle(rowId)}}
                      />
                    }
                  </View>
               }
               left={
                 <Button full 
                   primary={props.leftPrimary}
                   success={props.leftSuccess}
                   danger={props.leftDanger}
                   onPress={() => {
                     this.state.swipeItems[rowId]._root.closeRow();
                     props.onLeftPress(item);
                   }}
                 >
                   <Icon active name={props.leftIcon} />
                 </Button>
               }
               right={
                 <Button full 
                   primary={props.rightPrimary}
                   success={props.rightSuccess}
                   danger={props.rightDanger}
                   onPress={() => {
                     this.state.swipeItems[rowId]._root.closeRow();
                     props.onRightPress(item);
                   }}
                 >
                   <Icon active name={props.rightIcon} />
                 </Button>
               }
               onRowOpen={() => {
                 for (row in this.state.swipeItems) {
                   if (row != rowId) {
                     if (this.state.swipeItems[row]) {
                       this.state.swipeItems[row]._root.closeRow();
                     } else {
                       delete this.state.swipeItems[row];
                     }
                   }
                 }
               }}
               leftOpenValue={props.btnWidth}
               rightOpenValue={-1 * props.btnWidth}
             />
          }
          enableEmptySections={true}
        />
      </ScrollView>
    )
  }
}
