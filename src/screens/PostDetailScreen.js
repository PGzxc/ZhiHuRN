import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Share,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setComments, addComment, setLoading } from '../store/slices/commentsSlice';
import { togglePostLike, toggleCommentLike } from '../store/slices/likesSlice';
import { fetchComments, submitComment, likePost, likeComment, updatePostStats } from '../utils/api';

const PostDetailScreen = ({ route }) => {
  const { post } = route.params;
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const { comments: allComments, loading } = useSelector(state => state.comments);
  const { likedPosts, likedComments } = useSelector(state => state.likes);
  const comments = allComments[post.id] || [];

  useEffect(() => {
    const loadComments = async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchComments(post.id);
        dispatch(setComments({ postId: post.id, comments: data }));
      } catch (error) {
        console.error('Error loading comments:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadComments();
  }, [post.id]);

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;
    try {
      const newComment = await submitComment(post.id, comment.trim(), currentUser);
      dispatch(addComment({ postId: post.id, comment: newComment }));
      setComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleLikePost = async () => {
    try {
      await likePost(post.id);
      dispatch(togglePostLike({ postId: post.id }));
      const newUpvotes = likedPosts[post.id] ? post.upvotes - 1 : post.upvotes + 1;
      await updatePostStats(post.id, { upvotes: newUpvotes });
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      await likeComment(commentId);
      dispatch(toggleCommentLike({ commentId }));
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `${post.title}\n\n${post.content}\n\n分享自知乎`,
        title: post.title,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      }
    } catch (error) {
      Alert.alert('错误', '分享失败');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.authorInfo}>
            <Image source={{ uri: post.avatar }} style={styles.avatar} />
            <View style={styles.authorText}>
              <Text style={styles.authorName}>{post.author}</Text>
              <Text style={styles.authorDesc}>{post.description}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>关注</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.contentText}>{post.content}</Text>
          {post.image && (
            <Image source={{ uri: post.image }} style={styles.contentImage} />
          )}
        </View>

        <View style={styles.stats}>
          <TouchableOpacity 
            style={[styles.statItem, likedPosts[post.id] && styles.statItemActive]}
            onPress={handleLikePost}
          >
            <Ionicons 
              name={likedPosts[post.id] ? "arrow-up" : "arrow-up-outline"} 
              size={20} 
              color={likedPosts[post.id] ? "#0066ff" : "#666"} 
            />
            <Text style={styles.statText}>{post.upvotes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statItem}>
            <Ionicons name="chatbubble-outline" size={20} color="#666" />
            <Text style={styles.statText}>{post.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statItem} onPress={handleShare}>
            <Ionicons name="share-social-outline" size={20} color="#666" />
            <Text style={styles.statText}>分享</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>
            评论 ({comments.length})
            {loading && ' (加载中...)'}
          </Text>
          {comments.map(comment => (
            <View key={comment.id} style={styles.commentItem}>
              <Image source={{ uri: comment.user.avatar }} style={styles.commentAvatar} />
              <View style={styles.commentContent}>
                <Text style={styles.commentUser}>{comment.user.name}</Text>
                <Text style={styles.commentText}>{comment.content}</Text>
                <View style={styles.commentFooter}>
                  <Text style={styles.commentTime}>{comment.time}</Text>
                  <TouchableOpacity 
                    style={[styles.likeButton, likedComments[comment.id] && styles.likeButtonActive]}
                    onPress={() => handleLikeComment(comment.id)}
                  >
                    <Ionicons 
                      name={likedComments[comment.id] ? "heart" : "heart-outline"}
                      size={16} 
                      color={likedComments[comment.id] ? "#ff4d4f" : "#666"}
                    />
                    <Text style={styles.likeCount}>{comment.likes}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.commentInput}>
        <TextInput
          style={styles.input}
          placeholder="写下你的评论..."
          value={comment}
          onChangeText={setComment}
          multiline
          maxLength={1000}
          returnKeyType="send"
          onSubmitEditing={handleSubmitComment}
        />
        <TouchableOpacity 
          style={[
            styles.submitButton,
            !comment.trim() && styles.submitButtonDisabled
          ]}
          onPress={handleSubmitComment}
          disabled={!comment.trim()}
        >
          <Text style={styles.submitButtonText}>发送</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorText: {
    marginLeft: 10,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
  },
  authorDesc: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  followButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 3,
    backgroundColor: '#0066ff',
  },
  followButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  contentImage: {
    width: '100%',
    height: 200,
    marginTop: 15,
    borderRadius: 8,
  },
  stats: {
    flexDirection: 'row',
    padding: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statItemActive: {
    opacity: 1,
  },
  statText: {
    marginLeft: 5,
    color: '#666',
  },
  commentsSection: {
    padding: 15,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  commentContent: {
    flex: 1,
    marginLeft: 10,
  },
  commentUser: {
    fontSize: 14,
    fontWeight: '500',
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  commentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  commentTime: {
    fontSize: 12,
    color: '#999',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  likeButtonActive: {
    opacity: 1,
  },
  likeCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  commentInput: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    fontSize: 14,
    maxHeight: 100,
  },
  submitButton: {
    backgroundColor: '#0066ff',
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default PostDetailScreen; 