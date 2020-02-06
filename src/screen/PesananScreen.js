import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import * as firebase from 'firebase';
class PesananScreen extends React.Component {
  state = { 
    currentUser: null,
    statuss:true, 
  }  

  cekPesanan(){
    const koli =  firebase.database().ref('Pesanan/Diterima')
    koli.on('value',(snapshot) => {
      let tus = (snapshot.val() !==null )
      this.setState({statuss:tus})
  });
  }

  getDataUser(){
    const getU = firebase.database().ref('UserBojek/Pesanan/'+firebase.auth().currentUser.uid)
    getU.on('value',(snapshot)=>{
      let getDU = snapshot.val()
      this.nama = getDU.nama,
      this.start = getDU.start,
      this.end = getDU.end
    })
  }

  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    this.cekPesanan()
    this.getDataUser()
    }
    render() {
      return (
        <View style = {styles.container}>
                <StatusBar backgroundColor="red" barStyle="dark-content" />
                <View style={styles.judul}>
                    <Text style={styles.page}>
                    Pesanan Saat Ini
                    </Text>
                </View>
            {this.state.statuss==true ? 
            <TouchableOpacity style={styles.buttonLogin} onPress={() => this.props.navigation.navigate('Pilihan')}>
            <Text style = {styles.text}>
            {this.nama}
            </Text>
            <Text style={styles.kecil}>
                {this.start} -> {this.end}
            </Text>
            </TouchableOpacity>
            : <View></View>}
            </View>
      );
    }
  }
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex:1,
  },
  kecil:{
    fontSize:12,
    color:'#707070',
    borderWidth:0,
    padding:15,
    textAlign:'left',
  },
  page:{
      fontWeight:'bold',
      fontSize:15,
  },
  judul:{
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
  buttonLogin:{
      marginVertical:"-5%",
      backgroundColor:'white',
      
      width:"98%",
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

export default PesananScreen;