import {PermissionsAndroid, ScrollView} from "react-native";
import React, {useEffect, useLayoutEffect, useState} from "react";
import styles from "../styles/global";
import {Button, Card, Divider, Paragraph, Title} from "react-native-paper";
import Map from '../locations/Map';
import Geolocation from 'react-native-geolocation-service';
import LocationService from "../../services/LocationService";

const Locations = ({navigation, route}) => {
    const [markers, setMarkers] = useState([]);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [regionLatitude, setRegionLatitude] = useState(0);
    const [regionLongitude, setRegionLongitude] = useState(0);
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [selectedLocationId, setSelectedLocationId] = useState(null);

    const getLocations = () => {
        setMarkers([]);

        LocationService.getAllAsync().then((locations) => {
            if (locations.length > 0)
                setMarkers(locations);
        }).catch((err) => console.log(err));
    }

    const getGeolocation = () => {
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

    const markerClickEvent = (marker) => {
        getSelectedLocation(marker._dispatchInstances.memoizedProps.identifier);
    };

    const getSelectedLocation = (id) => {
        LocationService.getByIdAsync(id).then(location => {
            if (location !== null) {
                setName(location.name);
                setNotes(location.notes);
                setLatitude(location.latitude);
                setLongitude(location.longitude);

                // Set selectedLocationId last so that all the other state variables are set before the card is shown.
                setSelectedLocationId(location._id);
            }
        });
    };

    const clearSelectedLocation = () => {
        setSelectedLocationId(null);
        setName('');
        setNotes('');
        setLatitude(0);
        setLongitude(0);
    };

    useLayoutEffect(() => {
        // We check for the location permission in this Locations screen instead of the Map component
        // since it's the initial screen and we require the navigation prop.
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(isGranted => {
            // We navigate to the PermissionsPrompt screen in this Locations screen instead of requesting it here
            // because it will force the map to re-render with the permissions enabled once granted.
            if (!isGranted)
                navigation.navigate('PermissionsPrompt');
        });
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            clearSelectedLocation();
            getLocations();
        });

        return unsubscribe;
    }, []);

    return (
        <ScrollView style={styles.container}>
            <Map
                markers={markers}
                onPressEvent={(e) => {
                    // Clear selected location when deselecting a marker.
                    clearSelectedLocation();
                }}
                onPressMarker={markerClickEvent}
                regionEvent={getGeolocation()}
            />
            <Divider style={styles.divider}/>
            {selectedLocationId !== null ? (
                <Card>
                    <Card.Content>
                        <Title>{name}</Title>
                        {notes.length ? <Paragraph>{notes}</Paragraph> : null}
                    </Card.Content>
                    <Card.Actions>
                        <Button raised primary style={styles.formControl}
                                onPress={() => navigation.navigate('EditLocation', {locationId: selectedLocationId})}>
                            EDIT LOCATION
                        </Button>
                    </Card.Actions>
                </Card>
            ) : null}
        </ScrollView>
    );
};

export default Locations;
