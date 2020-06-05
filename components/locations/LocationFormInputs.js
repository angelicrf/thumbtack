import React, {Fragment} from 'react';
import {View} from "react-native";
import styles from "../styles/global";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {TextInput} from "react-native-paper";

const LocationFormInputs = () => {
    return (
        <Fragment>
            <View style={styles.formInputWrapperFlexRow}>
                <Icon name="map-marker-multiple" size={26} style={styles.iconForRightbutton}/>
                <TextInput label='Location Name' style={styles.buttonForLeftIcon}
                           onChangeText={(val) => console.log(val)}/>
            </View>

            <View style={[styles.formInputWrapperFlexRow, styles.lastFlexRow]}>
                <Icon name="note" size={26} style={styles.iconForRightbutton}/>
                <TextInput label='Notes' multiline numberOfLines={6} style={styles.buttonForLeftIcon}
                           onChangeText={(val) => console.log(val)}/>
            </View>
        </Fragment>
    );
};

export default LocationFormInputs;
