import React,{Component} from 'react';
import {
    Text, 
    StyleSheet, 
    View, 
    Button, 
    SafeAreaView,
    ScrollView,
    Image,
    StatusBar,
    Alert,
    color,
    YellowBox,
    TouchableOpacity,} from 'react-native';
import jekStyle from '../style/jekStyle';
import * as firebase from 'firebase';
import _ from 'lodash';
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

class firstScreen extends React.Component {
   componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        this.props.navigation.navigate(user ? 'buttonBar' : 'First')
      })
    }
    render() {
      const {navigate} = this.props.navigation;
      return (
        // <Button
        //   title="Go to Login"
        //   onPress={() => navigate('Login')}
        // />
        <SafeAreaView style={{backgroundColor: '#F2FBF3',flex:1}}>
        <View style = {styles.icon}>
        <Image style={{aspectRatio:0.9, resizeMode:'contain'}}
        source={require('../image/logo.png')}></Image>
        </View>
        <View style = {styles.container}>
         <TouchableOpacity style={styles.buttonLogin} onPress={() => navigate('Login')}>
            <Text style = {styles.text}>
               Login
            </Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.buttonRegister} onPress={() => navigate ('Register')} >
            <Text style = {styles.text}>
               Register
            </Text>
         </TouchableOpacity>
      </View>
      </SafeAreaView>
      );
    }
  }
const styles = StyleSheet.create({
    ...jekStyle
});

export default firstScreen;