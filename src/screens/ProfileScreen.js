import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/userSlice';
import { removeData, STORAGE_KEYS } from '../utils/storage';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);

  const handleLogout = async () => {
    await removeData(STORAGE_KEYS.AUTH_TOKEN);
    await removeData(STORAGE_KEYS.USER_DATA);
    dispatch(logout());
  };

  const userStats = [
    { label: '关注', value: '138' },
    { label: '粉丝', value: '256' },
    { label: '获赞', value: '1,280' },
  ];

  const menuItems = [
    { icon: 'star-outline', label: '我的收藏' },
    { icon: 'create-outline', label: '我的回答' },
    { icon: 'help-circle-outline', label: '我的提问' },
    { icon: 'document-text-outline', label: '我的文章' },
    { icon: 'settings-outline', label: '设置' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: currentUser?.avatar || 'https://picsum.photos/200' }}
          style={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.username}>{currentUser?.name || '用户名'}</Text>
          <Text style={styles.bio}>{currentUser?.bio || '这个人很懒，什么都没有写'}</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>编辑资料</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        {userStats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.menuItem}
            onPress={() => item.label === '设置' && handleLogout()}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name={item.icon} size={22} color="#666" />
              <Text style={styles.menuItemText}>{item.label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    marginTop: 12,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#1890ff',
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: '#1890ff',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginTop: 10,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
  },
});

export default ProfileScreen; 