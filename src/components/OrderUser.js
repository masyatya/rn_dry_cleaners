import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateOrderStore } from '../store/auth';
import { AppText } from './ui/AppText';
import { THEME } from '../theme';
import { AppButton } from './ui/AppButton';
import { AppTextBold } from './ui/AppTextBold';

export const OrderUser = ({ order }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState('');

  const completeHandler = () => {
    dispatch(updateOrderStore({ ...order, status: 'completed' }));
  }

  useEffect(() => {
    switch(order.status) {
      case 'new':
        setStatus('In processing');
        break;
      case 'ready':
        setStatus('Order is ready');
        break;
      case 'completed':
        setStatus('Completed');
        break;
      case 'return':
        setStatus('Return');
        break;
      default:
        setStatus('In processing');
    }
  }, [order]);

  return (
    <View>
      <View style={styles.order}>
        <View style={styles.wrapper}>
          <AppText>{order.title}: {order.price}</AppText>
          <AppTextBold>{status}</AppTextBold>
        </View>
        {order.status === 'return' && (
          <View style={styles.reason}>
            <AppTextBold>Reason for return:</AppTextBold>
            <AppText>{order.reason}</AppText>
          </View>
        )}
      </View>
      {order.status === 'ready' && (
        <AppButton onPress={completeHandler} style={styles.button}>
          Complete
        </AppButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  order: {
    borderWidth: 2,
    borderColor: THEME.BLACK_COLOR,
    borderStyle: 'solid',
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  wrapper: {

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginBottom: 10,
  },
  reason: {
  }
});
