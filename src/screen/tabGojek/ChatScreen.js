import React from 'react';
import {Text, View, Button, StyleSheet, StatusBar, KeyboardAvoidingView, YellowBox} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import * as firebase from 'firebase';
import _ from 'lodash';
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};
class ChatScreen extends React.Component{
    state = {
        messages:[]
      }

      send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user,
            };
            this.db.push(message);
        });
    };

    get = callback => {
        this.db.on('child_added',snapshot => callback(this.parse(snapshot)));
    }

    parse = message => {
        const { user, text, timestamp } = message.val();
        const { key: _id} = message;
        const createdAt = new Date(timestamp);
        
        return{
            _id,
            createdAt,
            text,
            user
        };
    };

    get user(){
        return{
          _id:this.uid,
          name:firebase.auth().currentUser.displayName,
        }
      }

    getIdUser(){
        const getId = firebase.database().ref('UserBojek/Pesanan/'+firebase.auth().currentUser.uid)
        getId.on('value',(snapshot)=>{
            let Id = snapshot.val()
            this.Id = Id.idUser,
            this.Nama = Id.nama
        })
    }

    get db() {
        return firebase.database().ref('Pesanan/Diterima/'+this.Id+'/chat/');
    }

    get uid(){
        return (firebase.auth().currentUser || {} ).uid;
    }

    componentDidMount(){
        this.getIdUser()
        this.get(message => 
            this.setState(previous => ({
              messages: GiftedChat.append(previous.messages, message)
            }) )
            );
    }

    render(){
        const chat =<GiftedChat messages={this.state.messages} onSend={this.send} user={this.user}/>
        return(
            <View style = {styles.container}>
                <StatusBar backgroundColor="red" barStyle="dark-content" />
                <View style={styles.judul}>
                    <Text style={styles.page}>
                    {this.Nama}
                    </Text>
                </View>
                <KeyboardAvoidingView style={{flex:1}} behavior='height' keyboardVerticalOffset={30} enabled >
                {chat}
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        // alignItems: 'center',
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
});

export default ChatScreen;