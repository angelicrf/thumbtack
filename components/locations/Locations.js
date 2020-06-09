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
            <Text>Replace the contents of this page with cards or something more suitable for the list of locations.</Text>

            <Text>The button below is just a test:</Text>
            <Button raised primary style={styles.formControl} onPress={() => navigation.navigate('EditLocation')}>Go to
            EditLocation.js
            </Button>

            <Map markers={markers}>
                {/* {markers != null ? markers.map(marker => (
                    <Marker
                        coordinate={{
                            latitude: parseInt(marker.latitude),
                            longitude: parseInt(marker.longitude)
                        }}
                        title={marker._id}
                        description={"category:Park"}
                    />
                )) : ''}
                <Marker
                    coordinate={{
                        latitude: +47.61670,
                        longitude: -122.20000
                    }}
                    title={"Medina park"}
                    description={"category:Park"}
                /> */}
            </Map>
        </ScrollView>
    );
};

export default Locations;
