import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import Navigate from './components/Navigate';
import Home from './components/Home';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';

import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import Datastore from './node_modules/react-native-local-mongodb';
//const Stack = createStackNavigator();
function CustomDrawerContent(props) {

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

function MyDrawer() {
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
const App = () => {
 
    var db = new Datastore({
        filename: "locations", autoload: true });
    db.loadDatabase();
    db.insert({ a: 5 }, function (err, newDocs) {
        console.log(newDocs);
        // newDocs is an array with these documents, augmented with their _id
    });
    //db.update({ a: 5 }, { a: 65 }, {}, function (err, numReplaced) {
    //    console.log(numReplaced);
        
    //});
    db.findOne({ a: 5 }, function (err, doc) {
        console.log(doc);
        // doc is the document Mars
        // If no document is found, doc is null
    });
    //db.remove({ a: 65 }, { multi: true }, function (err, numRemoved) {
    //    console.log(numRemoved);
    //    // All planets from the solar system were removed
    //});
    //db.find({}).exec(function (err, docs) {
    //    console.log(docs);
    //});
    return (

        //<NavigationContainer style={styles.container}>
        //    <Stack.Navigator initialRouteName="Home"
        //        screenOptions={{                
        //            headerStyle: {
        //                backgroundColor: 'navy',
        //            },
        //            headerTintColor: 'pink',
        //            headerTitle: props => <LogoTitle {...props} />,
        //            headerTitleStyle: {
        //                fontWeight: 'bold',
        //            },
        //        }}
        //    >
        //        <Stack.Screen style={styles.container} name="Home" component={Home}/>
        //        <Stack.Screen name="Navigate" component={Navigate}/>   
        //     </Stack.Navigator>
        //    </NavigationContainer>
        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        width:250,
        backgroundColor: 'yellow',
    }
});
function LogoTitle() {
    return (
        <View>
            <Image
                style={{ width: 50, height: 50, display: "flex" }}
                source={require('../navigators/assets/gps.png')}
            /><Text style={{ marginLeft: 80, marginTop: -29, fontSize: 25, color: 'pink' }}>Menu</Text>
           
        </View>
        
    );
}
export default App;
