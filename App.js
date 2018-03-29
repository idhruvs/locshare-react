import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import socketIOClient from "socket.io-client";
import rug from 'random-username-generator';
import Settings from './components/settings';
import { Header, ButtonGroup } from 'react-native-elements';
import Navigation from './components/navigation';


export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Header 
                    backgroundColor = '#f2f2f2'
                    centerComponent = {{ text: 'Location Share', style: { color: '#000' } }}
                />
                <Settings></Settings>
                <Navigation></Navigation>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  }
});

