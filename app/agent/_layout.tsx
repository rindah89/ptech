import { Stack } from 'expo-router';
import React from 'react';

export default function AgentLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="scan" />
            <Stack.Screen name="issue-ticket" />
        </Stack>
    );
}
