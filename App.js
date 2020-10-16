import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './src/navigation/AppNavigation';
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
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </Provider>
  );
}
