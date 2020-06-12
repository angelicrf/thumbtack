import { ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../styles/global";
import { Button, Card, Title, Paragraph, Divider } from "react-native-paper";
import Map from '../Map';
import Datastore from '../../node_modules/react-native-local-mongodb'
import Geolocation from 'react-native-geolocation-service';

const Locations = ({ navigation }) => {
    const [markers, setMarkers] = useState([]);
    const [newMarker, setNewMarker] = useState();
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [regionLatitude, setRegionLatitude] = useState(0);
    const [regionLongitude, setRegionLongitude] = useState(0);
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [image, setImage] = useState('');

    const getLocationsAsync = async () => {
        setMarkers([]);

        let db = new Datastore({
            filename: "../DataStore/locations.db", autoload: true
        });

        let updatedMarkers = await db.findAsync({}, function (err, docs) {
            setMarkers(docs);
            console.log("set markers");
        });

        return updatedMarkers;
    }
    
    const getGeolocation = () => {
        if(latitude === 0) {
            Geolocation.getCurrentPosition(
                (position) => {
                    setRegionLatitude(position.coords.latitude);
                    setRegionLongitude(position.coords.longitude);
                },
                (error) => {
                    console.log(error.code, error.message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 10000
                }
            );
            return {latitude: regionLatitude, longitude: regionLongitude, latitudeDelta: 0.04, longitudeDelta: 0.05,}
        } else {
            return { latitude: latitude, longitude: longitude, latitudeDelta: 0.04, longitudeDelta: 0.05}
        }
        
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            console.log("inside unsub");
            await getLocationsAsync();
        });

        return unsubscribe;
    }, [navigation]);

    /* This is sort of a hack. In order to get the correct marker from the map it must compare with
       something inside the db of stored objects. Currently, I am only comparing the longitude of both 
       items and returning the stored marker name if they match. This would pose edge case bugs if used
       past the prototype phase. */
    const findMarkerName = (currentMarkerLongitude, allMarkers) => {
        for (let item of allMarkers) {
            if (item.longitude === currentMarkerLongitude) {
                setNewMarker(item);
                return item.locationName
            }
        }
    }


    const findMarkerNotes = (currentMarkerLongitude, allMarkers) => {
        for (let item of allMarkers) {
            if (item.longitude === currentMarkerLongitude) {
                return item.locationNotes
            }
        }
    }

    const recordEvent = (name) => {
        // Currently image is random. Possible future feature is for users to save images of the locations they save.
        setImage(Math.floor(Math.random() * Math.floor(700)));
        setName(findMarkerName(name.nativeEvent.coordinate.longitude, markers));
        setLatitude(name.nativeEvent.coordinate.latitude);
        setLongitude(name.nativeEvent.coordinate.longitude);
        setNotes(findMarkerNotes(name.nativeEvent.coordinate.longitude, markers));
    }
    
    return (
        <ScrollView style={styles.container}>
            <Map markers={markers} onPressMarker={recordEvent} regionEvent={getGeolocation()} />
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
                            EDIT LOCATION
                        </Button>
                    </Card.Actions>
                </Card>}
        </ScrollView>
    );
};

export default Locations;
