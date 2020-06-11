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
    const [locationName, setLocationName] = useState('');
    const [locationNotes, setLocationNotes] = useState('');
    const [marker, setMarker] = useState(null);

    const getCoordinates = (pE) => {
        setDateLocated(new Date().toLocaleString());
        setLongitude(pE.nativeEvent.coordinate.longitude);
        setLatitude(pE.nativeEvent.coordinate.latitude);
        // setApproxAddress('New Location test Address');
        console.log(`Longitude: ${longitude} Latitude: ${latitude}`)
        setMarker([{ longitude, latitude }]);
    };

    const onLocationNameChange = (e) => {
        setLocationName(e);
        console.log(locationName);
    }

    const onLocationNoteChange = (e) => {
        setLocationNotes(e);
        console.log(locationNotes);
    }

    const addLocation = () => {

        let locationObject = {
            dateLocated,
            longitude,
            latitude,
            // approxAddress,
            locationName,
            locationNotes
        }

        storeData(locationObject);
        console.log(`LocationObject: ${locationObject}`);
    };

    useEffect(() => {
        setMarker([{ longitude, latitude }]);
    }, [longitude, latitude]);

    return (
        <ScrollView style={styles.container}>
            <Map markers={marker} onPressEvent={e => getCoordinates(e)} ></Map>

            <Divider style={styles.divider} />

            <CoordinateInfo dateLocated={dateLocated} longitude={longitude} latitude={latitude} />

            <Divider style={styles.divider} />

            {/* This is an optional feature that we may implement if time permits */}
            {/* <ApproximateAddress approxAddress={approxAddress} /> */}

            {/* <Divider style={styles.divider} /> */}

            <LocationFormInputs locationNameEvent={onLocationNameChange} locationNotesEvent={onLocationNoteChange} />

            <Button raised primary mode='contained' icon='map-marker-plus' style={styles.submitButton}
                onPress={addLocation}>Add New Location</Button>
        </ScrollView>
    );
};

export default NewLocation;
