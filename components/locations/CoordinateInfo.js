import React, {Fragment} from 'react';
import {Text, View} from "react-native";
import styles from "../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CoordinateInfo = ({dateLocated, longitude, latitude}) => {
    return (
        <Fragment>
            <View style={styles.textWrapperFlexRow}>
                <Icon name="clock" size={18}/>
                <Text style={styles.textForLeftIcon}>Date & Time: {dateLocated === '' ? '---' : dateLocated}</Text>
            </View>

            <View style={styles.textWrapperFlexRow}>
                <Icon name="swap-horizontal" size={18}/>
                <Text style={styles.textForLeftIcon}>Longitude: {longitude === 0 ? '---' : longitude}</Text>
            </View>

            <View style={[styles.textWrapperFlexRow, styles.lastFlexRow]}>
                <Icon name="swap-vertical" size={18}/>
                <Text style={styles.textForLeftIcon}>Latitude: {latitude === 0 ? '---' : latitude}</Text>
            </View>
        </Fragment>
    );
};

export default CoordinateInfo;
