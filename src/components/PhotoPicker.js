import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { AppButton } from './ui/AppButton';
import { THEME } from '../theme';

export const PhotoPicker = ({ setPhoto, photo }) => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  return (
    <View style={styles.wrapper}>
      {photo ? (
        <AppButton><Ionicons name="ios-cloud-done" size={24} color={THEME.WHITE_COLOR}/></AppButton>
      ) : (
        <AppButton onPress={pickImage}>Select photo</AppButton>
      )}
      
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
  },
});
