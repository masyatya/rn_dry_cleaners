import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, View, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../store';
import { addOrder } from '../store/order';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { AppHeaderIconMaterial } from '../components/AppHeaderIconMaterial';
import { AppScreen } from '../components/ui/AppScreen';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppText } from '../components/ui/AppText';
import { AppButton } from '../components/ui/AppButton';
import { THEME } from '../theme';

export const CleanerInfoScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userType = useSelector(selectors.getUserType);
  const username = useSelector(selectors.getUsername);
  const cleaner = useSelector(selectors.getCleaner);
  const balance = useSelector(selectors.getBalance);

  useEffect(() => {
    navigation.setParams({ userType, balance });
  }, [userType, balance]);

  const orderHandler = (service) => {
    if(service.price > balance) {
      Alert.alert('Error', 'Insufficient funds in your account');
    } else {
      dispatch(addOrder({ ...service, username }));
      navigation.navigate('FormOrder');
    }
  };

  if(!cleaner) {
    return (
      <AppScreen>
        <AppTextBold>Please, select a dry cleaner</AppTextBold>
      </AppScreen>
    )
  };

  return (
    <AppScreen>
      <AppTextBold style={styles.heading}>Cleaner Info</AppTextBold>
      <View style={styles.containerText}>
        <AppTextBold style={styles.title}>{cleaner.title}</AppTextBold>
        <AppText style={styles.description}>{cleaner.description}</AppText>
      </View>
      <Image source={{ uri: cleaner.photo }} style={styles.image}/>
      <View style={styles.service}>
        <View style={styles.serviceText}>
          <AppText style={styles.prop}>{cleaner.serviceFirst.title}:</AppText>
          <AppTextBold style={styles.prop}>{cleaner.serviceFirst.price}</AppTextBold>
        </View>
        <AppButton onPress={() => orderHandler(cleaner.serviceFirst)}>Order</AppButton>
      </View>
      <View style={styles.service}>
        <View style={styles.serviceText}>
          <AppText style={styles.prop}>{cleaner.serviceSecond.title}:</AppText>
          <AppTextBold style={styles.prop}>{cleaner.serviceSecond.price}</AppTextBold>
        </View>
        <AppButton onPress={() => orderHandler(cleaner.serviceSecond)}>Order</AppButton>
      </View>
    </AppScreen>
  );
}

CleanerInfoScreen.navigationOptions = ({ navigation }) => {
  const userType = navigation.getParam('userType');
  const balance = navigation.getParam('balance');

  return {
    headerTitle: userType === 'admin' ? 'Admin Profile' : 'User Profile',
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
    ),
  };
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    padding: 5,
  },
  description: {
    padding: 5,
  },
  containerText: {
    width: Dimensions.get('screen').width - 250,
    height: 180,
  },
  image: {
    position: 'absolute',
    top: 50,
    right: 10,
    width: 150,
    height: 150,
  },
  service: {
    marginBottom: 20,
  },
  serviceText: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prop: {
    fontSize: 26,
    marginRight: 10,
  },
})