import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

// 图片处理相关工具函数
export const imageUtils = {
  // 检查并请求相册权限
  checkMediaPermissions: async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        return {
          granted: false,
          error: '需要访问相册权限才能选择图片'
        };
      }
    }
    return { granted: true };
  },

  // 压缩图片
  compressImage: async (uri) => {
    try {
      const manipResult = await ImagePicker.manipulateAsync(
        uri,
        [{ resize: { width: 1080 } }],
        { compress: 0.8, format: ImagePicker.SaveFormat.JPEG }
      );
      return manipResult.uri;
    } catch (error) {
      console.error('Error compressing image:', error);
      return uri;
    }
  },

  // 验证图片格式
  validateImage: (uri) => {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const extension = uri.toLowerCase().split('.').pop();
    return validExtensions.includes(`.${extension}`);
  }
};

// 帖子内容验证
export const postValidation = {
  // 验证标题
  validateTitle: (title) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return { isValid: false, error: '标题不能为空' };
    }
    if (trimmedTitle.length < 5) {
      return { isValid: false, error: '标题至少需要5个字符' };
    }
    if (trimmedTitle.length > 100) {
      return { isValid: false, error: '标题不能超过100个字符' };
    }
    return { isValid: true };
  },

  // 验证内容
  validateContent: (content) => {
    const trimmedContent = content.trim();
    if (!trimmedContent) {
      return { isValid: false, error: '内容不能为空' };
    }
    if (trimmedContent.length < 10) {
      return { isValid: false, error: '内容至少需要10个字符' };
    }
    if (trimmedContent.length > 10000) {
      return { isValid: false, error: '内容不能超过10000个字符' };
    }
    return { isValid: true };
  }
};

// 格式化帖子数据
export const formatPostData = (data) => {
  return {
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: data.tags || [],
    status: 'published'
  };
}; 