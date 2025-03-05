import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { loadFonts } from './src/theme/fonts';
import { AuthStack } from './navigation/AuthStack';
import HomeScreen from './screens/HomeScreen';
import PostDetailScreen from './screens/PostDetailScreen';

import './global.css';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <View 
          className="flex-1 bg-slate-50" 
          style={{ 
            paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0 
          }}
          onLayout={onLayoutRootView}
        >
          <StatusBar style="auto" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Auth" component={AuthStack} />
            <Stack.Screen name="PostDetail" component={PostDetailScreen} />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
