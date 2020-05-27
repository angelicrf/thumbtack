import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Navigate = ({navigation}) => {
    
        return (
            <View style={styles.container}>
                <View>
                    <Icon.Button name="map-marker" size={20} >
                        <Text style={styles.displayText}>Navigation</Text></Icon.Button>                      
                </View>
                <View>
                    <Button title="Menu" onPress={() => navigation.openDrawer()} />
                </View>
            </View>

        );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navDisplay: {       
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    displayText: {
        marginLeft: 260,
        textAlign: 'right',
        fontSize: 20,

    }
});
export default Navigate;