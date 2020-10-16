import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../store';
import { selectOrder } from '../store/auth'
import { AppScreenList } from '../components/ui/AppScreenList';
import { AppTextBold } from '../components/ui/AppTextBold';
import { OrderAdmin } from '../components/OrderAdmin';

export const OrdersAdminScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectors.getCurrentUser);
  const orders = useSelector(selectors.getOrders);

  const orderInfoHandler = (id, username) => {
    dispatch(selectOrder(id, username));
    navigation.navigate('AdminOrderInfo');
  }

  let content = (
    <FlatList 
      data={orders}
      renderItem={({ item }) => (
        <OrderAdmin 
          order={item} 
          onPress={orderInfoHandler}
        />
      )}
      keyExtractor={(item, index) => item.title + index}
    />
  );

  if(!user) {
    return null;
  }

  if(!orders.length) {
    content = (
      <AppTextBold>No orders yet!</AppTextBold>
    )
  }

  return (
    <AppScreenList>
      <AppTextBold style={styles.heading}>Orders</AppTextBold>
      {content}
    </AppScreenList>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
  },
});
