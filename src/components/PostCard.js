import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { togglePostLike } from '../store/slices/likesSlice';
import { likePost, updatePostStats } from '../utils/api';

const PostCard = ({ post, navigation }) => {
  const dispatch = useDispatch();
  const { likedPosts } = useSelector(state => state.likes);

  const handleLike = async (event) => {
    event.stopPropagation();
    try {
      await likePost(post.id);
      dispatch(togglePostLike({ postId: post.id }));
      const newUpvotes = likedPosts[post.id] ? post.upvotes - 1 : post.upvotes + 1;
      await updatePostStats(post.id, { upvotes: newUpvotes });
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => navigation.navigate('PostDetail', { post })}
    >
      <View style={styles.header}>
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.name}>{post.author}</Text>
          <Text style={styles.description}>{post.description}</Text>
        </View>
      </View>
      
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content} numberOfLines={3}>
        {post.content}
      </Text>
      
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.actionButton, likedPosts[post.id] && styles.actionButtonActive]}
          onPress={handleLike}
        >
          <Ionicons 
            name={likedPosts[post.id] ? "arrow-up" : "arrow-up-outline"}
            size={20} 
            color={likedPosts[post.id] ? "#0066ff" : "#666"}
          />
          <Text style={styles.actionText}>{post.upvotes}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#666" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-social-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  headerText: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
  },
  description: {
    fontSize: 13,
    color: '#666',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  content: {
    fontSize: 15,
    color: '#333',
    lineHeight: 21,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 4,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  actionText: {
    marginLeft: 5,
    color: '#666',
  },
  actionButtonActive: {
    opacity: 1,
  },
});

export default PostCard; 