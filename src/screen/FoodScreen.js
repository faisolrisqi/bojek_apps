import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native'

export default class FoodScreen extends React.Component{
    render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.icon}>
                <Image style={{aspectRatio:0.8, resizeMode:'contain'}}
                source={require('../image/logo.png')}></Image>
                </View>
                <Text style={{fontWeight:'bold'}}>
                    Upcoming Feature
                </Text>

                <TouchableOpacity style={styles.buttonLogin} onPress={()=> this.props.navigation.navigate('buttonBar')}>
                <Text style = {styles.text}>
                    Kembali
                </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        flex:1,
      },
      icon:{
        alignItems:'center',
        justifyContent:'center',
        marginVertical:50,
        
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
})