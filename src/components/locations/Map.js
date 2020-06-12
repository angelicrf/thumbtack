import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const Map = ({markers, onPressEvent, regionEvent, onPressMarker}) => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

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
                                identifier={marker._id}
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
