import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const NotificationScreen = () => {
  const notifications = [
    {
      id: '1',
      type: 'like',
      user: '张三',
      avatar: 'https://picsum.photos/200',
      content: '赞了你的回答',
      time: '2小时前',
      postTitle: 'React Native vs Flutter，哪个更适合跨平台开发？',
    },
    {
      id: '2',
      type: 'comment',
      user: '李四',
      avatar: 'https://picsum.photos/201',
      content: '评论了你的回答',
      comment: '说得很有道理，感谢分享！',
      time: '3小时前',
      postTitle: '如何看待前端框架的发展趋势？',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>全部消息</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>赞和收藏</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>评论</Text>
        </TouchableOpacity>
      </View>

      {notifications.map(notification => (
        <TouchableOpacity key={notification.id} style={styles.notificationItem}>
          <Image source={{ uri: notification.avatar }} style={styles.avatar} />
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.username}>{notification.user}</Text>
              <Text style={styles.time}>{notification.time}</Text>
            </View>
            <Text style={styles.action}>{notification.content}</Text>
            {notification.comment && (
              <Text style={styles.comment}>"{notification.comment}"</Text>
            )}
            <Text style={styles.postTitle}>{notification.postTitle}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#1890ff',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#1890ff',
    fontWeight: '500',
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontSize: 15,
    fontWeight: '500',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  action: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  comment: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 4,
  },
  postTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});

export default NotificationScreen; 