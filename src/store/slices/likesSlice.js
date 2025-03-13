import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likedPosts: {},  // 存储用户点赞的帖子，key 为帖子 id
  likedComments: {},  // 存储用户点赞的评论，key 为评论 id
  loading: false,
  error: null,
};

const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    togglePostLike: (state, action) => {
      const { postId } = action.payload;
      state.likedPosts[postId] = !state.likedPosts[postId];
    },
    toggleCommentLike: (state, action) => {
      const { commentId } = action.payload;
      state.likedComments[commentId] = !state.likedComments[commentId];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { togglePostLike, toggleCommentLike, setLoading, setError } = likesSlice.actions;
export default likesSlice.reducer; 