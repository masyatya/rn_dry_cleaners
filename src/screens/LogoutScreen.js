import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../store';
import { resetCleaner } from '../store/cleaners';
import { AppScreen } from '../components/ui/AppScreen';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppText } from '../components/ui/AppText';
import { logout } from '../store/auth';
import { AppButton } from '../components/ui/AppButton';

export const LogoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userType = useSelector(selectors.getUserType);

  const logoutHandler = () => {
    dispatch(logout());
    if(userType === 'user') {
      dispatch(resetCleaner());
    }
    navigation.navigate('Main');
  }

  const stayHandler = () => {
    if(userType === 'admin') {
      navigation.navigate('CreateCleaner');
    } else {
      navigation.navigate('UserProfile');
    }
  }

  return (
    <AppScreen>
      <View style={styles.textContainer}>
        <AppText style={styles.text}>Are you sure you want to</AppText>
        <AppTextBold style={styles.text}>log out?</AppTextBold>
      </View>
      <View style={styles.buttons}>
        <AppButton style={styles.button} onPress={stayHandler}>No</AppButton>
        <AppButton style={styles.button} onPress={logoutHandler}>Yes</AppButton>
      </View>
    </AppScreen>
  )
};

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 26,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    paddingHorizontal: 50,
  }
});
