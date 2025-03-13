import AsyncStorage from '@react-native-async-storage/async-storage';

// 模拟数据
export const MOCK_POSTS = [
  {
    id: '1',
    author: '张三',
    avatar: 'https://picsum.photos/200',
    description: '前端开发工程师',
    title: 'React Native vs Flutter，哪个更适合跨平台开发？',
    content: '在移动应用开发领域，React Native和Flutter是两个主流的跨平台开发框架。本文将从性能、生态、开发效率等多个维度进行对比分析...',
    image: 'https://picsum.photos/400/300',
    upvotes: 128,
    comments: 32,
  },
  {
    id: '2',
    author: '李四',
    avatar: 'https://picsum.photos/201',
    description: '产品经理',
    title: '如何打造一个成功的产品？',
    content: '产品成功的关键在于解决用户痛点。本文将分享产品经理在产品规划、需求分析、用户研究等方面的经验...',
    upvotes: 256,
    comments: 48,
  },
];

// API 函数
export const fetchPosts = async () => {
  // 模拟API请求
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_POSTS);
    }, 1000);
  });
};

export const storeAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Error storing auth token:', error);
  }
};

export const getAuthToken = async () => {
  try {
    return await AsyncStorage.setItem('authToken');
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

// 认证相关的API函数
export const loginUser = async (email, password) => {
  // 这里应该是实际的API调用，现在用模拟数据
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password') {
        resolve({
          user: {
            id: '1',
            name: '测试用户',
            email: 'test@example.com',
            avatar: 'https://picsum.photos/200',
            bio: '这是一个测试账号',
          },
          token: 'fake-jwt-token',
        });
      } else {
        reject(new Error('邮箱或密码错误'));
      }
    }, 1000);
  });
};

export const registerUser = async (userData) => {
  // 模拟注册API
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        user: {
          id: '2',
          ...userData,
          avatar: 'https://picsum.photos/200',
        },
        token: 'fake-jwt-token',
      });
    }, 1000);
  });
};

export const updateUserProfile = async (userId, updateData) => {
  // 模拟更新用户资料API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...updateData,
      });
    }, 1000);
  });
};

// 获取帖子评论
export const fetchComments = async (postId) => {
  // 模拟 API 请求
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          postId,
          user: {
            id: '1',
            name: '王五',
            avatar: 'https://picsum.photos/202',
          },
          content: '写得很好，观点很独到',
          time: '2小时前',
          likes: 12,
        },
        {
          id: '2',
          postId,
          user: {
            id: '2',
            name: '赵六',
            avatar: 'https://picsum.photos/203',
          },
          content: '同意楼上的观点，确实分析得很透彻',
          time: '1小时前',
          likes: 8,
        },
      ]);
    }, 1000);
  });
};

// 发送评论
export const submitComment = async (postId, content, user) => {
  // 模拟 API 请求
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now().toString(),
        postId,
        user: {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        },
        content,
        time: '刚刚',
        likes: 0,
      });
    }, 500);
  });
};

// 点赞帖子
export const likePost = async (postId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};

// 点赞评论
export const likeComment = async (commentId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};

// 更新帖子点赞数
export const updatePostStats = async (postId, stats) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
};

// 搜索帖子
export const searchPosts = async (query) => {
  // 模拟搜索API
  return new Promise((resolve) => {
    setTimeout(() => {
      // 模拟搜索结果，实际应该调用后端API
      const results = MOCK_POSTS.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 500);
  });
};

// 创建新帖子
export const createPost = async (postData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now().toString(),
        ...postData,
        upvotes: 0,
        comments: 0,
        time: '刚刚',
      });
    }, 1000);
  });
}; 