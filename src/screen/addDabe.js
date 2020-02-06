import React from 'react';
import 'firebase/firestore';
import * as firebase from 'firebase';
import {YellowBox ,StyleSheet, ScrollView, ActivityIndicator, View, TextInput, Button} from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};
class addDabe extends React.Component {
    constructor() {
        super();
        this.state = {
          nama: '',
          email: '',
          noHp: '',
          isLoading: false,
        };
      }
      updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text;
        this.setState(state);
      }
      saveData() {
        this.setState({
          isLoading: true,
        });
        const ref = firebase.firestore().collection('UserBojek').doc(this.state.email);
        ref.set({
            nama: this.state.nama,
            email: this.state.email,
            noHp: this.state.noHp,
          }).then((docRef) => {
            this.setState({
              nama: '',
              email: '',
              noHp: '',
              isLoading: false,
            });
            this.props.navigation.goBack();
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            this.setState({
              isLoading: false,
            });
          });
        }
  render() {
    return (
        <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Nama'}
              value={this.state.nama}
              onChangeText={(text) => this.updateTextInput(text, 'nama')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'email'}
              value={this.state.email}
              onChangeText={(text) => this.updateTextInput(text, 'email')}
          />
        </View>
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'noHp'}
              value={this.state.noHp}
              onChangeText={(text) => this.updateTextInput(text, 'noHp')}
          />
        </View>
        <View style={styles.button}>
          <Button
            large
            leftIcon={{name: 'save'}}
            title='Save'
            onPress={() => this.saveData()} />
        </View>
      </ScrollView>
        );
      }
   }

   const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20
    },
    subContainer: {
      flex: 1,
      marginBottom: 20,
      padding: 5,
      borderBottomWidth: 2,
      borderBottomColor: '#CCCCCC',
    },
    activity: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
  
   export default addDabe;