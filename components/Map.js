import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import { getPermission } from "./Permission";

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

    return (
        <View style={styles.container1}>
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={regionEvent}
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
                        />
                    }
                </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
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
