import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../store';
import { 
  editServiceStore, 
  deleteServiceStore, 
  addServiceStore,
  deleteCleanerStore,
} from '../store/cleaners';
import { AppScreen } from '../components/ui/AppScreen';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppText } from '../components/ui/AppText';
import { AppButton } from '../components/ui/AppButton';
import { AppTextInput } from '../components/ui/AppTextInput';
import cleaner_photo from '../../assets/cleaner_photo.jpg';

export const AdminCleanerInfoScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cleaner = useSelector(selectors.getCleaner);
  const [service, setService] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  const [newService, setNewService] = useState(null);

  const editingService = (id, title, price) => {
    setIsEditing(id);
    setService({ id, title, price });
  }

  const editService = () => {
    dispatch(editServiceStore(service));
    setService(null);
    setIsEditing(null);
  }

  const deleteService = id => {
    dispatch(deleteServiceStore(id));
  }

  const addingService = () => {
    setNewService({ title: '', price: '' });
  }

  const addService = () => {
    if(!newService.title.trim()) {
      Alert.alert('Error', 'Enter service title');
      return;
    }
    if(!newService.price.trim()) {
      Alert.alert('Error', 'Enter service price');
      return;
    }
    dispatch(addServiceStore({ 
      id: Date.now().toString(),
      title: newService.title,
      price: newService.price,
    }));
    setNewService(null);
  }

  const deleteCleaner = () => {
    Alert.alert(
      "Deleting dry cleaner",
      `Are you sure you want to delete '${cleaner.title}'?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          dispatch(deleteCleanerStore());
          navigation.navigate('AdminProfile', { screen: 'CleanerList' });
        } }
      ],
    );
  }

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
          {isEditing === serv.id ? (
            <View style={styles.serviceText}>
              <AppTextInput 
                style={styles.titleInput}
                value={service.title}
                placeholder={'Service title'} 
                onChangeText={text => setService(prev => ({ ...prev, title: text }))}
                maxLength={20}
              />
              <AppTextInput 
                value={service.price}
                placeholder={'Price'} 
                onChangeText={text => setService(prev => ({ 
                  ...prev, price: text.trim() 
                }))}
                keyboardType='number-pad'
              />
            </View>
          ) : (
            <View style={styles.serviceText}>
              <AppText style={styles.prop}>{serv.title}:</AppText>
              <AppTextBold style={styles.prop}>{serv.price}</AppTextBold>
            </View>
          )}
          <View style={styles.buttons}>
            {isEditing ? (
              <AppButton 
                style={styles.button}
                onPress={editService}
              >
                Save
              </AppButton>
            ) : (
              <AppButton 
                style={styles.button}
                onPress={() => editingService(
                  serv.id, serv.title, serv.price.toString()
                )}
              >
                Edit
              </AppButton>
            )}
            <AppButton 
              style={styles.button}
              onPress={() => deleteService(serv.id)}
            >
              Delete
            </AppButton>
          </View>
        </View>
      ))}
      {newService ? (
        <>
          <View style={styles.services}>
            <AppTextInput 
              style={styles.serviceTitle}
              value={newService.title}
              placeholder={'Service title'} 
              onChangeText={text => setNewService(prev => ({ 
                ...prev, title: text 
              }))}
              maxLength={20}
            />
            <AppTextInput 
              value={newService.price}
              placeholder={'Price'}
              onChangeText={text => setNewService(prev => ({ 
                ...prev, price: text.trim() 
              }))}
              keyboardType='number-pad'
            />
          </View>
          <AppButton style={styles.button__bottom} onPress={addService}>
            Add Service
          </AppButton>
        </>
      ) : (
        <AppButton onPress={addingService}>
          Add Service
        </AppButton>
      )}
      <AppButton 
        style={styles.button__bottom} 
        onPress={deleteCleaner}
      >
        Delete Cleaner
      </AppButton>
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
  services: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceTitle: {
    width: Dimensions.get('window').width * 0.65,
  },
  prop: {
    fontSize: 26,
    marginRight: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: 0,
    width: 150,
  },
  button__save: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  button__bottom: {
    marginTop: 10,
  },
  titleInput: {
    width: 200,
  }
});
