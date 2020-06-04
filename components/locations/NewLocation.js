import {View} from "react-native";
import React, {Fragment, useState} from "react";
import styles from "../styles/global";
import {Button, Divider, Text, TextInput, Title} from 'react-native-paper';

const NewLocation = () => {
    const [dateLocated, setDateLocated] = useState('');
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
    const [approxAddress, setApproxAddress] = useState('');

    const getCoordinates = () => {
        // Test values
        setDateLocated(new Date().toLocaleString());
        setLongitude(-47.152);
        setLatitude(+128.123);
        setApproxAddress('123 ABC ST NE, City, State 12345');
    };

    const addLocation = () => {
        console.log('Test output: new location added!');
    };

    return (
        <View style={styles.container}>
            <Button raised primary style={styles.button} onPress={getCoordinates}>Get Coordinates</Button>
            <Text>Date & Time: {dateLocated === '' ? '---' : dateLocated}</Text>
            <Text>Longitude: {longitude === 0 ? '---' : longitude}</Text>
            <Text>Latitude: {latitude === 0 ? '---' : latitude}</Text>

            <Divider style={styles.divider}/>

            <Title>Approximate Address:</Title>
            <Text>{approxAddress}</Text>
            <Fragment><Text>This is just a placeholder; replace this fragment with the map embed.</Text></Fragment>

            <Divider style={styles.divider}/>

            <TextInput label='Location Name' style={styles.formControl} onChangeText={(val) => console.log(val)}/>
            <TextInput label='Notes' multiline numberOfLines={6} style={styles.formControl} onChangeText={(val) => console.log(val)}/>
            <Button raised primary style={styles.button} onPress={addLocation}>Add New Location</Button>
        </View>
    );
};

export default NewLocation;
