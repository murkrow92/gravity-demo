import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigation from './navigation/RootNavigation.tsx';
import ModalProvider from './providers/ModalProvider.tsx';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <ModalProvider>
                <NavigationContainer>
                    <RootNavigation />
                </NavigationContainer>
            </ModalProvider>
        </QueryClientProvider>
    );
}

export default App;
