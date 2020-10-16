import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons'; 
import { addUser } from '../store/auth';
import * as selectors from '../store';
import { AppScreen } from '../components/ui/AppScreen';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppTextInput } from '../components/ui/AppTextInput';
import { RadioButton } from 'react-native-paper';
import { THEME } from '../theme';
import { AppButton } from '../components/ui/AppButton';

export const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [registered, setRegistered] = useState(false);
  const [userType, setUserType] = useState('user');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const users = useSelector(selectors.getUsers);

  const addUserHandler = () => {
    if(username.trim() && password && fullname.trim()) {
      if(users.some(u => u.username === username)) {
        Alert.alert('Error', 'Username already exist');
        return;
      }
      if(userType === 'admin') {
        dispatch(addUser({
          id: Date.now().toString(),
          type: userType,
          username,
          password,
          fullname,
        }));
      } else {
        dispatch(addUser({
          id: Date.now().toString(),
          type: userType,
          username,
          password,
          fullname,
          balance: Math.floor(Math.random() * (500 - 100 + 1) + 100),
        }));
      }
      
      setRegistered(true);
      setTimeout(() => {
        navigation.navigate('Main');
      }, 500);
    } else {
      if(!username.trim()) {
        Alert.alert('Error', 'Enter username');
      }
      if(!password) {
        Alert.alert('Error', 'Enter password');
      }
      if(!fullname.trim()) {
        Alert.alert('Error', 'Enter full name');
      }
    }
  }

  return (
    <AppScreen>
      <AppTextBold style={styles.text}>Registration</AppTextBold>
      <AppTextInput 
        value={username}
        placeholder={'Username'} 
        textContentType='username'
        onChangeText={text => setUsername(text.trim())}
        autoCapitalize='none'
        maxLength={20}
      />
      <AppTextInput 
        value={password}
        placeholder={'Password'}
        textContentType='password'
        secureTextEntry={true}
        onChangeText={setPassword}
        autoCapitalize='none'
        maxLength={20}
      />
      <AppTextInput 
        value={fullname}
        placeholder={'Full Name'}
        onChangeText={setFullname}
        autoCapitalize='words'
        maxLength={20}
      />
      <RadioButton.Item 
        label='User'
        value='user'
        status={userType === 'user' ? 'checked' : 'unchecked'}
        color={THEME.BLACK_COLOR}
        onPress={() => setUserType('user')}
      />
      <RadioButton.Item 
        label='Admin'
        value='admin'
        status={userType === 'admin' ? 'checked' : 'unchecked'}
        color={THEME.BLACK_COLOR}
        uncheckedColor={THEME.GREY_COLOR}
        onPress={() => setUserType('admin')}
      />
      
      {registered ? (
        <AppButton style={styles.button}>
          <MaterialIcons name="done" size={24} color={THEME.WHITE_COLOR} />
        </AppButton>
      ) : (
        <AppButton 
          style={styles.button} 
          onPress={addUserHandler}
        >
          Sign up
        </AppButton>
      )}
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  }
});
