import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';



const Header = props => {
    return (
       
            <SafeAreaView>
            <TouchableOpacity style={styles.container}>
                <View style={styles.views}>
                    <Text style={styles.texts}>{props.title}</Text>
                </View>
                </TouchableOpacity>
            </SafeAreaView>
        
    );
};
Header.defaultProps = {
    title: 'Angelique Navigators',
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'darkblue',
        padding: 25,
        borderBottomColor: 'red',
        borderBottomWidth: 5,
    },
    views: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    texts: {
        padding: 10,
        fontSize: 20,
	}

})


export default Header;