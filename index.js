/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry, YellowBox} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import LocationsBottomTabNav from "./components/locations/LocationsBottomTabNav";
import {createStackNavigator} from "@react-navigation/stack";
import EditLocation from "./components/locations/EditLocation";

YellowBox.ignoreWarnings([
    "Require cycle:"
])

export default function Main() {
    const stack = createStackNavigator();

    return (
        <NavigationContainer>
            <PaperProvider>
                <stack.Navigator>
                    <stack.Screen name="Locations" options={{ title: 'Thumbtack' }} component={LocationsBottomTabNav}/>
                    <stack.Screen name="EditLocation" options={{ title: 'Edit Location' }} component={EditLocation}/>
                </stack.Navigator>
            </PaperProvider>
        </NavigationContainer>
    );
}

AppRegistry.registerComponent(appName, () => Main);
