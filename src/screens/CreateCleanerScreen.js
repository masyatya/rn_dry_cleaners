import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons'; 
import { addCleaner } from '../store/cleaners';
import { AppButton } from '../components/ui/AppButton';
import { AppScreen } from '../components/ui/AppScreen';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppText } from '../components/ui/AppText';
import { AppTextInput } from '../components/ui/AppTextInput';
import { PhotoPicker } from '../components/PhotoPicker';
import { THEME } from '../theme';

export const CreateCleanerScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [created, setCreated] = useState(false);
  const [description, setDescription] = useState('');
  const [service, setService] = useState({ title: '', price: ''});
  const [services, setServices] = useState([]);
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
        services,
        photo,
      }));
      navigation.navigate('AdminProfile', { screen: 'CleanerList' });
      setTitle('');
      setDescription('');
      setServices([]);
      setPhoto('');
      setCreated(false);
    }, 50);
  };

  const deleteService = id => {
    const copyServices = [...services].filter(serv => serv.id !== id);
    setServices(copyServices);
  }

  const addService = () => {
    if(!service.title.trim()) {
      Alert.alert('Error', 'Enter service title');
      return;
    }
    if(!service.price) {
      Alert.alert('Error', 'Enter service price');
      return;
    }
    setServices(prev => [...prev, { 
      title: service.title.trim(), 
      price: service.price, 
      id: Date.now(),
    }]);
    setService({ title: '', price: '' });
  }

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
        maxLength={120}
      />
      {services.map(serv => (
        <View style={styles.services__added} key={serv.id}>
          <AppText style={styles.service__added}>{serv.title}</AppText>
          <View style={styles.service__added_right}>
            <AppText>{serv.price}</AppText>
            <AppButton 
              style={styles.button_close}
              onPress={() => deleteService(serv.id)}
            >
              &times;
            </AppButton>
          </View>
        </View>
      ))}
      <View style={styles.services}>
        <AppTextInput 
          style={styles.service__title}
          value={service.title}
          placeholder={'Service title'} 
          onChangeText={text => setService(prev => ({ ...prev, title: text }))}
          maxLength={20}
        />
        <AppTextInput 
          value={service.price}
          placeholder={'Price'} 
          onChangeText={text => setService(prev => ({ ...prev, price: text.trim() }))}
          keyboardType='number-pad'
        />
      </View>
      <AppButton style={styles.button} onPress={addService}>Add service</AppButton>
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
  services__added: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  button_close: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  service__added_right: {
    flexDirection: 'row',
  }
});
