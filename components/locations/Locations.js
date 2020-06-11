import { ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styles/global";
import { Button } from "react-native-paper";
import Map from '../Map';
import Datastore from '../../node_modules/react-native-local-mongodb'
import UseForceUpdate from './UseForceUpdate';

const Locations = ({ navigation }) => {
    const [markers, setMarkers] = useState(null);
    const [newMarker, setNewMarker] = useState();
    const forceUpdate = UseForceUpdate();

    const getLocations = async () => {
        let db = new Datastore({
            filename: "../DataStore/locations.db", autoload: true
        });

        let updatedMarkers;

        // This prevents an infinite loop where, for some reason, the db keeps getting called and the map is unable to be moved.
        // need to find a way to refresh the map when a new location is added.
        if (markers === null) {
            updatedMarkers = await db.find({}, function (err, docs) {
                setMarkers(docs);
                console.log("set markers");
            });
        }

        return updatedMarkers;
    }

    useEffect(() => {
       
        getLocations();
        const id = setInterval(forceUpdate, 16)
        return () => clearInterval(id)
        //console.log("Markers: " + JSON.stringify(markers));
    }, [markers]);

    //TODO: Add cards with saved locations information below map. Onclick card should highlight cooresponding marker.
    // Edit Location can be called from card.

    return (
        <ScrollView style={styles.container}>
            <Text>The button below is just a test:</Text>
            <Button raised primary style={styles.formControl} onPress={() => navigation.navigate('EditLocation')}>Go to
            EditLocation.js
            </Button>
            <Map markers={markers}>
            </Map>
        </ScrollView>
    );
};

export default Locations;
