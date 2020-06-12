import {ScrollView} from "react-native";
import React, {useEffect, useState} from "react";
import styles from "../styles/global";
import {Button, Divider, Snackbar} from 'react-native-paper';
import CoordinateInfo from "../locations/CoordinateInfo";
import Geolocation from 'react-native-geolocation-service';
import ApproximateAddress from "../locations/ApproximateAddress";
import LocationFormInputs from "../locations/LocationFormInputs";
import LocationService from '../../services/LocationService';
import Location from '../../models/Location';
import Map from '../locations/Map';

const NewLocation = ({navigation}) => {
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarText, setSnackbarText] = useState('Input error.');
    const [snackbarAction, setSnackbarAction] = useState(null);
    const [dateLocated, setDateLocated] = useState('');
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [regionLatitude, setRegionLatitude] = useState(0);
    const [regionLongitude, setRegionLongitude] = useState(0);
    const [locationName, setLocationName] = useState('');
    const [locationNotes, setLocationNotes] = useState('');
    const [approxAddress, setApproxAddress] = useState('');
    const [marker, setMarker] = useState(null);

    const getCoordinates = (pE) => {
        setDateLocated(new Date().toLocaleString());
        setLongitude(pE.nativeEvent.coordinate.longitude);
        setLatitude(pE.nativeEvent.coordinate.latitude);
        setMarker([{longitude, latitude}]);
    };

    const getRegionGeolocation = () => {
        if (latitude === 0) {
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
            return {latitude: latitude, longitude: longitude, latitudeDelta: 0.04, longitudeDelta: 0.05}
        }

    };

    const getGeolocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setDateLocated(new Date().toLocaleString());
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

    const onAddressChange = (e) => {
        setApproxAddress(e);
    }

    const addLocation = () => {
        // Check if location already exists.
        LocationService.getDatastore().findOneAsync({longitude, latitude}).then(location => {
            if (location !== null) {
                // Location already exists.
                setSnackbarText('You have already saved this location.');
                setSnackbarAction({
                    label: 'View', onPress: () => {
                        setSnackbarVisible(false);
                        navigation.navigate('EditLocation', {locationId: location._id});
                    }
                });
                setSnackbarVisible(true);
            } else {
                // Create new location.

                // Location Name is required.
                if (locationName === '') {
                    setSnackbarText('Location Name is required.');
                    setSnackbarAction({label: 'Dismiss', onPress: () => setSnackbarVisible(false)});
                    setSnackbarVisible(true);

                    return;
                }

                // Insert new location.
                LocationService.addAsync(new Location(locationName, locationNotes, longitude, latitude, dateLocated, approxAddress)).then(() => {
                    // Reset this screen.
                    setSnackbarVisible(false);
                    setSnackbarText('Input error.');
                    setSnackbarAction(null);
                    setDateLocated('');
                    setLongitude(0);
                    setLatitude(0);
                    setRegionLatitude(0);
                    setRegionLongitude(0);
                    setLocationName('');
                    setLocationNotes('');
                    setApproxAddress('');
                    setMarker(null);

                    // Finally, go back to the Locations screen.
                    navigation.navigate({name: 'Locations'});
                });
            }
        });
    };

    useEffect(() => {
        setMarker([{longitude, latitude}]);
    }, [longitude, latitude]);

    return (
        <ScrollView style={styles.container}>
            <Map
                markers={marker}
                onPressEvent={e => getCoordinates(e)}
                regionEvent={getRegionGeolocation()}
            />

            <Divider style={styles.divider}/>

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

            <CoordinateInfo dateLocated={dateLocated} longitude={longitude} latitude={latitude}/>

            <Divider style={styles.divider}/>

            <ApproximateAddress longitude={longitude} latitude={latitude} addressStateUpdate={onAddressChange}/>

            <Divider style={styles.divider}/>

            <LocationFormInputs name={locationName} notes={locationNotes} locationNameEvent={onLocationNameChange} locationNotesEvent={onLocationNoteChange}/>

            <Button raised primary mode='contained' icon='map-marker-plus' style={styles.submitButton}
                    onPress={addLocation}>Add Location</Button>

            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={5000}
                action={snackbarAction}
            >{snackbarText}</Snackbar>
        </ScrollView>
    );
};

export default NewLocation;
