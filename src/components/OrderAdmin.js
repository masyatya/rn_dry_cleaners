import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../components/ui/AppText';
import { AppTextBold } from './ui/AppTextBold';
import { THEME } from '../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const OrderAdmin = ({ order, onPress }) => {
  return (
    <TouchableOpacity 
      onPress={() => onPress(order.id, order.username)}
      style={styles.wrapper}
      activeOpacity={0.8}
    >
      <View style={styles.text}>
        <AppText style={styles.title}>{order.title}</AppText>
        <AppText>{order.price}</AppText>
      </View>
      <AppTextBold>{order.status}</AppTextBold>
    </TouchableOpacity>
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
