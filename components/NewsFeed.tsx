import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import kyInstance from '../lib/ky'; // If you have this, otherwise we'll use fetch
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const windowWidth = Dimensions.get('window').width;

type Post = {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  user: {
    displayName: string;
    avatarUrl: string;
  };
  attachments: Array<{ url: string }>;
  _count: {
    comments: number;
    likes: number;
  };
};

type RootStackParamList = {
  Home: undefined;
  PostDetail: { postId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function NewsFeed() {
  const navigation = useNavigation<NavigationProp>();
  const [refreshing, setRefreshing] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetching, status, refetch } = useInfiniteQuery({
    queryKey: ['mobile-news-feed'],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(`https://a-updates-alpha.vercel.app/api/posts/latest`, {
        headers: {
          'Accept': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const handlePostPress = (postId: string) => {
    navigation.navigate('PostDetail', { postId });
  };

  const renderPost = (post: Post) => (
    <TouchableOpacity 
      key={post.id} 
      className="bg-white rounded-xl mb-4 overflow-hidden"
      onPress={() => handlePostPress(post.id)}
    >
      {post.attachments?.[0]?.url && (
        <Image
          source={{ uri: post.attachments[0].url }}
          className="w-full h-48"
          resizeMode="cover"
        />
      )}
      
      <View className="p-4">
        <View className="flex-row items-center mb-2">
          <View className="h-10 w-10 rounded-full bg-gray-100 justify-center items-center mr-3">
            <Text className="text-gray-500">🎤</Text>
          </View>
          <View className="flex-1">
            <Text className="text-green-600 font-medium">{post.user.displayName}</Text>
            <Text className="text-gray-500 text-sm">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </Text>
          </View>
          <View className="bg-green-500 rounded-full px-3 py-1">
            <Text className="text-white text-xs font-medium uppercase">
              {post.category || 'SPORTS'}
            </Text>
          </View>
        </View>

        <Text className="text-navy-900 text-xl font-bold mb-2">
          {post.title}
        </Text>
        
        <Text className="text-gray-600 mb-3" numberOfLines={2}>
          {post.description}
        </Text>

        <View className="flex-row items-center">
          <View className="flex-row items-center mr-4">
            <Text className="mr-1">💬</Text>
            <Text className="text-gray-600">{post._count.comments}</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="mr-1">❤️</Text>
            <Text className="text-gray-600">{post._count.likes}</Text>
          </View>
          <View className="flex-1 items-end">
            <Text className="text-green-600">Read more</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (status === 'pending') {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#16A34A" />
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View className="p-4 items-center">
        <Text className="text-red-500">Failed to load news articles.</Text>
      </View>
    );
  }

  const allPosts = data?.pages.flatMap((page) => page.posts) || [];

  return (
    <ScrollView 
      className="flex-1"
      contentContainerStyle={{ padding: 16 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onScroll={({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        
        if (isCloseToBottom && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      }}
      scrollEventThrottle={400}
    >
      <Text className="text-3xl font-bold text-green-600 mb-6">
        Latest Posts
      </Text>
      
      {allPosts.map((post) => (
        <TouchableOpacity 
          key={post.id}
          className="bg-white rounded-xl mb-4 overflow-hidden"
          onPress={() => navigation.navigate('PostDetail', { postId: post.id })}
        >
          {renderPost(post)}
        </TouchableOpacity>
      ))}

      {isFetching && (
        <ActivityIndicator className="py-4" size="small" color="#16A34A" />
      )}
    </ScrollView>
  );
} 