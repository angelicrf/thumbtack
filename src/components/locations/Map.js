import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from "react-native-geolocation-service";

const Map = ({longitude, latitude, markers, onPressEvent, onPressMarker}) => {
    const [regionLatitude, setRegionLatitude] = useState(0);
    const [regionLongitude, setRegionLongitude] = useState(0);

    const getRegionGeolocation = () => {
        if (longitude === 0 || latitude === 0) {
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

    return (
        <View style={styles.container1}>
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={getRegionGeolocation()}
                    onPress={onPressEvent}
                >
                    {markers != null ? markers.map((marker, i) => (
                            <Marker
                                key={i}
                                identifier={marker._id}
                                coordinate={{
                                    latitude: parseFloat(marker.latitude),
                                    longitude: parseFloat(marker.longitude)
                                }}
                                title={marker.name}
                                description={marker.notes}
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
