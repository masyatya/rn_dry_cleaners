import React from 'react';
import { Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { AppHeaderIcon } from './AppHeaderIcon';
import { logout } from '../store/auth'

export const AppHeaderLogout = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logoutHandler = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          dispatch(logout());
          navigation.navigate('Main');
        } }
      ],
    );
  }

  return (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item title='Logout' iconName='logout' onPress={logoutHandler}/>
    </HeaderButtons>
  );
}
