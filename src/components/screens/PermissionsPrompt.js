import React, {useLayoutEffect} from "react";
import {BackHandler, PermissionsAndroid, ScrollView, View} from "react-native";
import styles from "../styles/global";
import {Button, Text} from "react-native-paper";

const PermissionsPrompt = ({navigation}) => {
    const exitApp = () => BackHandler.exitApp();

    const getPermission = () => {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(result => {
            if (result === PermissionsAndroid.RESULTS.GRANTED)
                navigation.navigate('Locations');
        });
    }

    useLayoutEffect(getPermission, [navigation]);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.permissionsPrompt}>
            <Text style={{marginBottom: 14}}>Location permission is required for this app.</Text>

            <View style={styles.formInputWrapperFlexRow}>
                <Button raised primary mode='contained' style={{marginRight: 14}} onPress={getPermission}>
                    Grant Permission
                </Button>

                <Button raised mode='outlined' onPress={exitApp}>Exit</Button>
            </View>
        </ScrollView>
    );
};

export default PermissionsPrompt;