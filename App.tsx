import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthStack } from './navigation/AuthStack';
import HomeScreen from './screens/HomeScreen';
import PostDetailScreen from './screens/PostDetailScreen';

import './global.css';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <View className="flex-1 bg-slate-50" style={{ 
          paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0 
        }}>
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
