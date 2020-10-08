import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import * as selectors from '../store';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { AppScreenList } from '../components/ui/AppScreenList';
import { AppTextBold } from '../components/ui/AppTextBold';
import { OrderAdmin } from '../components/OrderAdmin';

export const OrdersAdminScreen = () => {
  const user = useSelector(selectors.getCurrentUser);
  const orders = useSelector(selectors.getOrders);

  let content = (
    <FlatList 
      data={orders}
      renderItem={({ item }) => (
        <OrderAdmin order={item} />
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

OrdersAdminScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Admin Profile',
    headerLeft: null,
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title='Menu' iconName='menu' onPress={() => navigation.toggleDrawer()}/>
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
  },
});
