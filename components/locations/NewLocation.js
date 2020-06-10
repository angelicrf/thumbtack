import { ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styles/global";
import { Button, Divider } from 'react-native-paper';
import CoordinateInfo from "./CoordinateInfo";
import ApproximateAddress from "./ApproximateAddress";
import LocationFormInputs from "./LocationFormInputs";
import { storeData } from '../DataStorage';
import Map from '../Map';

const NewLocation = () => {
    const [dateLocated, setDateLocated] = useState('');
    const [longitude, setLongitude] = useState(-122.20000);
    const [latitude, setLatitude] = useState(+47.61670);
    const [approxAddress, setApproxAddress] = useState('');
    const [marker, setMarker] = useState(null);

    const getCoordinates = (pE) => {
        setDateLocated(new Date().toLocaleString());
        setLongitude(pE.nativeEvent.coordinate.longitude);
        setLatitude(pE.nativeEvent.coordinate.latitude);
        setApproxAddress('New Location test Address');
        console.log(`Longitude: ${longitude} Latitude: ${latitude}`)
        setMarker([{ longitude, latitude }]);
    };

    const addLocation = () => {

        let locationObject = {
            dateLocated,
            longitude,
            latitude,
            approxAddress
        }

        storeData(locationObject);
        console.log('Test output: new location added!');
    };

    useEffect(() => {
        setMarker([{ longitude, latitude }]);
    }, [longitude, latitude]);

    // TODO: Need to implement map focus on new marker when onPress event is called. 
    // see https://github.com/react-native-community/react-native-maps/blob/master/example/examples/FitToCoordinates.js
    // for possible solution.

    return (
        <ScrollView style={styles.container}>
            <Map markers={marker} onPressEvent={e => getCoordinates(e)} ></Map>

            <Divider style={styles.divider} />

            <CoordinateInfo dateLocated={dateLocated} longitude={longitude} latitude={latitude} />

            <Divider style={styles.divider} />

            <ApproximateAddress approxAddress={approxAddress} />

            <Divider style={styles.divider} />

            <LocationFormInputs />

            <Button raised primary mode='contained' icon='map-marker-plus' style={styles.submitButton}
                onPress={addLocation}>Add New Location</Button>
        </ScrollView>
    );
};

export default NewLocation;
