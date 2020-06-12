import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { getPermission } from "./Permission";
//import { storeData } from './DataStorage';

const Map = ({ markers, onPressEvent, regionEvent, onPressMarker }) => {
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(() => {
        // We need this boolean so useEffect doesn't infinitely loop.
        if (!permissionGranted) {
            getPermission().then(() => {
                // Need dummy state reset to force re-render with the permission granted.
                setPermissionGranted(true);

                // Might be a possible edge case where this won't work properly if user explicitly
                // blocks permission. We can close app if they block it.
            });
        }
    }, []);

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
    getGeolocation();

    // const recordEvent = (name) => {
    //     console.log('Name: ' + name);
    //   }
    // storeData();

    // const getRegion = () => {
    //     let newRegion = {
    //         latitude: latitude,
    //         longitude: longitude,
    //         latitudeDelta: 0.04,
    //         longitudeDelta: 0.05,
    //     };

    //     if (regionEvent === null) {
    //         return newRegion;
    //     } else {
    //         return regionEvent;
    //     }
    // }

    // TODO: Setting the region in this component will cause the region to be reset in other components back to this
    // component's original region which is being pulled from device's current location.

    return (
        <View style={styles.container1}>
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.05,
                    }}
                    onPress={onPressEvent}
                >
                    {markers != null ? markers.map((marker, i) => (
                        <Marker
                            key={i}
                            identifier={`id${i}`}
                            coordinate={{
                                latitude: parseFloat(marker.latitude),
                                longitude: parseFloat(marker.longitude)
                            }}
                            title={marker.locationName}
                            description={marker.locationNotes}
                            // onPress={recordEvent}
                            onPress={onPressMarker}
                        />
                    )) :
                        <Marker
                            coordinate={{
                                latitude: +47.61670,
                                longitude: -122.20000
                            }}
                            title={"This isn't working"}
                            description={"category:You Messed up"}
                            // onSelect={recordEvent}
                        />
                    }
                </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    container1: {
        flex: 1,
    },
    homeName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    displayText: {
        marginLeft: 290,
        textAlign: 'right',
        fontSize: 20,
    }
});
export default Map;
