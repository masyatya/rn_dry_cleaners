import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { THEME } from '../theme';

export const AppHeaderIconMaterial = (props) => (
  <HeaderButton 
    {...props}
    IconComponent={MaterialIcons}
    iconSize={24} 
    color={THEME.WHITE_COLOR} 
  />
);
