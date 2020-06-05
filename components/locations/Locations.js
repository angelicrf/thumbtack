import {ScrollView, Text} from "react-native";
import React from "react";
import styles from "../styles/global";
import {Button} from "react-native-paper";

const Locations = ({navigation}) => {
    return (
        <ScrollView style={styles.container}>
            <Text>Replace the contents of this page with cards or something more suitable for the list of locations.</Text>

            <Text>The button below is just a test:</Text>
            <Button raised primary style={styles.formControl} onPress={() => navigation.navigate('EditLocation')}>Go to
                EditLocation.js</Button>
        </ScrollView>
    );
};

export default Locations;
