import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import * as selectors from '../store';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { AppHeaderIconMaterial } from '../components/AppHeaderIconMaterial';
import { AppScreenList } from '../components/ui/AppScreenList';
import { AppTextBold } from '../components/ui/AppTextBold';
import { OrderUser } from '../components/OrderUser';
import { THEME } from '../theme';

export const OrdersScreen = ({ navigation }) => {
  const user = useSelector(selectors.getCurrentUser);
  const balance = useSelector(selectors.getBalance);
  const orders = useSelector(selectors.getUserOrders);

  useEffect(() => {
    navigation.setParams({ balance });
  }, [balance]);

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

OrdersScreen.navigationOptions = ({ navigation }) => {
  const balance = navigation.getParam('balance');

  return {
    headerTitle: 'User Profile',
    headerLeft: null,
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title='Menu' iconName='menu' onPress={() => navigation.toggleDrawer()}/>
      </HeaderButtons>
    ),
    headerRight: () => (
     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <AppTextBold style={{ color: THEME.WHITE_COLOR, }}>{balance}</AppTextBold>
      <HeaderButtons HeaderButtonComponent={AppHeaderIconMaterial}>
        <Item title='Balance' iconName='account-balance'/>
      </HeaderButtons>
     </View>
    )
  };
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 20,
  },
});
