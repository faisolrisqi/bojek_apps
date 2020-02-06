import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions, YellowBox, Alert } from 'react-native'
import MapView, { AnimatedRegion, Polyline as Polylines } from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import * as firebase from 'firebase';
import _ from 'lodash';
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};
const TAB_BAR_HEIGHT = -40;

export default class MapScreen extends React.Component{
    
    state = {
        region:{
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        },
        time:Date.now(),
        bilung:0,
        loca:0,
        ceker:0,
        namaPe:"",
        letus:0,
        letus2:0,
        letusa:0,
        letusa2:0,
        status:"",
        namaJl:'',
        coords:[],
        x: 'false',   
        focus: true,
    }

    componentDidMount(){
        this.getIdUser();
        this.cekCancel();
        // this.interval = setInterval(() => this.getCurrentLocation(), 1000);
        this.getCurrentLocation();
        this.getFirst();
        this.cekLoop();
    }

    // componentWillUnmount() {
    //     clearInterval(this.interval);
    // }

    cekCancel(){
        const cek = firebase.database().ref('Pesanan/Diterima')
        cek.on('value',(snapshot)=>{
            let ceks =(snapshot.val() !== null)
            this.cekss = ceks
            if (this.cekss==true) {
                this.getStatus()
            }else{
                this.props.navigation.navigate('buttonBar');
                Alert.alert(
                    'Yeey',
                    'Telah Selesai',
                    [
                      {text: 'OK',onPress : ()=>this.addHistory() , style: 'cancel'},
                    ]
                  );
            }
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
            status:"Selesai"
        })
    }

    cekOrderan(){
        const sta = firebase.database().ref('Pesanan/Diterima');
        sta.on('value',(snapshot) => {
            let tus = (snapshot.val() !== null )
            this.setState({status:tus})
            if (this.state.status==true) {
                // this.readUserData();
            }else{
            }
        });
    }

    async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&key=AIzaSyAl_jzi_etjLgz0LV10ECyU5Hsntnfz6q0`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => 
            {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            let namaJL = respJson.routes[0].legs[0].start_address;
            let jl = namaJL.split(',')
            this.setState({coords: coords,namaJl:jl[0]+","+jl[1]})
            this.setState({x: "true"})
            return coords
            } catch(error) {
            this.setState({x: "error"})
            return error
            }
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
                this.up = region.latitude+","+region.longitude;
                this.setState({loca:this.up})
                let b = this.state.letus+","+this.state.letus2
                let a = this.state.letusa+","+this.state.letusa2
                this.getDirections(a,b)
                
            },
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
            );
    }

    getIdUser(){
        const bra = firebase.database().ref('UserBojek/Pesanan/'+firebase.auth().currentUser.uid)
        bra.on('value',(snapshot)=>{
            let did = snapshot.val()
            this.idUsers= did.idUser
        })
    }

    cekLoop(){
        firebase.database().ref('UserBojek/Pesanan/'+firebase.auth().currentUser.uid).on('value',(snapshot)=>{
            let dal = snapshot.val()
            this.loopers = dal.loop
        })
        console.log('ini loop'+this.loopers)
        this.dadang()
    }

    dadang(){
        if (this.loopers==true) {
            this.interval = setInterval(() => this.upToDate(), 5000);
        }else{
            console.log("Nothing")
        }
    }

    upToDate(){
            firebase.database().ref('Pesanan/Diterima/'+this.idUsers).update({
            lokasi:this.up,
            },console.log("timer is running = "+this.up)
            )
        }

    getStatus(){
        const statusBo = firebase.database().ref('UserBojek/')
        statusBo.on('value',(snapshot)=>{
            let sta = snapshot.val()
            // let bingo = sta.status
            this.a = sta.status
            this.setState({ceker:this.a},function() {
                if (this.state.ceker==1) {
                }else if(this.state.ceker==2){
                    this.lokasiUser()
                }else{
                    console.log('code1')
                }
            })
        })
    }

    lokasiUser(){
        const userLoc = firebase.database().ref('UserBojek/Pesanan/'+firebase.auth().currentUser.uid)
        userLoc.on('value', (snapshot)=>{
            const getLoc = snapshot.val();
            this.setState(getLoc);
            //coba tambahin if
            if (getLoc.startLoc==null) {
            }else{
                this.LatLot = getLoc.startLoc;
                this.LatLot2 = getLoc.desLoc;
                this.namaP = getLoc.nama;
                this.setLokasi(this.LatLot,this.LatLot2,this.namaP);
            }
        });
    }

    setLokasi(LatLot,LatLot2,namaP){
        let nama = namaP;
        let letu1 = LatLot;
        let letu2 = LatLot2;
        let lets1 = letu1.split(",")
        let lets2 = letu2.split(",")
        
        this.setState({namaPe:nama})
        this.setState({letusa:lets1[0]})
        this.setState({letusa2:lets1[1]})        
        this.setState({letus:lets2[0]})
        this.setState({letus2:lets2[1]})
    }

    goToInitialLocation() {
        let initialRegion = Object.assign({}, this.state.initialRegion);
        initialRegion["latitudeDelta"] = 0.005;
        initialRegion["longitudeDelta"] = 0.005;
        this.mapView.animateToRegion(initialRegion, 2000);
    }
    render(){
        return (
        <View style={{flex: 1}}>
            {this.state.ceker == 1 ? <View><Text></Text></View> : 
            <MapView
                style={styles.map}
                region={this.state.mapRegion}
                followUserLocation={true}
                ref={ref => (this.mapView = ref)}
                zoomEnabled={true}
                showsUserLocation={true}
                onMapReady={this.goToInitialRegion}
                initialRegion={this.state.initialRegion}>
            <MapView.Marker
                coordinate={{latitude:parseFloat(this.state.letus),longitude:parseFloat(this.state.letus2)}}
                title={this.state.namaJl}
            />

            <MapView.Marker
                coordinate={{latitude:parseFloat(this.state.letusa),longitude:parseFloat(this.state.letusa2)}}
                title={this.state.namaPe}
                pinColor={'blue'}
            />
                    <Polylines
                    coordinates={this.state.coords}
                    strokeWidth={2}
                    strokeColor="blue"
                    />
            </MapView>}
        </View>
        )
    }
}

const styles = StyleSheet.create({
    map:{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
        // ...StyleSheet.absoluteFillObject,
    }
});