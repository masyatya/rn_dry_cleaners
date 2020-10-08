import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../components/ui/AppText';
import { THEME } from '../theme';

export const Client = ({ client }) => {
  return (
    <View style={styles.wrapper}>
      <AppText>{client.username}</AppText>
      <AppText>{client.balance}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: THEME.BLACK_COLOR,
    borderStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});