import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ExploreScreen = ({ navigation }) => {
  const topics = [
    { id: '1', name: '科技', icon: 'hardware-chip' },
    { id: '2', name: '数码', icon: 'phone-portrait' },
    { id: '3', name: '生活', icon: 'cafe' },
    { id: '4', name: '职场', icon: 'briefcase' },
    { id: '5', name: '教育', icon: 'school' },
    { id: '6', name: '文化', icon: 'book' },
  ];

  const hotTopics = [
    '为什么现在年轻人不愿意进工厂？',
    'ChatGPT会取代程序员吗？',
    '如何看待互联网大厂裁员？',
    '2024年值得关注的科技趋势',
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.searchBar}
        onPress={() => navigation.navigate('Search')}
      >
        <Ionicons name="search" size={20} color="#666" />
        <Text style={styles.searchText}>搜索你感兴趣的内容</Text>
      </TouchableOpacity>

      <View style={styles.topicsContainer}>
        {topics.map(topic => (
          <TouchableOpacity key={topic.id} style={styles.topicItem}>
            <Ionicons name={topic.icon} size={24} color="#1890ff" />
            <Text style={styles.topicText}>{topic.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.hotContainer}>
        <Text style={styles.sectionTitle}>热门话题</Text>
        {hotTopics.map((topic, index) => (
          <TouchableOpacity key={index} style={styles.hotItem}>
            <Text style={styles.hotNumber}>{index + 1}</Text>
            <Text style={styles.hotText}>{topic}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  searchText: {
    marginLeft: 8,
    color: '#999',
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  topicItem: {
    width: '33.33%',
    alignItems: 'center',
    padding: 15,
  },
  topicText: {
    marginTop: 8,
    fontSize: 14,
  },
  hotContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  hotItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  hotNumber: {
    width: 24,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff4d4f',
  },
  hotText: {
    flex: 1,
    fontSize: 15,
  },
});

export default ExploreScreen; 