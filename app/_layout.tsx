import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useSegments, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '../store/authStore';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  const { isAuthenticated, isLoading, checkSession } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'auth';
    const inOnboardingGroup = segments[0] === 'onboarding';

    if (!isAuthenticated && !inAuthGroup && !inOnboardingGroup) {
      // Allow the router to process before replacing, avoids initial routing mount errors in some expo-router versions
      setTimeout(() => {
        router.replace('/onboarding/discover');
      }, 0);
    } else if (isAuthenticated && (inAuthGroup || inOnboardingGroup)) {
      setTimeout(() => {
        router.replace('/(tabs)');
      }, 0);
    }
  }, [isAuthenticated, isLoading, segments]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="index" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="admin" />
        <Stack.Screen name="agent" />
        <Stack.Screen name="auth/sign-in" />
        <Stack.Screen name="auth/sign-up" />
        <Stack.Screen name="parking/active" />
        <Stack.Screen name="parking/add-vehicle" />
        <Stack.Screen name="parking/duration" />
        <Stack.Screen name="parking/expiring" />
        <Stack.Screen name="parking/receipt" />
        <Stack.Screen name="parking/scanner" />
        <Stack.Screen name="parking/success" />
        <Stack.Screen name="profile/settings" />
        <Stack.Screen name="profile/support" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
