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
    const [locationName, setLocationName] = useState('');
    const [locationNotes, setLocationNotes] = useState('');
    const [marker, setMarker] = useState(null);

    const getCoordinates = (pE) => {
        setDateLocated(new Date().toLocaleString());
        setLongitude(pE.nativeEvent.coordinate.longitude);
        setLatitude(pE.nativeEvent.coordinate.latitude);
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

            <ApproximateAddress longitude={longitude} latitude={latitude} />

            <Divider style={styles.divider} />

            <LocationFormInputs locationNameEvent={onLocationNameChange} locationNotesEvent={onLocationNoteChange} />

            {/* <View style={styles.formInputWrapperFlexRow}>
                <Icon name="map-marker-multiple" size={26} style={styles.iconForRightbutton}/>
                <TextInput label='Location Name' style={styles.buttonForLeftIcon}
                           onChangeText={val => onLocationNameChange(val)}/>
            </View>

            <View style={[styles.formInputWrapperFlexRow, styles.lastFlexRow]}>
                <Icon name="note" size={26} style={styles.iconForRightbutton}/>
                <TextInput label='Notes' multiline numberOfLines={6} style={styles.buttonForLeftIcon}
                           onChangeText={val => onLocationNoteChange(val)} />
            </View>

            <Divider style={styles.divider} /> */}

            <Button raised primary mode='contained' icon='map-marker-plus' style={styles.submitButton}
                onPress={addLocation}>Add New Location</Button>
        </ScrollView>
    );
};

export default NewLocation;
