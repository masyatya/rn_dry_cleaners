import React from 'react';
import { StyleSheet, Dimensions, View, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../store';
import { addOrder } from '../store/order';
import { AppScreen } from '../components/ui/AppScreen';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppText } from '../components/ui/AppText';
import { AppButton } from '../components/ui/AppButton';
import cleaner_photo from '../../assets/cleaner_photo.jpg';

export const CleanerInfoScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectors.getInfoUser);
  const cleaner = useSelector(selectors.getCleaner);
  const balance = useSelector(selectors.getBalance);

  const orderHandler = (service) => {
    if(service.price > balance) {
      Alert.alert('Error', 'Insufficient funds in your account');
    } else {
      dispatch(addOrder({
        ...service,
        ...userInfo,
        date: new Date().toLocaleDateString(),
        status: 'new',
        id: Date.now(),
      }));
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
      {cleaner.photo ? (
        <Image source={{ uri: cleaner.photo }} style={styles.image} />
      ) : (
        <Image source={cleaner_photo} style={styles.image} />
      )}
      {cleaner.services.map(serv => (
        <View style={styles.service} key={serv.id}>
          <View style={styles.serviceText}>
            <AppText style={styles.prop}>{serv.title}:</AppText>
            <AppTextBold style={styles.prop}>{serv.price}</AppTextBold>
          </View>
          <AppButton onPress={() => orderHandler(serv)}>Order</AppButton>
        </View>
      ))}
    </AppScreen>
  );
}

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
});
