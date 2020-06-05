import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import Locations from "./Locations";
import NewLocation from "./NewLocation";

const LocationsBottomTabNav = () => {
    const nav = createMaterialBottomTabNavigator();

    return (
        <nav.Navigator>
            <nav.Screen
                name="Locations"
                component={Locations}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Icon name="map-marker-multiple" color={focused ? "white" : "#AAA"} size={24}/>)
                }}
            />

            <nav.Screen
                name="New Location"
                component={NewLocation}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Icon name="map-marker-plus" color={focused ? "white" : "#AAA"} size={24}/>)
                }}
            />
        </nav.Navigator>
    );
};

export default LocationsBottomTabNav;
