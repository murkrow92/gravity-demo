import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigation from './navigation/RootNavigation.tsx';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <RootNavigation />
            </NavigationContainer>
        </QueryClientProvider>
    );
}

export default App;
