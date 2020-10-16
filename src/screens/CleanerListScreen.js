import React, { useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import * as selectors from '../store';
import { selectCleaner } from '../store/cleaners';
import { AppScreenList } from '../components/ui/AppScreenList';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { AppHeaderIconMaterial } from '../components/AppHeaderIconMaterial';
import { Cleaner } from '../components/Cleaner';
import { THEME } from '../theme';

export const CleanerListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cleaners = useSelector(selectors.getCleaners);
  const userType = useSelector(selectors.getUserType);

  const selectHandler = id => {
    if(userType === 'user') {
      dispatch(selectCleaner(id));
      navigation.navigate('CleanerInfo');
    } else {
      dispatch(selectCleaner(id));
      navigation.navigate('AdminCleanerInfo');
    }
  }

  let content = (
    <FlatList 
      data={cleaners}
      renderItem={({ item }) => (
        <Cleaner cleaner={item} onPresss={selectHandler}/>
      )}
      keyExtractor={item => item.id.toString()}
    />
  );

  if(!cleaners.length) {
    content = <View style={styles.empty}><AppTextBold>No cleaners!</AppTextBold></View>
  }

  return (
    <AppScreenList>
      <AppTextBold style={styles.text}>Cleaner List</AppTextBold>
      {content}
    </AppScreenList>
  )
};

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
