import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import * as selectors from '../store';
import { AppScreenList } from '../components/ui/AppScreenList';
import { AppTextBold } from '../components/ui/AppTextBold';
import { Client } from '../components/Client';

export const ClientsListScreen = () => {
  const clients = useSelector(selectors.getClients);

  let content = (
    <FlatList 
      data={clients}
      renderItem={({ item }) => (
        <Client client={item} />
      )}
      keyExtractor={item => item.id}
    />
  );

  if(!clients.length) {
    content = <View style={styles.empty}><AppTextBold>No clients!</AppTextBold></View>
  }

  return (
    <AppScreenList>
      <AppTextBold style={styles.text}>Client List</AppTextBold>
      {content}
    </AppScreenList>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 10,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 20,
  }
});
