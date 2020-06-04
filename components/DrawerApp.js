import React from 'react';
import Navigate from './Navigate';
import Home from './Home';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';


export const CustomDrawerContent = (props) => {

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Back"
                icon={
                    config => <Icon
                        size={23}
                        name={Platform.OS === 'android' ? 'chevron-circle-left' : 'chevron-circle-left'}
                    />}
                onPress={() => props.navigation.closeDrawer()}
            />
        </DrawerContentScrollView>
    );
}

const Drawer = createDrawerNavigator();

export const MyDrawer = () => {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home}
                options={{
                    drawerIcon:
                        config => <Icon
                            size={23}
                            name={Platform.OS === 'android' ? 'home' : 'home'}></Icon>
                }}
            />
            <Drawer.Screen name="Navigate" component={Navigate}
                options={{
                    drawerIcon:
                        config => <Icon
                            size={23}
                            name={Platform.OS === 'android' ? 'map-marker' : 'map-marker'}></Icon>
                }}

            />
        </Drawer.Navigator>
    );
}