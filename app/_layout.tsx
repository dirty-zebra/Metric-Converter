import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '../components/ThemeContext';
import { useTheme } from '../components/ThemeContext';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

function RootLayoutNav() {
  const { isDark } = useTheme();
  
  useEffect(() => {
    window.frameworkReady?.();
  }, []);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={isDark ? 'light' : 'dark'} />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}