import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

export default class Navigation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedIndex: 0
        }
        this.updateIndex = this.updateIndex.bind(this);
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex});
    }
    
    render() {
        const { selectedIndex } = this.state;
        const buttons = ['Home', 'Friends'];
        return (
            <ButtonGroup
                containerStyle={styles.buttonGroup}
                textStyle={styles.buttonText}
                buttonStyle={styles.buttons}
                selectedTextStyle={{color: '#fff'}}
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}  
            />
        )
    }
}

const styles = StyleSheet.create({
    buttonGroup: {
      height: 60
    },
    buttons: {
      backgroundColor: '#009889',
    },
    buttonText: {
        color: '#000'
    },
    selectedButton: {
        color:'#fff'
    }
  
  });
  