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
import { registerUser } from '../../utils/api';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('错误', '请填写所有字段');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('错误', '两次输入的密码不一致');
      return;
    }

    setLoading(true);
    try {
      const userData = await registerUser({ name, email, password });
      dispatch(login(userData));
    } catch (error) {
      Alert.alert('错误', error.message || '注册失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>注册知乎</Text>
      
      <TextInput
        style={styles.input}
        placeholder="用户名"
        value={name}
        onChangeText={setName}
      />

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

      <TextInput
        style={styles.input}
        placeholder="确认密码"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.registerButtonText}>
          {loading ? '注册中...' : '注册'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.loginButtonText}>
          已有账号？立即登录
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
  registerButton: {
    backgroundColor: '#0066ff',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  registerButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    marginTop: 20,
  },
  loginButtonText: {
    color: '#0066ff',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default RegisterScreen; 