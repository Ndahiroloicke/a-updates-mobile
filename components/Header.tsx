import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { UserIcon } from 'lucide-react-native';

export default function Header() {
  return (
    <SafeAreaView className="bg-white border-b border-gray-200">
      <View className="flex-row justify-between items-center px-4 py-3">
        <Text className="text-2xl font-bold text-green-600">
          Africa Updates
        </Text>
        <TouchableOpacity 
          className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
          onPress={() => console.log('Profile pressed')}
        >
          <UserIcon size={24} color="#16A34A" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
} 