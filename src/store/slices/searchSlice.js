import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchResults: [],
  recentSearches: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    addRecentSearch: (state, action) => {
      const search = action.payload;
      state.recentSearches = [
        search,
        ...state.recentSearches.filter(item => item !== search)
      ].slice(0, 10); // 只保留最近10条搜索记录
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setSearchResults,
  addRecentSearch,
  clearRecentSearches,
  setLoading,
  setError,
} = searchSlice.actions;

export default searchSlice.reducer; 