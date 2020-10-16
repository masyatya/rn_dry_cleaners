import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AppButton } from '../components/ui/AppButton';
import { AppScreen } from '../components/ui/AppScreen';
import { THEME } from '../theme';

export const MainScreen = ({ navigation }) => {
  const goToSignIn = () => {
    navigation.navigate('SignIn');
  }

  const goToSignUp = () => {
    navigation.navigate('SignUp');
  }

  return (
    <AppScreen>
      <Text style={styles.text}>Welcome to Dry Cleaning App!</Text>
      <View style={styles.buttons}>
        <AppButton onPress={goToSignIn}>Sign in</AppButton>
        <AppButton onPress={goToSignUp}>Sign up</AppButton>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    marginBottom: 35,
    fontSize: 26,
    color: THEME.BLACK_COLOR,
  }
});
