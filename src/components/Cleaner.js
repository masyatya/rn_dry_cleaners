import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { AppText } from '../components/ui/AppText';
import { AppTextBold } from './ui/AppTextBold';
import { THEME } from '../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const Cleaner = ({ cleaner, onPresss }) => {
  return (
    <TouchableOpacity 
      style={styles.wrapper} 
      onPress={() => onPresss(cleaner.id)}
      activeOpacity={0.8}
    >
      <View style={styles.containerText}>
        <View  style={styles.mainText}>
          <AppTextBold style={styles.title}>{cleaner.title}</AppTextBold>
          <AppText style={styles.description}>{cleaner.description}</AppText>
        </View>
      </View>
      <View style={styles.services}>
          <AppText style={styles.service}>{cleaner.serviceFirst.title}:</AppText>
          <AppText>{cleaner.serviceFirst.price}</AppText>
        </View>
        <View style={styles.services}>
          <AppText style={styles.service}>{cleaner.serviceSecond.title}:</AppText>
          <AppText>{cleaner.serviceSecond.price}</AppText>
        </View>
      <Image source={{ uri: cleaner.photo }} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    minHeight: 180,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: THEME.BLACK_COLOR,
    borderStyle: 'solid',
  },
  containerText: {
    width: Dimensions.get('screen').width - 250,
  },
  mainText: {
    minHeight: 160,
  },
  title: {
    fontSize: 20,
    padding: 5,
  },
  description: {
    padding: 5,
  },
  image: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 150,
    height: 150,
  },
  services: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});