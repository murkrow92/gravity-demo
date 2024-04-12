import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './navigation/RootNavigation.tsx';

function App(): React.JSX.Element {
    return (
        <NavigationContainer>
            <RootNavigation />
        </NavigationContainer>
    );
}

export default App;
