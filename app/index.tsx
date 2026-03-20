import { Redirect } from 'expo-router';
import React from 'react';
import { useAuthStore } from '../store/authStore';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
    const { isAuthenticated, isLoading } = useAuthStore();
    
    if (isLoading) {
        return (
            <View style={{ flex: 1, backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#f97316" />
            </View>
        );
    }
    
    if (isAuthenticated) {
        return <Redirect href="/(tabs)" />;
    }
    
    return <Redirect href="/onboarding/discover" />;
}
