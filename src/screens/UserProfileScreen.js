import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../store';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppScreen } from '../components/ui/AppScreen';
import { AppText } from '../components/ui/AppText';

export const UserProfileScreen = () => {
  const user = useSelector(selectors.getCurrentUser);

  if(!user) {
    return null;
  }

  return (
    <AppScreen>
      <AppTextBold style={styles.header}>Profile Info</AppTextBold>
      <View style={styles.block}>
        <AppTextBold style={styles.prop}>Full Name:</AppTextBold>
        <AppText>{user.fullname}</AppText>
      </View>
      <View style={styles.block}>
        <AppTextBold style={styles.prop}>Username:</AppTextBold>
        <AppText>{user.username}</AppText>
      </View>
      <View style={styles.block}>
        <AppTextBold style={styles.prop}>Password:</AppTextBold>
        <AppText>{user.password}</AppText>
      </View>
      <View style={styles.block}>
        <AppTextBold style={styles.prop}>ID:</AppTextBold>
        <AppText>{user.id}</AppText>
      </View>
      <View style={styles.block}>
        <AppTextBold style={styles.balance}>Balance:</AppTextBold>
        <AppText style={styles.balance}>{user.balance}</AppText>
      </View>
    </AppScreen>
  )
};

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    textAlign: 'center',
  },
  block: {
    fontSize: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  prop: {
    marginRight: 10,
  },
  balance: {
    fontSize: 24,
    marginRight: 10,
  }
});
