import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons'; 
import { THEME } from '../theme';
import { login } from '../store/auth';
import * as selectors from '../store';
import { AppButton } from '../components/ui/AppButton';
import { AppScreen } from '../components/ui/AppScreen';
import { AppTextInput } from '../components/ui/AppTextInput';

export const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [attempt, setAttempt] = useState('');
  const currentUser = useSelector(selectors.getCurrentUser);

  const loginHandler = async () => {
    await dispatch(login(username, password));
    setAttempt(Date.now());
  }

  useEffect(() => {
    if(currentUser === null && !username && !password) {
      return;
    } else if(currentUser === null) {
      Alert.alert('Error', 'Invalid username or password')
    } else {
      setAttempt('success');
      setTimeout(() => {
        if(currentUser.type === 'admin') {
          navigation.navigate('AdminProfile', { screen: 'CreateCleaner' });
        } else {
          navigation.navigate('UserProfile', { screen: 'UserHome' });
        }
        setUsername('');
        setPassword('');
      }, 200);
    }
  }, [currentUser, attempt])

  return (
    <AppScreen>
      <AppTextInput 
        value={username}
        placeholder={'Username'} 
        textContentType='username'
        onChangeText={text => setUsername(text.trim())}
        autoCapitalize='none'
      />
      <AppTextInput 
        value={password}
        placeholder={'Password'}
        textContentType='password'
        secureTextEntry={true}
        onChangeText={setPassword}
        autoCapitalize='none'
      />
      {attempt === 'success' ? (
        <AppButton style={styles.button}>
          <MaterialIcons name="done" size={24} color={THEME.WHITE_COLOR} />
        </AppButton>
      ) : (
        <AppButton 
          style={styles.button}
          onPress={loginHandler}
        >
          Sign in
        </AppButton>
      )}
      <AppButton 
        style={styles.button_forgot}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        Forgot password
      </AppButton>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    marginBottom: 20,
  }
});