import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../components/ui/AppText';
import { AppTextBold } from './ui/AppTextBold';
import { THEME } from '../theme';

export const OrderAdmin = ({ order }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.text}>
        <AppText style={styles.title}>{order.title}</AppText>
        <AppText>{order.price}</AppText>
      </View>
      <AppTextBold>{order.username}</AppTextBold>
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
  },
  text: {
    flexDirection: 'row',
  },
  title: {
    marginRight: 5,
  }
});
