import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import MapView, { AnimatedRegion, Polyline as Polylines } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import Polyline from '@mapbox/polyline';
const TAB_BAR_HEIGHT = -40;

export default class PesanOjekScreen extends React.Component{
    
    state = {
        region:{
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        },
        coords:[],
      x: 'false',   
        focus: true,
    }

    async getDirections(startLoc, destinationLoc) {

        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&key=AIzaSyAl_jzi_etjLgz0LV10ECyU5Hsntnfz6q0`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            this.setState({coords: coords})
            this.setState({x: "true"})
            return coords
        } catch(error) {
          console.log('masuk fungsi')
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
                let a = region.latitude+","+ region.longitude
                this.getDirections(a,"-7.884502,112.524882")
                console.log("hai"+a);
                
            },
            error => console.log(error),
            {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
            );
    }

    componentDidMount(){
        this.getCurrentLocation();
    }
    
    goToInitialLocation() {
        let initialRegion = Object.assign({}, this.state.initialRegion);
        initialRegion["latitudeDelta"] = 0.005;
        initialRegion["longitudeDelta"] = 0.005;
        this.mapView.animateToRegion(initialRegion, 2000);
    }
    render(){
        return <View style={{flex: 1}}>
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
          coordinate={{"latitude":-7.884502,"longitude":112.524882}}
          title={"Your Destination"}
        />
                    <Polylines
                    coordinates={this.state.coords}
                    strokeWidth={2}
                    strokeColor="blue"
                    />
            </MapView>
        </View>
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