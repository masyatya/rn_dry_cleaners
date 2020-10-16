import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../store';
import { confirmOrder } from '../store/auth';
import { setBalance } from '../store/auth';
import { AppScreen } from '../components/ui/AppScreen';
import { AppTextBold } from '../components/ui/AppTextBold';
import { THEME } from '../theme';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AppText } from '../components/ui/AppText';
import { AppButton } from '../components/ui/AppButton';

export const FormOrderScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [ordered, setOrdered] = useState(false);
  const balance = useSelector(selectors.getBalance);
  const order = useSelector(selectors.getOrder);

  const orderHandler = () => {
    setOrdered(true);
    setTimeout(() => {
      navigation.navigate('UserProfile', { screen: 'UserHome' });
      dispatch(setBalance(balance - order.price));
      dispatch(confirmOrder(order));
      setOrdered(false);
    }, 100);
  }

  return (
    <AppScreen>
      <AppTextBold style={styles.heading}>
        Form An Order
      </AppTextBold>
      <View style={styles.service}>
        <AppTextBold>Service:</AppTextBold>
        <AppText>{order.title}</AppText>
      </View>
      <View style={styles.service}>
        <AppTextBold>Price:</AppTextBold>
        <AppText>{order.price}</AppText>
      </View>
      <View style={styles.service}>
        <AppTextBold>Account balance:</AppTextBold>
        <AppText>{balance - order.price}</AppText>
      </View>
      {ordered ? (
        <AppButton style={styles.button}>
          <MaterialIcons name="done" size={24} color={THEME.WHITE_COLOR} />
        </AppButton>
      ) : (
        <AppButton style={styles.button} onPress={orderHandler}>
          Order
        </AppButton>
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
  },
  service: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 20,
  }
});
