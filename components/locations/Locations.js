import {Text, View} from "react-native";
import React from "react";
import styles from "../styles/global";
import {Button} from "react-native-paper";

const Locations = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>The button below is just a test:</Text>
            <Button raised primary style={styles.button} onPress={() => navigation.navigate('EditLocation')}>Go to EditLocation.js</Button>
        </View>
    );
};

export default Locations;
