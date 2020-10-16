import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

export const AppScreenList = ({ children, style }) => (
  <>
    <StatusBar></StatusBar>
    <View style={[styles.default, style]}>{children}</View>
  </>
);

const styles = StyleSheet.create({
  default: {
    marginVertical: 20,
    paddingBottom: 20,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
});
