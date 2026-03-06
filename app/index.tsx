import { Redirect } from 'expo-router';
import React from 'react';

export default function Index() {
    // Normally here you'd check auth state
    return <Redirect href="/onboarding/discover" />;
}
