import React from 'react';
import {StatusBar, Text, YellowBox, View, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import * as firebase from 'firebase';
import _ from 'lodash';
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

class AkunScreen extends React.Component{
  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    const {phoneNumber} = firebase.auth().currentUser;
    const itemsRef = firebase.database().ref('/UserBojek/' + firebase.auth().currentUser.uid);
    itemsRef.on('value', (snapshot) => {
      const userObj = snapshot.val();
      this.setState({userObj});
      if (userObj==null) {
        this.setState({phoneNumber});
        this.noHp=phoneNumber;
        console.log(phoneNumber);
        console.log('diatas');
      }else{
        console.log(userObj);
        console.log('gak bisa');
      this.nama = userObj.nama;
      this.noHp = userObj.noHp;
      }
    })
  }
    state = { currentUser: null }  
      render(){
        const {navigate} = this.props.navigation;
        return(
          <View style={styles.containerLog}>
          <StatusBar backgroundColor="red" barStyle="dark-content" />
          <View style={styles.judul}>
                    <Text style={styles.page}>
                    AKUN
                    </Text>
                </View>
      <View style={styles.dataDiri}>
        <Text style={styles.texer1}>{firebase.auth().currentUser.displayName}</Text>
        <Text style={styles.texer2}>{firebase.auth().currentUser.email}</Text>
      </View>
      <View>
      <TouchableOpacity style={styles.buttonLogin} onPress={()=> navigate('Riwayat')}>
      <Image style={{aspectRatio:1, resizeMode:'contain',marginVertical:"4%",marginLeft:"3%"}}
        source={require('../image/list.png')}/>
            <Text style = {styles.text}>
            Riwayat Pesanan
            </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonRegister} onPress={() => firebase.auth().signOut()}>
          <Image style={{aspectRatio:1, resizeMode:'contain',marginVertical:"8%",marginLeft:"7%"}}
        source={require('../image/logout.png')}/>
          <Text style = {styles.text}>
             Sign Out
          </Text>
       </TouchableOpacity>
      </View>
      
  </View>
    );
}
}

const styles = StyleSheet.create({
  containerLog:{
    flexDirection:"column",
    // alignItems: "center",
    marginVertical:"1%",
    flex:1,
    // backgroundColor:'#F2FBF3',
},
page:{
  fontWeight:'bold',
  fontSize:15,
},
judul:{
    marginBottom:-1,
    backgroundColor:'#ffe196',
    borderColor:'white',
    padding:20,
    marginVertical:"7%",
    width:"100%",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
},
dataDiri:{
  marginVertical:"3%",
},
text:{
  fontSize:20,
  color:'#707070',
  borderWidth:0,
  padding:15,
  textAlign:'center',
  fontWeight:'bold',
},
head:{

},
texer1:{
  fontSize:20,
  color:'#707070',
  borderWidth:0,
  padding:15,
  fontWeight:'bold',
marginLeft:"5%",
marginBottom:"1.5%",
backgroundColor:'white'
},
texer2:{
  fontSize:20,
  color:'#707070',
  borderWidth:0,
  padding:15,
marginLeft:"5%",
backgroundColor:'white'
},

buttonRegister:{
  backgroundColor:'#eef9bf',
  flexDirection:'row',
  marginVertical:"20%",
  width:"40%",
  shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
buttonLogin:{
  backgroundColor:'#e1f2fb',
  flexDirection:'row',
  width:"90%",
  shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
});

export default AkunScreen;