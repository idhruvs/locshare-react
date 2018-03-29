import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import socketIOClient from "socket.io-client";
import rug from 'random-username-generator';
import { Card, Badge, List, ListItem, ButtonGroup } from 'react-native-elements';
import  MapView  from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { mapStyle } from '../styles/mapstyle';

export default class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.username = rug.generate()
        this.state = {
            lat: 37.782,
            lng: -122.4234,
            error: null,
            region: {
                latitude: 37.782,
                longitude: -122.4234,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            },
            markers: [],
            endpoint: 'http://192.168.1.180:9000'
        };
        this.socket = null;
    }

    emitLocation(){
        this.getGeoLocation();
        // this.socket.emit('location', {location: [this.state.lat, this.state.lng]});
    }
    
    getGeoLocation() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition( (position) => {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                }
                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
                this.setState({region: {
                    latitude: this.state.lat,
                    longitude: this.state.lng,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                } 
                });  
                this.socket.emit('locationUpdate', { username: this.username,  location: {latitude:this.state.lat, longitude:this.state.lng} })
                //console.log('state;', this.state);
            }, (error) => {
                this.setState({error: error.message})
                console.log('error in fetching location')
                console.log(error.message);
            });
        }
    }


    componentDidMount() {
        this.getGeoLocation();
        this.socket = socketIOClient(this.state.endpoint);
        this.socket.emit('newUser', {username: this.username, location: {latitude:this.state.lat, longitude:this.state.lng} } );
        this.socket.on('userLocation', (change) => {
            console.log(change.loc);
            this.setState({markers: change.loc});
            console.log(this.state.markers)
        });
        setInterval(() => {
            this.emitLocation()
        }, 5000);
    }

    updateMap = () => {
        this.setState({region: {
            latitude: this.state.lat,
            longitude: this.state.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        } 
        });    
    }

    render() {
        const list = [
            {
                title: 'Latitude: ' + this.state.lat 
            },
            {
                title: 'Longitude: ' + this.state.lng 
            },
            
        ]
        const latlng = {
            latitude: this.state.lat,
            longitude: this.state.lng       
        };
        const buttons = ['Me', 'Friends', 'Settings']
        return (
            
          <View >
          <Card style={styles.card} title=" YOUR CURRENT LOCATION ">
            {
                list.map((u, i) => {
                return (
                    <View key={i}>
                        <Text style={styles.name}>{u.title}</Text>
                    </View>
                );
                })
            }
           </Card>
            <MapView style={styles.map}
                region = {this.state.region}
                onMapReady ={this.updateMap}
                customMapStyle={mapStyle}
            >
            {this.state.markers.map( (marker,i) => (
                <Marker
                    key = {i}
                    coordinate={marker.location}
                />
            ))}
            </MapView>
            </View>
        );
    }

  
}

const styles = StyleSheet.create({
    name: {
        padding: 5,
        fontSize: 12
    },
    card: {
        position: 'absolute',
        zIndex: 1000
    },
    map: {
        position: 'relative',
        top: 10,
        left: 0,
        right: 0,
        bottom: 0,
        height: 380
    },
    tabs: {
        position: 'relative',
        top : 20
    }
  });