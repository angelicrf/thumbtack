import { ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styles/global";
import { Avatar, Button, Card, Title, Paragraph, Divider } from "react-native-paper";
import Map from '../Map';
import Datastore from '../../node_modules/react-native-local-mongodb'
import UseForceUpdate from './UseForceUpdate';

const Locations = ({ navigation }) => {
    const [markers, setMarkers] = useState(null);
    const [newMarker, setNewMarker] = useState();
    const [state, setState] = useState('empty');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [image, setImage] = useState('');
    const forceUpdate = UseForceUpdate();

    const getLocations = async () => {
        let db = new Datastore({
            filename: "../DataStore/locations.db", autoload: true
        });

        let updatedMarkers;

        // This prevents an infinite loop where, for some reason, the db keeps getting called and the map is unable to be moved.
        // need to find a way to refresh the map when a new location is added.
        if (markers === null) {
            updatedMarkers = await db.find({}, function (err, docs) {
                setMarkers(docs);
                console.log("set markers");
            });
        }

        return updatedMarkers;
    }

    useEffect(() => {

        getLocations();
        const id = setInterval(forceUpdate, 16)
        return () => clearInterval(id)
        //console.log("Markers: " + JSON.stringify(markers));
    }, [markers]);

    /* This is sort of a hack. In order to get the correct marker from the map it must compare with
       something inside the db of stored objects. Currently, I am only comparing the longitude of both 
       items and returning the stored marker name if they match. This would pose edge case bugs if used
       past the prototype phase. */
    const findMarkerName = (currentMarkerLongitude, allMarkers) => {
        for (let item of allMarkers) {
            if (item.longitude === currentMarkerLongitude) {
                console.log(item.locationName);
                return item.locationName
            }
        }
    }


    const findMarkerNotes = (currentMarkerLongitude, allMarkers) => {
        for (let item of allMarkers) {
            if (item.longitude === currentMarkerLongitude) {
                console.log(item.locationName);
                return item.locationNotes
            }
        }
    }

    const recordEvent = (name) => {
        console.log(`Name: ${JSON.stringify(name.nativeEvent)}`);
        // Currently image is random. Possible future feature is for users to save images of the locations they save.
        setImage(Math.floor(Math.random() * Math.floor(700)));
        setName(findMarkerName(name.nativeEvent.coordinate.longitude, markers));
        setLatitude(name.nativeEvent.coordinate.latitude);
        setLongitude(name.nativeEvent.coordinate.longitude);
        setNotes(findMarkerNotes(name.nativeEvent.coordinate.longitude, markers));
    }

    return (
        <ScrollView style={styles.container}>
            <Button raised primary style={styles.formControl} onPress={() => navigation.navigate('EditLocation')}>Go to
            EditLocation.js
            </Button>
            <Map markers={markers} onPressMarker={recordEvent} />
            <Divider style={styles.divider} />
            {name === '' ? null :
                <Card>
                    <Card.Content>
                        <Title>{name}</Title>
                        <Paragraph>{notes}</Paragraph>
                    </Card.Content>
                    <Card.Cover source={{ uri: 'https://picsum.photos/' + image }} />
                    <Card.Actions>
                        <Button raised primary style={styles.formControl} onPress={() => navigation.navigate('EditLocation')}>
                            EDIT
                    </Button>
                    </Card.Actions>
                </Card>}
        </ScrollView>
    );
};

export default Locations;
