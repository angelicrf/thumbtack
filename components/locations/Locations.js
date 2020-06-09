import { ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styles/global";
import { Button } from "react-native-paper";
import Map from '../Map';
import Datastore from '../../node_modules/react-native-local-mongodb'
import { Marker } from "react-native-maps";

const Locations = ({ navigation }) => {
    const [markers, setMarkers] = useState(null);

    const getLocations = () => {
        var db = new Datastore({
            filename: "../DataStore/locations.db", autoload: true
        });

        if (markers === null) {
            db.find({}, function (err, docs) {
                setMarkers(docs);
                //console.log(docs);
                console.log("Markers: " + markers);
            });
        }
    }

    useEffect(() => {
       getLocations();
    }, [markers]);

    return (
        <ScrollView style={styles.container}>
            <Text>Replace the contents of this page with cards or something more suitable for the list of locations.</Text>

            <Text>The button below is just a test:</Text>
            <Button raised primary style={styles.formControl} onPress={() => navigation.navigate('EditLocation')}>Go to
            EditLocation.js
            </Button>

            <Map>
                {markers != null ? markers.map(marker => (
                    <Marker
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                            title: marker._id
                        }}
                    >

                    </Marker>
                )): ''}
            </Map>
        </ScrollView>
    );
};

export default Locations;
