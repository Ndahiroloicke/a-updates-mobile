import React from 'react';
import { View } from 'react-native';
import Header from '../components/Header';
import NewsFeed from '../components/NewsFeed';
import BottomNavBar from '../components/BottomNavBar';

export default function HomeScreen() {
  return (
    <View className="flex-1">
      <Header />
      <View className="flex-1 bg-gray-50">
        <NewsFeed />
      </View>
      <BottomNavBar />
    </View>
  );
} 