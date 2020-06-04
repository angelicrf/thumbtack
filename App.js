import React from 'react';
import { MyDrawer } from './components/DrawerApp';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
    return (
        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>
    );
}

export default App;
