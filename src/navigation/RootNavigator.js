import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { login } from '../store/slices/userSlice';
import { getData, STORAGE_KEYS } from '../utils/storage';

const RootNavigator = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  useEffect(() => {
    const checkAuth = async () => {
      const userData = await getData(STORAGE_KEYS.USER_DATA);
      const token = await getData(STORAGE_KEYS.AUTH_TOKEN);
      
      if (userData && token) {
        dispatch(login({ user: userData, token }));
      }
    };

    checkAuth();
  }, []);

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator; 