import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Home = ({ navigation }) => {
   
        return (
            <View style={styles.container}>
                <View>
                    <Icon.Button name="home" size={20}>
                     <Text style={styles.displayText}>Home</Text></Icon.Button>                 
                </View>
                <View>
                <Button title="Menu" onPress={() => navigation.openDrawer()} />
                </View>
            </View>    
        );  
};

const styles = StyleSheet.create({
    container: {
       flex: 1,      
    },
    homeName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    displayText: {
        marginLeft: 290,
        textAlign: 'right',
        fontSize: 20,
    }
});
export default Home;