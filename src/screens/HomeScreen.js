import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from '../components/PostCard';
import { fetchPosts } from '../utils/api';
import { setPosts, setLoading } from '../store/slices/postsSlice';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(state => state.posts);

  const loadPosts = async () => {
    dispatch(setLoading(true));
    try {
      const data = await fetchPosts();
      dispatch(setPosts(data));
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreatePost')}
      >
        <Ionicons name="add-circle" size={50} color="#0066ff" />
      </TouchableOpacity>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostCard post={item} navigation={navigation} />}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadPosts} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
    backgroundColor: '#fff',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default HomeScreen; 