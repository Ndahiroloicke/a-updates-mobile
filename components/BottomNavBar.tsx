import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { 
  HomeIcon, 
  MessageSquareIcon, 
  PlusCircleIcon, 
  LayoutGridIcon, 
  UserIcon 
} from 'lucide-react-native';

type NavItem = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
};

export default function BottomNavBar() {
  const navItems: NavItem[] = [
    {
      icon: <HomeIcon color="#16A34A" size={24} />,
      label: "Home",
      onPress: () => console.log("Home pressed"),
    },
    {
      icon: <MessageSquareIcon color="#16A34A" size={24} />,
      label: "Push Wall",
      onPress: () => console.log("Push Wall pressed"),
    },
    {
      icon: <PlusCircleIcon color="#16A34A" size={32} />,
      label: "Post",
      onPress: () => console.log("Post pressed"),
    },
    {
      icon: <LayoutGridIcon color="#16A34A" size={24} />,
      label: "Categories",
      onPress: () => console.log("Categories pressed"),
    },
    {
      icon: <UserIcon color="#16A34A" size={24} />,
      label: "Profile",
      onPress: () => console.log("Profile pressed"),
    },
  ];

  return (
    <View className="flex-row justify-between items-center px-6 py-2 bg-white border-t border-gray-200">
      {navItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={item.onPress}
          className="items-center"
        >
          <View className={`mb-1 ${item.label === 'Post' ? 'mt-[-20]' : ''}`}>
            {item.icon}
          </View>
          <Text className="text-xs text-gray-600">{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
} 