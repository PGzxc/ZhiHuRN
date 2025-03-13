import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { addPost, setLoading } from '../store/slices/postsSlice';
import { createPost } from '../utils/api';
import { imageUtils, postValidation, formatPostData } from '../utils/postUtils';

const CreatePostScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);

  const pickImage = async () => {
    const { granted, error } = await imageUtils.checkMediaPermissions();
    if (!granted) {
      Alert.alert('权限错误', error);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      if (!imageUtils.validateImage(uri)) {
        Alert.alert('错误', '不支持的图片格式');
        return;
      }
      const compressedUri = await imageUtils.compressImage(uri);
      setImage(compressedUri);
    }
  };

  const handleSubmit = async () => {
    const titleValidation = postValidation.validateTitle(title);
    if (!titleValidation.isValid) {
      Alert.alert('错误', titleValidation.error);
      return;
    }

    const contentValidation = postValidation.validateContent(content);
    if (!contentValidation.isValid) {
      Alert.alert('错误', contentValidation.error);
      return;
    }

    dispatch(setLoading(true));
    try {
      const postData = formatPostData({
        title: title.trim(),
        content: content.trim(),
        image,
        author: currentUser.name,
        avatar: currentUser.avatar,
        description: currentUser.bio || '用户',
      });
      const newPost = await createPost(postData);
      dispatch(addPost(newPost));
      navigation.goBack();
    } catch (error) {
      Alert.alert('错误', '发布失败，请重试');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView}>
        <TextInput
          style={styles.titleInput}
          placeholder="请输入标题（必填）"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
        />

        <TextInput
          style={styles.contentInput}
          placeholder="请输入正文内容（必填）"
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />

        {image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity 
              style={styles.removeImage}
              onPress={() => setImage(null)}
            >
              <Ionicons name="close-circle" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Ionicons name="image-outline" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.submitButton,
            (!title.trim() || !content.trim()) && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!title.trim() || !content.trim()}
        >
          <Text style={styles.submitButtonText}>发布</Text>
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
    padding: 15,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 15,
  },
  contentInput: {
    fontSize: 16,
    lineHeight: 24,
    minHeight: 200,
  },
  imageContainer: {
    marginTop: 15,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  removeImage: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
  },
  imageButton: {
    padding: 10,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#0066ff',
    padding: 12,
    borderRadius: 20,
    marginLeft: 10,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreatePostScreen; 