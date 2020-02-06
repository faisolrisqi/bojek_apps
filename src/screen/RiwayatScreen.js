import React from 'react';
import {Text, View, Button, StyleSheet, Image, FlatList, StatusBar, TouchableOpacity, Modal, TouchableHighlight, Alert} from 'react-native';
import * as firebase from 'firebase';
class RiwayatScreen extends React.Component{
    state={
        history:[],
        modalVisible: false,
    }

    componentDidMount(){
        this.getItem()
    }

    setModalVisible(visible,id) {
        let idUser = id;
        const data = firebase.database().ref('UserBojek/'+firebase.auth().currentUser.uid+'/OrderHistory/'+idUser)
        data.on('value',(snapshot)=>{
            let get = snapshot.val()
            this.namaU = get.nama,
            this.biayaU = get.biaya,
            this.statusU = get.status,
            this.start = get.start,
            this.end = get.end
        })
        this.setState({modalVisible: visible});
      }

      setVisible(visible){
        this.setState({modalVisible: visible});
      }

    getItem(){
        const getI = firebase.database().ref('UserBojek/'+firebase.auth().currentUser.uid+'/OrderHistory/')
        getI.on('value',(snapshot)=>{
            let items =[];
            snapshot.forEach((child)=>{
                items.push({
                    id:child.key,
                    nama:child.val().nama,
                    biaya:child.val().biaya,
                    status:child.val().status,
                    start:child.val().start,
                    end:child.val().end
                })
            })
            this.setState({history: items });
        })
    }

    keyExtractor = (item) => item.id;

    renderItem = ({item}) =>
    <View>
      <TouchableOpacity style={styles.buttonLogin} onPress={()=> this.setModalVisible(true,item.id)}>
        <Image style={{aspectRatio:1, resizeMode:'contain',marginVertical:"3%",marginRight:"3%"}}
        source={require('../image/motor.png')}/>
          <View>
            <Text >
                {item.nama}
            </Text>
            <Text>
                Biaya  = {item.biaya} ~~ {item.status}
            </Text>
            <Text>
                {item.end}
            </Text>
          </View>
      </TouchableOpacity>
    </View>;

    render(){
        return(
            <View style = {styles.container}>
                <StatusBar backgroundColor="red" barStyle="dark-content" />
                <View style={styles.judul}>
                <Text style={styles.page}>
                History Pesanan
                </Text>
                </View>
                <FlatList
                data = {this.state.history}
                keyExtractor = {this.keyExtractor}
                renderItem = {this.renderItem}
                />
                <Modal
                animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setVisible(!this.state.modalVisible);
          }}>
          <View>
          <View style={styles.judul2}>
                <Text style={styles.page}>
                History Pesanan
                </Text>
                </View>
          <View style={styles.dataDiri}>
            <Text style={styles.texer2}>Nama : {this.namaU}</Text>
            <Text style={styles.texer2}>Biaya : {this.biayaU}</Text>
            <Text style={styles.texer2}>Tempat Awal : {this.start}</Text>
            <Text style={styles.texer2}>Tempat Akhir : {this.end}</Text>
            <Text style={styles.texer2}>Status : {this.statusU}</Text>
            </View>
            <View style={{alignItems:'center'}}>
              <TouchableHighlight style={styles.buttonKembali}
                onPress={() => {
                  this.setVisible(!this.state.modalVisible);
                }}>
                <Text style={{fontSize:20,padding:9}}>Kembali</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
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
      contain:{
        flexDirection:'row',
        justifyContent:'space-between',
      },
      texer2:{
        fontSize:13,
        color:'#707070',
        borderWidth:0,
        padding:15,
      marginLeft:"5%",
      backgroundColor:'white'
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
        judul2:{
            backgroundColor:'#ffe196',
            borderColor:'white',
            padding:20,
            
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
            flexDirection:'row',
            
            backgroundColor:'#e1f2fb',
            marginVertical:4,
            width:380,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          buttonKembali:{
            marginVertical:"50%",
            backgroundColor:'#e1f2fb',
            alignItems:'center',
            width:"50%",
            height:"10%",
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

export default RiwayatScreen;