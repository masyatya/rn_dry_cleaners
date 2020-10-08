import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { AppNavigation } from './src/navigation/AppNavigation';
import { AppLoading } from 'expo';
import { bootstrap } from './src/bootstrap';
import { Provider } from 'react-redux';
import store from './src/store';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if(!isReady) {
    return (
      <AppLoading 
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={err => console.log(err)}
      />
    );
  };

  return (
    <Provider store={store}>
      <AppNavigation/>
    </Provider>
  );
}

const styles = StyleSheet.create({

});
