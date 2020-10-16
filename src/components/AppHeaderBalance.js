import React from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIconMaterial } from './AppHeaderIconMaterial';
import { THEME } from '../theme';
import * as selectors from '../store';
import { AppTextBold } from './ui/AppTextBold';

export const AppHeaderBalance = () => {
  const balance = useSelector(selectors.getBalance);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10, }}>
      <HeaderButtons HeaderButtonComponent={AppHeaderIconMaterial}>
        <Item title='Balance' iconName='account-balance'/>
      </HeaderButtons>
      <AppTextBold style={{ color: THEME.WHITE_COLOR, }}>{balance}</AppTextBold>
    </View>
  );
}
