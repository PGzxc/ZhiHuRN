import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateProfile: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
});

export const { login, logout, setLoading, setError, updateProfile } = userSlice.actions;
export default userSlice.reducer; 