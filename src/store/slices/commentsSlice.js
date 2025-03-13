import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: {},  // 使用对象存储不同帖子的评论，key 为帖子 id
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      const { postId, comments } = action.payload;
      state.comments[postId] = comments;
    },
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      if (!state.comments[postId]) {
        state.comments[postId] = [];
      }
      state.comments[postId].unshift(comment);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setComments, addComment, setLoading, setError } = commentsSlice.actions;
export default commentsSlice.reducer; 