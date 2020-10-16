import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const AppTextInput = ({ style, ...props }) => (
  <View>
    <TextInput 
      style={[styles.default, props.style]}
      autoCorrect={false}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  default: {
    marginVertical: 5,
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderColor: THEME.BLACK_COLOR,
    borderStyle: 'solid',
    borderRadius: 5,
  }
});
