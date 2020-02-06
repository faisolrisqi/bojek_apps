import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableHighlight, Alert, Modal } from 'react-native';

class cobaModal extends React.Component {
  state = {
    modalVisible: false,
  };
setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22, justifyContent:"center",alignItems:'center'}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View style={styles.modals}>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height:50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    
  },
  modals:{
    backgroundColor:'#ede59a',
    height:"70%",
    justifyContent:'center',
    alignItems:'center',
    marginRight:"5%",
    marginLeft:"5%"
  },
});

export default cobaModal;