import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../store';
import { setUserForRecover } from '../store/auth';
import { AppButton } from '../components/ui/AppButton';
import { AppScreen } from '../components/ui/AppScreen';
import { AppTextInput } from '../components/ui/AppTextInput';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppText } from '../components/ui/AppText';

export const ForgotPasswordScreen = () => {
  const dispatch = useDispatch();
  const [attempt, setAttempt] = useState(false);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const currentUser = useSelector(selectors.getCurrentUser);

  const recoverHandler = () => {
    if(!username.trim()) {
      Alert.alert('Error', 'Enter username');
      return;
    }
    if(!fullname) {
      Alert.alert('Error', 'Enter Full Name');
      return;
    }
    setAttempt(true);
    dispatch(setUserForRecover({ 
      username: username.trim(), 
      fullname: fullname.trim(),
    }));
  }

  if(currentUser) {
    return null;
  }

  return (
    <AppScreen>
      <AppTextBold style={styles.header}>Pasword recovery</AppTextBold>
      <AppTextInput 
        value={username}
        placeholder={'Username'}
        onChangeText={setUsername}
        autoCapitalize='none'
      />
      <AppTextInput 
        value={fullname}
        placeholder={'Full Name'}
        onChangeText={setFullname}
        autoCapitalize='words'
      />
      {currentUser 
        || !attempt 
        || <AppText style={styles.warning}>Invalid username or Full Name</AppText>
      }
      <AppButton 
        style={styles.button}
        onPress={recoverHandler}
      >
        Recover password
      </AppButton>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
  warning: {
    marginLeft: 20,
    fontSize: 14,
    color: 'red',
  }
});