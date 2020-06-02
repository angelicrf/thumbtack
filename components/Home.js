import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapView from 'react-native-maps';

const Home = ({ navigation }) => {
   
        return (
            <View style={styles.container1}>
                <View>
                    <Icon.Button name="home" size={20}>
                     <Text style={styles.displayText}>Home</Text></Icon.Button>                 
                </View>
                <View>
                <Button title="Menu" onPress={() => navigation.openDrawer()} />
                </View>
                <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: +47.61670,
                            longitude: -122.20000,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: +47.61670,
                                longitude: -122.20000
                                        }}
                            title={"Medina park"}
                            description={"category:Park"}
                        />
                    </MapView>
                </View>
            </View>    
        );  
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 800,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    container1: {
       flex: 1,      
    },
    homeName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    displayText: {
        marginLeft: 290,
        textAlign: 'right',
        fontSize: 20,
    }
});
export default Home;