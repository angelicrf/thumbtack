import React, {Fragment, useEffect, useState} from 'react';
import {Text} from "react-native";
import styles from "../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Title} from "react-native-paper";
import Geocoder from 'react-native-geocoding';

const ApproximateAddress = ({approxAddress, longitude, latitude, addressStateUpdate}) => {
    const [geocoderAddress, setGeocoderAddress] = useState('---');

    Geocoder.init('AIzaSyBYnmqLuqgIte1mllVTv98yJLdbUhzQR0g');

    useEffect(() => {
        if (typeof approxAddress !== 'string') {
            setGeocoderAddress('---');
            addressStateUpdate('---');

            if (longitude !== 0 && latitude !== 0) {
                // Get approximate address from longitude and latitude.
                Geocoder.from({longitude, latitude})
                    .then(res => {
                        const formattedAddress = res.results[0].formatted_address;
                        setGeocoderAddress(formattedAddress);
                        addressStateUpdate(formattedAddress);
                    })
                    .catch(err => {
                        setGeocoderAddress('Approximate address could not be found.');
                        console.log(err);
                    });
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
