import {ScrollView} from "react-native";
import React, {useLayoutEffect, useState} from "react";
import styles from "../styles/global";
import LocationFormInputs from "../locations/LocationFormInputs";
import {Button, Divider, Snackbar} from "react-native-paper";
import CoordinateInfo from "../locations/CoordinateInfo";
import ApproximateAddress from "../locations/ApproximateAddress";
import LocationService from "../../services/LocationService";

const EditLocation = ({navigation, route}) => {
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const {locationId} = route.params;
    const [locationIdForEdit, setLocationIdForEdit] = useState(null);
    const [dateLocated, setDateLocated] = useState('');
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [locationName, setLocationName] = useState('');
    const [locationNotes, setLocationNotes] = useState('');
    const [approxAddress, setApproxAddress] = useState('');

    useLayoutEffect(() => {
        // Prevent infinite loop.
        if (locationIdForEdit === null) {
            setLocationIdForEdit(locationId);

            LocationService.getByIdAsync(locationId).then(location => {
                setLongitude(location.longitude);
                setLatitude(location.latitude);
                setLocationName(location.name);
                setLocationNotes(location.notes);
                setDateLocated(location.date);
                setApproxAddress(location.approxAddress);
            });
        }
    }, [locationIdForEdit, dateLocated, longitude, latitude, locationName, locationNotes, dateLocated, approxAddress]);

    const onLocationNameChange = (e) => {
        setLocationName(e);
    }

    const onLocationNoteChange = (e) => {
        setLocationNotes(e);
    }

    const saveLocation = () => {
        // Location Name is required.
        if (locationName === '') {
            setSnackbarVisible(true);

            return;
        }

        // Update location.
        LocationService.updateByIdAsync(locationIdForEdit, locationName, locationNotes).then(() => {
            navigation.navigate('Locations');
        });
    };

    const deleteLocation = () => {
        LocationService.deleteByIdAsync(locationIdForEdit).then(() => {
            navigation.navigate('Locations');
        });
    }

    return (
        <ScrollView style={styles.container}>
            <LocationFormInputs name={locationName} notes={locationNotes} locationNameEvent={onLocationNameChange} locationNotesEvent={onLocationNoteChange}/>

            <Divider style={styles.divider}/>

            <CoordinateInfo dateLocated={dateLocated} longitude={longitude} latitude={latitude}/>

            <Divider style={styles.divider}/>

            <ApproximateAddress approxAddress={approxAddress}/>

            <Button raised primary mode='contained' icon='map-marker-plus' style={styles.submitButton}
                    onPress={saveLocation}>Update Location</Button>
            <Button raised color={'red'} mode='contained' icon='map-marker-minus' style={styles.submitButton}
                    onPress={deleteLocation}>Delete Location</Button>

            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={5000}
                action={{label: 'Dismiss', onPress: () => setSnackbarVisible(false)}}
            >Location Name is required.</Snackbar>
        </ScrollView>
    );
};

export default EditLocation;
