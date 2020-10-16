import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Picker, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../store';
import { updateOrderStore, returnOrder } from '../store/auth'
import { AppScreen } from '../components/ui/AppScreen';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppText } from '../components/ui/AppText';
import { AppButton } from '../components/ui/AppButton';
import { AppTextInput } from '../components/ui/AppTextInput';

export const AdminOrderInfoScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const order = useSelector(selectors.getSelectOrder);
  const [returnDescr, setReturnDescr] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newOrder, setNewOrder] = useState({ 
    title: order.title,
    price: order.price.toString(),
    date: order.date,
    status: order.status,
  });

  useEffect(() => {
    setNewOrder({ 
      title: order.title,
      price: order.price.toString(),
      date: order.date,
      status: order.status,
    });
  }, [order]);

  const updateOrder = () => {
    if(newOrder.status === 'return') {
      if(!returnDescr.trim()) {
        Alert.alert('Error', 'Enter reason for return');
        return;
      } else {
        Alert.alert(
          "Update order info",
          `Are you sure you want to update service '${order.title}'?`,
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            { text: "OK", onPress: () => {
              dispatch(updateOrderStore({
                ...newOrder,
                username: order.username,
                id: order.id,
                reason: returnDescr,
              }));
              dispatch(returnOrder(order.username, order.price));
              navigation.navigate('OrdersAdmin');
              setIsEditing(false);
              setReturnDescr('');
            } }
          ],
        );
      }
    } else {
      Alert.alert(
        "Update order info",
        `Are you sure you want to update service '${order.title}'?`,
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { text: "OK", onPress: () => {
            dispatch(updateOrderStore({
              ...newOrder,
              username: order.username,
              id: order.id,
            }));
            navigation.navigate('OrdersAdmin');
            setIsEditing(false);
          } }
        ],
      );
    }
  }

  return (
    <AppScreen>
      <AppTextBold style={styles.heading}>Order info</AppTextBold>
      <View style={styles.block}>
        <AppTextBold style={styles.prop}>Full Name:</AppTextBold>
        <AppText>{order.fullname}</AppText>
      </View>
      <View style={styles.block}>
        <AppTextBold style={styles.prop}>Username:</AppTextBold>
        <AppText>{order.username}</AppText>
      </View>
      {isEditing ? (
        <>
          <View style={styles.block}>
            <AppTextBold style={styles.prop}>Order date:</AppTextBold>
            <AppTextInput 
              style={styles.text__input}
              value={newOrder.date}
              placeholder={'Order date'} 
              onChangeText={text => setNewOrder(prev => ({ 
                ...prev, date: text 
              }))}
              maxLength={15}
            />
          </View>
          <View style={styles.block}>
            <AppTextBold style={styles.prop}>Service:</AppTextBold>
            <AppTextInput 
              style={styles.text__input}
              value={newOrder.title}
              placeholder={'Service title'} 
              onChangeText={text => setNewOrder(prev => ({ 
                ...prev, title: text 
              }))}
              maxLength={20}
            />
          </View>
          <View style={styles.block}>
            <AppTextBold style={styles.prop}>Price:</AppTextBold>
            <AppTextInput 
              value={newOrder.price}
              placeholder={'Service Price'} 
              onChangeText={text => setNewOrder(prev => ({ 
                ...prev, price: text.trim() 
              }))}
              keyboardType='number-pad'
            />
          </View>
        </>
      ) : (
        <>
          <View style={styles.block}>
            <AppTextBold style={styles.prop}>Order date:</AppTextBold>
            <AppText>{order.date}</AppText>
          </View>
          <View style={styles.block}>
            <AppTextBold style={styles.prop}>Service:</AppTextBold>
            <AppText>{order.title}</AppText>
          </View>
          <View style={styles.block}>
            <AppTextBold style={styles.prop}>Price:</AppTextBold>
            <AppText>{order.price}</AppText>
          </View>
        </>
      )}
      <View style={styles.picker}>
        <Picker
          selectedValue={newOrder.status}
          style={{ height: 50, width: '100%' }}
          onValueChange={status => setNewOrder(prev => ({ ...prev, status }))}
        >
          <Picker.Item label='New Order' value='new' />
          <Picker.Item label='Order is ready' value='ready' />
          <Picker.Item label='Purchase returns' value='return' />
          <Picker.Item label='Order completed' value='completed' />
        </Picker>
      </View>
      {newOrder.status === 'return' && (
        <AppTextInput 
          value={returnDescr}
          placeholder={'Reason for return'}
          onChangeText={setReturnDescr}
          multiline={true}
          numberOfLines={4}
          textAlignVertical='top'
          maxLength={100}
        />
      )}
      <View style={styles.buttons}>
        {isEditing ? (
          <AppButton 
            style={styles.button}
            onPress={() => {
              setIsEditing(!isEditing);
              setNewOrder({ 
                title: order.title, 
                price: order.price.toString(), 
                date: order.date,
              });
            }}
          >
            Cancel
          </AppButton>
        ) : (
          <AppButton 
            style={styles.button}
            onPress={() => setIsEditing(!isEditing)}
          >
            Edit
          </AppButton>
        )}
        <AppButton 
          style={styles.button}
          onPress={updateOrder}
        >
          Apply
        </AppButton>
      </View>
    </AppScreen>
  )
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,
  },
  block: {
    fontSize: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  prop: {
    marginRight: 10,
    width: 100,
  },
  picker: {
    marginTop: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingHorizontal: 0,
    marginTop: 20,
    width: '40%',
  },
  text__input: {
    marginVertical: 0,
  }
})