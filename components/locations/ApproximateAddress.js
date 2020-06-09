import React, {Fragment} from 'react';
import {Text} from "react-native";
import styles from "../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {Title} from "react-native-paper";

const ApproximateAddress = ({approxAddress}) => {
    return (
        <Fragment>
            <Title><Icon name="map" size={22} style={styles.iconForRightbutton}/> Approximate Address:</Title>

            <Text>{approxAddress}</Text>
        </Fragment>
    );
};

export default ApproximateAddress;
