import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { addCleaner } from '../store/cleaners';
import { logout } from '../store/auth';
import { AppButton } from '../components/ui/AppButton';
import { AppScreen } from '../components/ui/AppScreen';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppTextInput } from '../components/ui/AppTextInput';
import { PhotoPicker } from '../components/PhotoPicker';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { THEME } from '../theme';

export const CreateCleanerScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [created, setCreated] = useState(false);
  const [description, setDescription] = useState('');
  const [serviceFirst, setServiceFirst] = useState({ title: '', price: '' });
  const [serviceSecond, setServiceSecond] = useState({ title: '', price: '' });
  const [photo, setPhoto] = useState(null);
  const addCleanerHandler = () => {
    if(!title.trim()) {
      Alert.alert('Error', 'Enter title of the dry cleaner');
      return;
    }
    if(!description.trim()) {
      Alert.alert('Error', 'Enter description of the dry cleaner');
      return;
    }
    if(!serviceFirst.title.trim()) {
      Alert.alert('Error', 'Enter title of the first service');
      return;
    }
    if(!serviceFirst.price || isNaN(+serviceFirst.price)) {
      Alert.alert('Error', 'Enter valid price of the first service');
      return;
    }
    if(!serviceSecond.title.trim()) {
      Alert.alert('Error', 'Enter title of the second service');
      return;
    }
    if(!serviceSecond.price || isNaN(+serviceSecond.price)) {
      Alert.alert('Error', 'Enter valid price of the second service');
      return;
    }
    if(!photo) {
      Alert.alert('Error', 'Upload a photo of the dry cleaning');
      return;
    }
    setCreated(true);
    setTimeout(() => {
      dispatch(addCleaner({
        id: Date.now().toString(),
        title,
        description,
        serviceFirst,
        serviceSecond,
        photo
      }));
      navigation.navigate('CleanerList');
      setTitle('');
      setDescription('');
      setServiceFirst({});
      setServiceSecond({});
      setPhoto('');
      setCreated(false);
    }, 50);
  };

  const logoutHandler = useCallback(() => {
    dispatch(logout());
    navigation.navigate('Main');
  }, [dispatch]);

  useEffect(() => {
    navigation.setParams({ logoutHandler });
  }, [logoutHandler])

  return (
    <AppScreen>
      <AppTextBold style={styles.text}>Create Dry Cleaner</AppTextBold>
      <AppTextInput 
        value={title}
        placeholder={'Dry cleaner name'} 
        onChangeText={setTitle}
        maxLength={16}
      />
      <AppTextInput 
        value={description}
        placeholder={'Dry cleaner description'} 
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        textAlignVertical='top'
      />
      <View style={styles.services}>
        <AppTextInput 
          style={styles.service}
          value={serviceFirst.title}
          placeholder={'First service'} 
          onChangeText={text => setServiceFirst(prev => ({ ...prev, title: text }))}
          maxLength={20}
        />
        <AppTextInput 
          value={serviceFirst.price}
          placeholder={'Price'} 
          onChangeText={text => setServiceFirst(prev => ({ ...prev, price: text.trim() }))}
          keyboardType='number-pad'
        />
      </View>
      <View style={styles.services}>
        <AppTextInput 
          style={styles.service}
          value={serviceSecond.title}
          placeholder={'Second service'} 
          onChangeText={text => setServiceSecond(prev => ({ ...prev, title: text }))}
          maxLength={20}
        />
        <AppTextInput 
          value={serviceSecond.price}
          placeholder={'Price'} 
          onChangeText={text => setServiceSecond(prev => ({ ...prev, price: text.trim() }))}
          keyboardType='number-pad'
        />
      </View>
      <PhotoPicker setPhoto={setPhoto} photo={photo}/>
      {created ? (
        <AppButton style={styles.button}>
          <MaterialIcons name="done" size={24} color={THEME.WHITE_COLOR} />
        </AppButton>
      ) : (
        <AppButton style={styles.button} onPress={addCleanerHandler}>
          Create
        </AppButton>
      )}
    </AppScreen>
  );
}

CreateCleanerScreen.navigationOptions = ({ navigation }) => {
  const logoutHandler = navigation.getParam('logoutHandler');

  return {
    headerTitle: 'Admin Profile',
    headerLeft: null,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title='Logout' iconName='logout' onPress={logoutHandler}/>
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title='Menu' iconName='menu' onPress={() => navigation.toggleDrawer()}/>
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  text: {
    marginBottom: 10,
    fontSize: 26,
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
  },
  services: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  service: {
    width: Dimensions.get('window').width * 0.65,
  }
});
