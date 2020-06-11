import React, {Fragment, useState} from 'react';
import {Text} from "react-native";
import styles from "../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Title} from "react-native-paper";
import Geocoder from 'react-native-geocoder';

const ApproximateAddress = ({longitude, latitude}) => {
    const [approxAddress, setApproxAddress] = useState('');

    // Get approximate address from longitude and latitude.
    Geocoder.fallbackToGoogle('AIzaSyBYnmqLuqgIte1mllVTv98yJLdbUhzQR0g');
    Geocoder.geocodePosition({lng: longitude, lat: latitude})
        .then(res => setApproxAddress(res[0].formattedAddress))
        .catch(err => {
            setApproxAddress('Approximate address could not be found.');
            console.log(err);
        });

    return (
        <Fragment>
            <Title><Icon name="map" size={22} style={styles.iconForRightbutton}/> Approximate Address:</Title>

            <Text>{approxAddress}</Text>
        </Fragment>
    );
};

export default ApproximateAddress;
