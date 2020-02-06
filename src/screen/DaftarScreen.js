import React from 'react';
import {Text, StatusBar, View, Button, StyleSheet, TouchableOpacity, FlatList, YellowBox} from 'react-native';
import * as firebase from 'firebase';
import NetInfo from "@react-native-community/netinfo";
import { add } from 'react-native-reanimated';
import _ from 'lodash';
import TimerMixin from 'react-timer-mixin';
mixins: [TimerMixin];
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};

class DaftarScreen extends React.Component{
    state={
        loca:0,
        statuss:false,
        idmana:"",
        alamat:"",
        biayas:0,
        desLoc:0,
        nama:"",
        startLoc:0,
        status:"",
        tujuan:""
    }
    readUserData(){
        if (this.state.statuss==true) {
            const sim = firebase.database().ref('Pesanan/').child('Belum Diterima/');
            sim.once('value', (snapshot) => {
            const userObj = snapshot.val();
            this.setState({userObj});
            this.nama=userObj[Object.keys(userObj)[0]].nama
            this.start=userObj[Object.keys(userObj)[0]].alamatUser
            this.end=userObj[Object.keys(userObj)[0]].tujuan
            this.biaya=userObj[Object.keys(userObj)[0]].biaya
            this.desLoc=userObj[Object.keys(userObj)[0]].desLoc
            this.startLoc=userObj[Object.keys(userObj)[0]].startLoc
            this.status=userObj[Object.keys(userObj)[0]].status
            this.tujuan=userObj[Object.keys(userObj)[0]].tujuan
            this.idUser=Object.keys(userObj)[0]
            this.setState({idmana:this.idUser,alamat:this.start,biayas:this.biaya,desLoc:this.desLoc,nama:this.nama,startLoc:this.startLoc,status:this.status,tujuan:this.tujuan})
            console.log(Object.keys(userObj)[0])
        });
        console.log("nama"+this.nama)
        }else{
            console.log("data kosongsaa")
        }
        
    }

    addDataBojek(){
            //('UserBojek/'+firebase.auth().currentUser.uid+'OrderHistory')
        const fire = firebase.database().ref('UserBojek/Pesanan/'+firebase.auth().currentUser.uid);
        fire.set({
            idUser:this.state.idmana,
            nama:this.state.nama,
            start:this.state.alamat,
            end:this.state.tujuan,
            biaya:this.state.biayas,
            desLoc:this.state.desLoc,
            startLoc:this.state.startLoc,
            status:"Diterima",
            loop:true
        })
    }

    addHistory(){
        //('UserBojek/'+firebase.auth().currentUser.uid+'OrderHistory')
    const fire = firebase.database().ref('UserBojek/'+firebase.auth().currentUser.uid+'/OrderHistory/');
    fire.push({
        idUser:this.state.idmana,
        nama:this.state.nama,
        start:this.state.alamat,
        end:this.state.tujuan,
        biaya:this.state.biayas,
        desLoc:this.state.desLoc,
        startLoc:this.state.startLoc,
        status:"Diterima",
    })
}

    async getCurrentLocation(){
        navigator.geolocation.getCurrentPosition(
            position => {
                let region = {
                    latitude: parseFloat(position.coords.latitude),
                    longitude: parseFloat(position.coords.longitude),
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421
                };
                this.setState({
                    initialRegion: region
                });
                this.a = region.latitude+","+region.longitude;
                this.setState({loca:this.a})
                console.log("haila="+this.a+"hai"+this.state.loca);
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
            );
    }

    addDataUser(){
        this.setStatus();
        this.addDiterima();
    }

    setStatus(){
        const sta = firebase.database().ref('UserBojek/')
        sta.update({
            status:2
        })
    }

    addDiterima(){
        this.addDataBojek();
        const bre = firebase.database().ref('Pesanan/Diterima/'+this.state.idmana)
        bre.set({
            alamatUser:this.state.alamat,
            biaya:this.state.biayas,
            desLoc:this.state.desLoc,
            nama:this.state.nama,
            startLoc:this.state.startLoc,
            status:"Diterima",
            tujuan:this.state.tujuan,
            userId:this.state.idmana
        })
        this.addDataUser2();
    }

    addDataUser2(){
            const addBo = firebase.database().ref('Pesanan/Diterima/'+this.state.idmana)
            addBo.update({
                namaDriver:firebase.auth().currentUser.displayName,
                lokasi:this.state.loca,
                idDriver:firebase.auth().currentUser.uid,
                updt:true,
            }).then(() => this.props.navigation.navigate('Pilihan'))
            this.addHistory()
            this.addToUser()
            this.deleteData()
    }

    addToUser(){
        const rock =  firebase.database().ref('users/'+this.state.idmana+'/Pesanan/')
        rock.update({
            namaDriver:firebase.auth().currentUser.displayName,
            lokasi:this.state.loca,
            idDriver:firebase.auth().currentUser.uid,
            status:"Diterima"
        })
    }

    componentDidMount(){
        this.getCurrentLocation();
        this.cekOrderan();
    }
//perbaiki semangat
    cekOrderan(){
        const sta = firebase.database().ref('Pesanan/Belum Diterima');
        sta.once('value',(snapshot) => {
            let tus = (snapshot.val() !== null )
            this.setState({statuss:tus})
            console.log("ini apa = "+this.state.statuss)
            if (this.state.statuss==true) {
                this.readUserData();
            }else{
                console.log("gakpunya")
            }
        });
        console.log("inaksds ="+this.state.statuss)
    }

    deleteData(){
        firebase.database().ref('Pesanan/Belum Diterima').remove();
    }

    render(){
        return(
            <View style = {styles.container}>
                <StatusBar backgroundColor="red" barStyle="dark-content" />
                <View style={styles.judul}>
                    <Text style={styles.page}>
                    Daftar Orderan
                    </Text>
                </View>
            {this.state.statuss == true ? <TouchableOpacity style={styles.buttonLogin} onPress={()=> this.addDataUser()}>
            <Text style = {styles.text}>
               {this.nama}
            </Text>
            <Text style={styles.kecil}>
                {this.start} ke -> { this.end}
            </Text>
                </TouchableOpacity> : <View></View>}
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
          backgroundColor:'#f1f9f9',
          
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

export default DaftarScreen;