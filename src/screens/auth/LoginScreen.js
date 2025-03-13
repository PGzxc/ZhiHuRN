import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/userSlice';
import { loginUser } from '../../utils/api';
import { storeData, STORAGE_KEYS } from '../../utils/storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('错误', '请填写所有字段');
      return;
    }

    setLoading(true);
    try {
      const userData = await loginUser(email, password);
      await storeData(STORAGE_KEYS.USER_DATA, userData.user);
      await storeData(STORAGE_KEYS.AUTH_TOKEN, userData.token);
      dispatch(login(userData));
    } catch (error) {
      Alert.alert('错误', error.message || '登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>登录知乎</Text>
      
      <TextInput
        style={styles.input}
        placeholder="邮箱"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="密码"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? '登录中...' : '登录'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.registerButtonText}>
          没有账号？立即注册
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#0066ff',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {
    marginTop: 20,
  },
  registerButtonText: {
    color: '#0066ff',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default LoginScreen; 