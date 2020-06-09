import { ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styles/global";
import { Button } from "react-native-paper";
import Map from '../Map';
import Datastore from '../../node_modules/react-native-local-mongodb'
import { Marker } from "react-native-maps";

const Locations = ({ navigation }) => {
    const [markers, setMarkers] = useState(null);

    const getLocations = async () => {
        let db = new Datastore({
            filename: "../DataStore/locations.db", autoload: true
        });

        let updatedMarkers;

        if (markers === null) {
            updatedMarkers = await db.find({}, function (err, docs) {
                setMarkers(docs);
            });
        }

        return updatedMarkers;
    }

    useEffect(() => {
        getLocations();
        console.log("Markers: " + JSON.stringify(markers));
    }, [markers]);

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
