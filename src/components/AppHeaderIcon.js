import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { THEME } from '../theme';

export const AppHeaderIcon = (props) => (
  <HeaderButton 
    {...props}
    IconComponent={MaterialCommunityIcons}
    iconSize={24} 
    color={THEME.WHITE_COLOR} 
  />
)