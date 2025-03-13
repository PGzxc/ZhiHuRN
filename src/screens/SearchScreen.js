import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchResults, addRecentSearch, clearRecentSearches, setLoading } from '../store/slices/searchSlice';
import { searchPosts } from '../utils/api';
import PostCard from '../components/PostCard';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { searchResults, recentSearches, loading } = useSelector(state => state.search);

  const handleSearch = async () => {
    if (!query.trim()) return;

    dispatch(setLoading(true));
    try {
      const results = await searchPosts(query.trim());
      dispatch(setSearchResults(results));
      dispatch(addRecentSearch(query.trim()));
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleClearHistory = () => {
    dispatch(clearRecentSearches());
  };

  const renderRecentSearches = () => (
    <View style={styles.recentSearches}>
      <View style={styles.recentHeader}>
        <Text style={styles.recentTitle}>最近搜索</Text>
        {recentSearches.length > 0 && (
          <TouchableOpacity onPress={handleClearHistory}>
            <Text style={styles.clearText}>清除</Text>
          </TouchableOpacity>
        )}
      </View>
      {recentSearches.map((search, index) => (
        <TouchableOpacity
          key={index}
          style={styles.recentItem}
          onPress={() => {
            setQuery(search);
            handleSearch();
          }}
        >
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.recentText}>{search}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="搜索问题、话题或用户"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoFocus
        />
        {query ? (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setQuery('')}
          >
            <Ionicons name="close-circle" size={18} color="#999" />
          </TouchableOpacity>
        ) : null}
      </View>

      {loading ? (
        <ActivityIndicator style={styles.loading} color="#0066ff" />
      ) : searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={({ item }) => (
            <PostCard post={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        renderRecentSearches()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  input: {
    flex: 1,
    height: 36,
    backgroundColor: '#f5f5f5',
    borderRadius: 18,
    paddingHorizontal: 15,
    fontSize: 15,
  },
  clearButton: {
    padding: 8,
    marginLeft: -35,
  },
  loading: {
    marginTop: 20,
  },
  recentSearches: {
    padding: 15,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  clearText: {
    color: '#666',
    fontSize: 14,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  recentText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#333',
  },
});

export default SearchScreen; 