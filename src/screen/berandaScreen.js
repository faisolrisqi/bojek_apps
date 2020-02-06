import React,{Component} from 'react';
import {StyleSheet, View, Text, Image, Button, Switch, Dimensions, TouchableOpacity, SafeAreaView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as firebase from 'firebase';
class berandaScreen extends React.Component {
  state = { currentUser: null }  
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
}
    render() {
        // const { navigate } = this.props.navigation;
        // onPress={() => this.props.navigation.navigate('Login')}
      return (
        <SafeAreaView style={{backgroundColor: '#F2FBF3',flex:1}}>
        <View style = {styles.icon}>
        <Image style={{aspectRatio:0.8, resizeMode:'contain'}}
        source={require('../image/logo.png')}></Image>
        </View>
        <View style = {styles.container}>
          <Text style={{fontWeight:'bold'}}>Daftar Orderan</Text>
         <TouchableOpacity style={styles.buttonLogin} onPress={()=> this.props.navigation.navigate('Food')}>
            <Text style = {styles.text}>
               Makanan
            </Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.buttonLogin} onPress={()=> this.props.navigation.navigate('Daftar')}>
            <Text style = {styles.text}>
               Ojeks
            </Text>
         </TouchableOpacity>
      </View>
      </SafeAreaView>
      );
    }
  }
  const styles=StyleSheet.create({
    icon:{
        alignItems:'center',
        justifyContent:'center',
        marginVertical:50,
        flex:1,
      },
    container: {
    //   backgroundColor: '#fff',
      alignItems: 'center',
      flex:1,
    },
    buttonLogin:{
        marginVertical:10,
        backgroundColor:'#FFD369',
        borderRadius:50,
        width:190,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      text:{
        fontSize:20,
        color:'#707070',
        borderWidth:0,
        padding:15,
        textAlign:'center',
        fontWeight:'bold',
      },
  });

  export default berandaScreen;