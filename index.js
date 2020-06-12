/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry, YellowBox} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import React from "react";
import {NavigationContainer} from '@react-navigation/native';
import LocationsBottomTabNav from "./src/components/locations/LocationsBottomTabNav";
import {createStackNavigator} from "@react-navigation/stack";
import EditLocation from "./src/components/screens/EditLocation";
import PermissionsPrompt from "./src/components/screens/PermissionsPrompt";

YellowBox.ignoreWarnings([
    "Require cycle:",
    'AsyncStorage has been extracted from react-native core'
])

export default function Main() {
    const stack = createStackNavigator();

    return (
        <NavigationContainer>
            <PaperProvider>
                <stack.Navigator>
                    <stack.Screen name="Locations" options={{title: 'Thumbtack'}}
                                  component={LocationsBottomTabNav}/>
                    <stack.Screen name="EditLocation" options={{title: 'Edit Location'}} component={EditLocation}/>

                    <stack.Screen name="PermissionsPrompt" options={{title: 'Thumbtack', headerLeft: null}}
                                  component={PermissionsPrompt}/>
                </stack.Navigator>
            </PaperProvider>
        </NavigationContainer>
    );
}

AppRegistry.registerComponent(appName, () => Main);
