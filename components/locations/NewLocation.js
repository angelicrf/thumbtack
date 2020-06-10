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
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [approxAddress, setApproxAddress] = useState('');
    const [marker, setMarker] = useState(null);

    const getCoordinates = (pE) => {
        setDateLocated(new Date().toLocaleString());
        setLongitude(pE.nativeEvent.coordinate.longitude); 
        setLatitude(pE.nativeEvent.coordinate.latitude); 
        setApproxAddress('New Location test Address');
        // setState(prevState => ({ ...prevState, email }))
        //setMarker(prevState => (...prevState, [{ longitude, latitude }]);
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

    // markers={marker != null ? marker : null}

    // TODO: Need to implement map focus on new marker when onPress event is called. 
    // see https://github.com/react-native-community/react-native-maps/blob/master/example/examples/FitToCoordinates.js
    // for possible solution.

    // TODO: Need to implement marker to show on map when onPress event is called.

    // useEffect(() => {
    //     // We need this boolean so useEffect doesn't infinitely loop.
    //     if (marker === null) {
    //         setMarker([{ longitude, latitude }]);
    //     }
    // }, [marker]);

    // markers={marker}

    return (
        <ScrollView style={styles.container}>
            <Map onPressEvent={e => getCoordinates(e)} ></Map>
            <Button raised primary mode='contained' icon='map-search' color='green' style={styles.formControl}
                onPress={getCoordinates}>Get
                Coordinates</Button>

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
