import React, {Fragment, useEffect, useState} from 'react';
import {Text} from "react-native";
import styles from "../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Title} from "react-native-paper";
import Geocoder from 'react-native-geocoder';

const ApproximateAddress = ({approxAddress, longitude, latitude, addressStateUpdate}) => {
    const [geocoderAddress, setGeocoderAddress] = useState('---');

    useEffect(() => {
        if (typeof approxAddress !== 'string') {
            if (longitude !== 0 && latitude !== 0) {
                // Get approximate address from longitude and latitude.
                Geocoder.fallbackToGoogle('AIzaSyBYnmqLuqgIte1mllVTv98yJLdbUhzQR0g');
                Geocoder.geocodePosition({lng: longitude, lat: latitude})
                    .then(res => {
                        setGeocoderAddress(res[0].formattedAddress);
                        addressStateUpdate(res[0].formattedAddress);
                    })
                    .catch(err => {
                        setGeocoderAddress('Approximate address could not be found.');
                        console.log(err);
                    });
            } else {
                setGeocoderAddress('---');
            }
        }
    }, [longitude, latitude]);

    return (
        <Fragment>
            <Title><Icon name="map" size={22} style={styles.iconForRightButton}/> Approximate Address:</Title>

            <Text>{approxAddress ? approxAddress : geocoderAddress}</Text>
        </Fragment>
    );
};

export default ApproximateAddress;
