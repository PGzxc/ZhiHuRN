import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice';
import userReducer from './slices/userSlice';
import commentsReducer from './slices/commentsSlice';
import likesReducer from './slices/likesSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    user: userReducer,
    comments: commentsReducer,
    likes: likesReducer,
    search: searchReducer,
  },
}); 