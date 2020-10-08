import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const AppTextInput = ({ 
  style, 
  placeholder,
  maxLength, 
  textContentType,
  secureTextEntry,
  value,
  onChangeText,
  multiline,
  numberOfLines,
  textAlignVertical,
  keyboardType,
  autoCapitalize,
}) => (
  <View>
    <TextInput 
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={{ ...styles.default, ...style }}
      autoCapitalize={autoCapitalize}
      autoCorrect={false}
      maxLength={maxLength}
      textContentType={textContentType}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      numberOfLines={numberOfLines}
      textAlignVertical={textAlignVertical}
      keyboardType={keyboardType}
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
})