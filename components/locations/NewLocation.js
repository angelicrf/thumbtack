import { ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styles/global";
import { Button, Divider } from 'react-native-paper';
import CoordinateInfo from "./CoordinateInfo";
import Geolocation from 'react-native-geolocation-service';
import ApproximateAddress from "./ApproximateAddress";
import LocationFormInputs from "./LocationFormInputs";
import { storeData } from '../DataStorage';
import Map from '../Map';

const NewLocation = ({ navigation }) => {
    const [dateLocated, setDateLocated] = useState('');
    const [longitude, setLongitude] = useState(-122.20000);
    const [latitude, setLatitude] = useState(+47.61670);
    const [locationName, setLocationName] = useState('');
    const [locationNotes, setLocationNotes] = useState('');
    const [address, setAddress] = useState('');
    const [marker, setMarker] = useState(null);

    const getCoordinates = (pE) => {
        setDateLocated(new Date().toLocaleString());
        setLongitude(pE.nativeEvent.coordinate.longitude);
        setLatitude(pE.nativeEvent.coordinate.latitude);
        console.log(`Longitude: ${longitude} Latitude: ${latitude}`)
        setMarker([{ longitude, latitude }]);
    };

    const getGeolocation = () => {
        setDateLocated(new Date().toLocaleString());
        Geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                console.log(latitude);
                console.log(longitude);
            },
            (error) => {
                console.log(error.code, error.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 10000
            }
        );
    };

    const onLocationNameChange = (e) => {
        setLocationName(e);
        console.log(locationName);
    }

    const onLocationNoteChange = (e) => {
        setLocationNotes(e);
        console.log(locationNotes);
    }

    const onAddressChage = (e) => {
        setAddress(e);
        console.log(address);
    }

    const resetState = () => {
        setDateLocated('');
        setLongitude(-122.20000);
        setLatitude(+47.61670);
        setLocationName('');
        setLocationNotes('');
        setMarker(null);
        setAddress('')
        // while(address != ''){
        //     console.log('waiting');
        // }
        navigation.navigate('Locations')
    }

    // Approximate address not being saved because it is in a different component
    const addLocation = () => {

        let locationObject = {
            dateLocated,
            longitude,
            latitude,
            locationName,
            locationNotes,
            address
        }
        storeData(locationObject);
        resetState();
    };

    useEffect(() => {
        setMarker([{ longitude, latitude }]);
    }, [longitude, latitude]);

    return (
        <ScrollView style={styles.container}>
            <Map
                markers={marker}
                onPressEvent={e => getCoordinates(e)}
                region={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.05,
                }}
            ></Map>

            <Divider style={styles.divider} />

            <Button
                raised
                primary
                mode='contained'
                icon='map-search'
                color='green'
                style={styles.formControl}
                onPress={getGeolocation}
            >
                Get My Coordinates
            </Button>

            <CoordinateInfo dateLocated={dateLocated} longitude={longitude} latitude={latitude} />

            <Divider style={styles.divider} />

            <ApproximateAddress longitude={longitude} latitude={latitude} addressStateUpdate={onAddressChage} />

            <Divider style={styles.divider} />

            <LocationFormInputs locationNameEvent={onLocationNameChange} locationNotesEvent={onLocationNoteChange} />

            <Button raised primary mode='contained' icon='map-marker-plus' style={styles.submitButton}
                onPress={addLocation}>Add New Location</Button>
        </ScrollView>
    );
};

export default NewLocation;
