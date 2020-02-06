import React from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity, StatusBar, Alert, Image} from 'react-native';
import * as firebase from 'firebase';
class GojekScreen extends React.Component{
    state={
        reiw:"",
        stab:true,
    }

    componentDidMount(){
        this.getFirst();
        this.getId();
        this.cekAda();
    }

    button2(){
        Alert.alert(
            'Udah Sampai',
            'Apakan Anda Yakin Sudah Sampai Di Lokasi Penumpang',
            [
              {text: 'NO', style: 'cancel'},
              {text: 'YES', onPress:() => this.updateStatus()},
            ]
          );
    }

    cekAda(){
        const getStatuss = firebase.database().ref('Pesanan/Diterima/'+this.idUser)
        getStatuss.on('value',(snapshot)=>{
            let getsa = (snapshot.val() !== null)
            this.getSta = getsa
            this.setState({stab:getsa})
            console.log("ini ada itu = " + this.state.stab)
            if (this.getSta == true) {
                // this.interval = setInterval(() => this.getStatus(), 1000);
                this.getStatus();
            }else{
                this.props.navigation.navigate('buttonBar')
            }
        })
    }

    getStatus(){
        firebase.database().ref('UserBojek/'+firebase.auth().currentUser.uid+'/OrderHistory/'+this.id).on('value',(snapshot)=>{
            let get = snapshot.val();
                this.status = get.status;
                this.status2 = "Sampai";
                console.log("ini statusnya = "+this.status)
        })
    }

    updateStatus(){
        const upStatus = firebase.database().ref('Pesanan/Diterima/'+this.idUser)
        upStatus.update({
            status:"Sampai"
        })
        this.updateHistory()
        this.updatePesanan()
    }

    updateHistory(){
        const history = firebase.database().ref('UserBojek/'+firebase.auth().currentUser.uid+'/OrderHistory/'+this.id)
        history.update({
            status:"Sampai"
        })
    }

    updatePesanan(){
        const updateData = firebase.database().ref('UserBojek/Pesanan/'+firebase.auth().currentUser.uid);
        updateData.update({
            status:"Sampai"
        })
    }

    updateStatus2(){
        const upStatus = firebase.database().ref('Pesanan/Diterima/'+this.idUser)
        upStatus.update({
            status:"Selesai"
        })
    }

    updateStatus3(){
        const upStatus = firebase.database().ref('Pesanan/Diterima/'+this.idUser)
        upStatus.update({
            status:"Sampai"
        })
    }

    getId(){
        const gets = firebase.database().ref('UserBojek/'+firebase.auth().currentUser.uid+'/OrderHistory/'+this.id)
        gets.on('value', (snapshot)=>{
            let gets = snapshot.val()
            this.idUser = gets.idUser
        })
    }

    button(){
        Alert.alert(
            'Udah Selesai',
            'Apakan Anda Yakin Sudah Sampai Tujuan',
            [
              {text: 'NO', onPress:() => this.changeStatus(), style: 'cancel'},
              {text: 'YES', onPress:() => this.deletePesanan()},
            ]
          );
          this.setStatus();
          this.updateStatus2();
    }


    deletePesanan(){
        const updateData = firebase.database().ref('UserBojek/Pesanan/'+firebase.auth().currentUser.uid);
        updateData.update({
            biaya:0,
            desLoc:"0,0",
            end:"null",
            idUser:"null",
            nama:"nama",
            start:"Nama Jalan",
            startLoc:"0,0",
            status:"null"
        })
        this.addHistory();
    }

    changeStatus(){
        const sta = firebase.database().ref('UserBojek/')
        sta.update({
            status:2
        })
        this.updateStatus3();
    }

    setStatus(){
        const sta = firebase.database().ref('UserBojek/')
        sta.update({
            status:1
        })
    }

    getFirst(){
        const gets = firebase.database().ref('UserBojek/'+firebase.auth().currentUser.uid).child('/OrderHistory/')
        gets.on('value', (snapshot)=>{
            let get = snapshot.val()
            this.id = Object.keys(get)[0]
        })
    }

    addHistory(){
        const history = firebase.database().ref('UserBojek/'+firebase.auth().currentUser.uid+'/OrderHistory/'+this.id)
        history.update({
            status:"selesai"
        }).then(()=>this.props.navigation.navigate('buttonBar'))
    }

    render(){
        return(
            <View style = {styles.container}>
                <StatusBar backgroundColor="red" barStyle="dark-content" />
                <View style={styles.judul}>
                    <Text style={styles.page}>
                    Pesanan Sedang Berlangsung
                    </Text>
                </View>
                {this.state.stab == true && this.status == this.status2 ? 
                <View>
                <View style = {styles.icon}>
                    <Image style={{aspectRatio:0.3, resizeMode:'contain'}}
                    source={require('../../image/scooter.png')}></Image>
                    <Text style={{alignItems:'center',fontWeight:'bold'}}>Apakah Anda Sudah Sampai Pada Tujuan Penumpang?</Text>
                </View>
                <TouchableOpacity style={styles.buttonLogin} onPress={()=> this.button()}>
                    <Text style = {styles.text}>
                    Sudah Sampai
                    </Text>
                </TouchableOpacity>
                </View> :    
                <View>
                <View style = {styles.icon}>
                    <Image style={{aspectRatio:0.3, resizeMode:'contain'}}
                    source={require('../../image/scooter.png')}></Image>
                    <Text style={{alignItems:'center',fontWeight:'bold'}}>Apakah Anda Sudah Sampai Di Lokasi Penumpang?</Text>
                </View>
                <TouchableOpacity style={styles.buttonLogin} onPress={()=> this.button2()}>
                    <Text style = {styles.text}>
                    Sudah Sampai
                    </Text>
                </TouchableOpacity>
                </View>
            }
                
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
    icon:{
        alignItems:'center',
        justifyContent:'center',
        marginVertical:10,
        flex:1,
    },
    buttonLogin:{
        marginVertical:"50%",
        marginLeft:"25%",
        backgroundColor:'#eef9bf',
        width:"50%",
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

export default GojekScreen;