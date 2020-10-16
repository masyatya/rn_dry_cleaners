import React from 'react';
import { StyleSheet, ScrollView, StatusBar } from 'react-native';

export const AppScreen = ({ children, style }) => (
  <>
    <StatusBar>
    </StatusBar>
    <ScrollView style={[styles.default, style]}>
      {children}
    </ScrollView>
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
