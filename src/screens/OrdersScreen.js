import React, { useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import * as selectors from '../store';
import { AppScreenList } from '../components/ui/AppScreenList';
import { AppTextBold } from '../components/ui/AppTextBold';
import { OrderUser } from '../components/OrderUser';

export const OrdersScreen = () => {
  const user = useSelector(selectors.getCurrentUser);
  const orders = useSelector(selectors.getUserOrders);

  let content = (
    <FlatList 
      data={orders}
      renderItem={({ item }) => (
        <OrderUser order={item} />
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
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
  },
});
