import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/auth';
import * as selectors from '../store';
import { resetCleaner } from '../store/cleaners';
import { AppTextBold } from '../components/ui/AppTextBold';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { AppScreen } from '../components/ui/AppScreen';
import { AppText } from '../components/ui/AppText';

export const UserProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectors.getCurrentUser);

  const logoutHandler = useCallback(() => {
    navigation.navigate('Main');
    dispatch(resetCleaner());
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    navigation.setParams({ logoutHandler });
  }, [logoutHandler])

  if(!user) {
    return null;
  }

  return (
    <AppScreen>
      <AppTextBold style={styles.header}>Profile Info</AppTextBold>
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

UserProfileScreen.navigationOptions = ({ navigation }) => {
  const logoutHandler = navigation.getParam('logoutHandler');
  return {
    headerTitle: 'User Profile',
    headerLeft: null,
    headerRight: (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title='Logout' iconName='logout' onPress={logoutHandler}/>
      </HeaderButtons>
    ),
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title='Menu' iconName='menu' onPress={() => navigation.toggleDrawer()}/>
      </HeaderButtons>
    ),
  };
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
