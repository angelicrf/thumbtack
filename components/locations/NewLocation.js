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
    const [regionLatitude, setRegionLatitude] = useState(0);
    const [regionLongitude, setRegionLongitude] = useState(0);
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

    const getRegionGeolocation = () => {
        if(latitude === +47.61670) {
            console.log(`latitude: ${latitude}`)
            Geolocation.getCurrentPosition(
                (position) => {
                    setRegionLatitude(position.coords.latitude);
                    setRegionLongitude(position.coords.longitude);
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
            return {latitude: regionLatitude, longitude: regionLongitude, latitudeDelta: 0.04, longitudeDelta: 0.05,}
        } else {
            return { latitude: latitude, longitude: longitude, latitudeDelta: 0.04, longitudeDelta: 0.05}
        }
        
    };

    const getGeolocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
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
    }

    const onLocationNoteChange = (e) => {
        setLocationNotes(e);
    }

    const onAddressChage = (e) => {
        setAddress(e);
    }

    // Something wrong with this function. State does not complete setting before component navigates away.
    const resetState = () => {
        setDateLocated('');
        setLongitude(-122.20000);
        setLatitude(+47.61670);
        setLocationName('');
        setLocationNotes('');
        setMarker(null);
        setAddress('')
        navigation.navigate('Locations')
    }

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
    };

    useEffect(() => {
        setMarker([{ longitude, latitude }]);
    }, [longitude, latitude]);

    return (
        <ScrollView style={styles.container}>
            <Map
                markers={marker}
                onPressEvent={e => getCoordinates(e)}
                regionEvent={getRegionGeolocation()}
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
