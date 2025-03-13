import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import CreatePostScreen from '../screens/CreatePostScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{
          title: '帖子详情',
          headerBackTitle: '返回',
        }}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          title: '发布帖子',
          headerBackTitle: '返回',
        }}
      />
    </Stack.Navigator>
  );
};

const ExploreStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ExploreScreen" 
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: '搜索',
          headerBackTitle: '返回',
        }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case '首页':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case '发现':
              iconName = focused ? 'compass' : 'compass-outline';
              break;
            case '通知':
              iconName = focused ? 'notifications' : 'notifications-outline';
              break;
            case '我的':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0066FF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="首页" component={HomeStack} />
      <Tab.Screen name="发现" component={ExploreStack} />
      <Tab.Screen name="通知" component={NotificationScreen} />
      <Tab.Screen name="我的" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator; 