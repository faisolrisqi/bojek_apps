import React,{Component} from 'react';
// import isEqual from 'lodash.isequal';
// import {GoogleSignIn} from 'expo-google-App';
import * as Google from 'expo-google-app-auth';

import {
    Image,
    Text,
    View,
    Button,
    TouchableOpacity,
    StyleSheet,
    Alert,
    TextInput,
    YellowBox,
} from 'react-native';
import * as firebase from 'firebase';
import _ from 'lodash';
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};
class registerScreen extends React.Component{
  state={
    user:null,
    nama:'',
    email:'',
    noHp:'',
    password:'',
    errorMessage:null
}

componentDidMount(){
this.checkIfLoggedIn();
}

checkIfLoggedIn = () =>{
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log('succes');
      this.props.navigation.navigate('buttonBar');
    }else{
      this.props.navigation.navigate('Register');
      console.log('gagal')
    }
  }.bind(this)
  )
}
onSignIn = googleUser => {
  console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!this.isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
          );
      // Sign in with credential from the Google user.
      firebase
      .auth()
      .signInWithCredential(credential)
      .then(function () {
        console.log("masuk gan")
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    } else {
      console.log('User already signed-in Firebase.');
    }
  }.bind(this)
  );
}

isUserEqual=(googleUser, firebaseUser) => {
  //bagian ini untuk mengambil datanya
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}

signInWithGoogleAsync = async () => {
  try {
    const result = await Google.logInAsync({

      androidClientId:'1060042604495-gj43n1bqks2r6si16o8cg86kd8enhb4a.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });

    if (result.type === 'success') {
      this.onSignIn(result);
      return result.accessToken;
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}
    updateTextInput = (text, field) => {
        const state = this.state
        state[field] = text
        this.setState(state)
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
            })
            ;
            this.props.navigation.goBack();
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            this.setState({
              isLoading: false,
            });
          });
        }
      handleSignUp = () => {
        if (this.state.email == "" || this.state.password== "" || this.state.nama == "" || this.state.noHp ==""){
          Alert.alert(
            'Data Harus Diisi Semua'
          )
        }else{
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .catch(error => this.setState({ errorMessage: error.message }))
          .then(userCredential => {
            //set data into User database
            firebase.database().ref('UserBojek' + "/" + userCredential.user.uid).set({
                nama:this.state.nama,
                email: this.state.email,
                noHp: this.state.noHp
            });
          
          });
        }
      }
    render(){
    return (
    <View style={styles.containerLog}>
    <Text>{this.state.errorMessage}</Text>
    <View>
        <TextInput 
        placeholder="Nama"
        placeholderTextColor="#707070"
        underlineColorAndroid='transparent'
        onChangeText={(text) => this.updateTextInput(text,'nama')}
        onSubmitEditing={()=> this.password.focus()}
        style={styles.inputs}/>
        <TextInput
        placeholder="Email"
        placeholderTextColor="#707070"
        keyboardType="email-address"
        underlineColorAndroid='transparent'
        onChangeText={(text) => this.updateTextInput(text,'email')}
        ref={(input) => this.password=input}
        style={styles.inputs}/>
        <TextInput
        placeholder="No. HP"
        placeholderTextColor="#707070"
        keyboardType="number-pad"
        underlineColorAndroid='transparent'
        onChangeText={(text) => this.updateTextInput(text,'noHp')}
        style={styles.inputs}/>
        <TextInput secureTextEntry={true}
        placeholder="Password"
        placeholderTextColor="#707070"
        underlineColorAndroid='transparent'
        onChangeText={(text) => this.updateTextInput(text,'password')}
        style={styles.inputs}/>
    </View>
    <View>
    <TouchableOpacity style={styles.buttonRegister} onPress={this.handleSignUp}>
        <Text style = {styles.text}>
           Buat
        </Text>
     </TouchableOpacity>
    </View>
    <View style={{marginBottom:"2%"}}>
        <Text>Sudah Punya Akun</Text>
        <Button
        title="Sign In"
        onPress={() => this.props.navigation.navigate('Login')} 
        />
        
    </View>
    <TouchableOpacity onPress={() => this.signInWithGoogleAsync()} style={styles.GooglePlusStyle} activeOpacity={0.5}>
          <Image
            //We are showing the Image from online
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/google-plus.png',
            }}
            //You can also show the image from you project directory like below
            //source={require('./Images/google-plus.png')}

            //Image Style
            style={styles.ImageIconStyle}
          />
          <View style={styles.SeparatorLine} />
          <Text style={styles.TextStyle}> Login Using Google </Text>
        </TouchableOpacity>
</View>
)
    }
};

const styles = StyleSheet.create({
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  TextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginRight: 20,
  },
  SeparatorLine: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
  GooglePlusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 180,
    borderRadius: 5,
    margin: 5,
  },

    inputs:{
        height: 70,
        width:380,
        padding:10,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius:50,
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
        shadowColor:'#000',
        marginVertical:10,
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        elevation:5,
        },
        
        containerLog:{
            flexDirection:"column",
            alignItems: "center",
            marginVertical:100,
            flex:1,
            // backgroundColor:'#F2FBF3',
        },
        buttonRegister:{
            marginVertical:50,
            backgroundColor:'#FFF8CD',
            borderRadius:50,
            width:120,
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
            padding:15,
            textAlign:'center',
            fontWeight:'bold',
          },
});

export default registerScreen;