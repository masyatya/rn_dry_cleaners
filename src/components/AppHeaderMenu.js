import React from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useNavigation } from '@react-navigation/native';
import { AppHeaderIcon } from './AppHeaderIcon';
import { DrawerActions } from '@react-navigation/native';

export const AppHeaderMenu = () => {
  const navigation = useNavigation();
  
  return (
    <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
      <Item title='Menu' iconName='menu' onPress={() => {
        navigation.dispatch(DrawerActions.toggleDrawer());
      }}/>
    </HeaderButtons>
  );
}
