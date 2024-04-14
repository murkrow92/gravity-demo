import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigation from './navigation/RootNavigation.tsx';
import ToastProvider from './providers/ToastProvider.tsx';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastProvider>
                <NavigationContainer>
                    <RootNavigation />
                </NavigationContainer>
            </ToastProvider>
        </QueryClientProvider>
    );
}

export default App;
