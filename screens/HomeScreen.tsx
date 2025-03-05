import React from 'react';
import { View } from 'react-native';
import Header from '../components/Header';
import NewsFeed from '../components/NewsFeed';
import BottomNavBar from '../components/BottomNavBar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View className="flex-1">
      <Header navigation={navigation} />

      <View className="flex-1 bg-gray-50">
        <NewsFeed />
      </View>
      <BottomNavBar />
    </View>
  );
} 