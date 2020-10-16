import React from 'react';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { THEME } from '../theme';
import { CreateCleanerScreen } from '../screens/CreateCleanerScreen';
import { ClientsListScreen } from '../screens/ClientsListScreen';
import { CleanerListScreen } from '../screens/CleanerListScreen';
import { LogoutScreen } from '../screens/LogoutScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import { CleanerInfoScreen } from '../screens/CleanerInfoScreen';
import { FormOrderScreen } from '../screens/FormOrderScreen';
import { OrdersScreen } from '../screens/OrdersScreen';
import { OrdersAdminScreen } from '../screens/OrdersAdminScreen';
import { MainScreen } from '../screens/MainScreen';
import { AdminCleanerInfoScreen } from '../screens/AdminCleanerInfoScreen';
import { AdminOrderInfoScreen } from '../screens/AdminOrderInfoScreen';
import { AppHeaderMenu } from '../components/AppHeaderMenu';
import { AppHeaderLogout } from '../components/AppHeaderLogout';
import { AppHeaderBalance } from '../components/AppHeaderBalance';
import { View } from 'react-native';


const stackOptions = {
  headerStyle: {
    backgroundColor: THEME.BLACK_COLOR,
  },
  headerTintColor: THEME.WHITE_COLOR,
};

const drawerContentOptions = {
  activeTintColor: THEME.WHITE_COLOR,
  activeBackgroundColor: THEME.BLACK_COLOR,
};

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator();

const AdminDrawer = () => (
  <Drawer.Navigator
    drawerContentOptions={drawerContentOptions}
    drawerContent={props => {
      const filteredProps = {
        ...props,
        state: {
          ...props.state,
          routeNames: props.state.routeNames.filter(
            routeName => routeName !== 'AdminCleanerInfo'
              && routeName !== 'AdminOrderInfo'
          ),
          routes: props.state.routes.filter(
            route => route.name !== 'AdminCleanerInfo'
              && route.name !== 'AdminOrderInfo'
          ),
        },
      };
      return (
        <DrawerContentScrollView {...filteredProps}>
          <DrawerItemList {...filteredProps} />
        </DrawerContentScrollView>
      );
    }}
  >
    <Drawer.Screen
      name='CreateCleaner'
      component={CreateCleanerScreen}
      options={{ title: 'CREATE CLEANER' }}
    />
    <Drawer.Screen
      name='ClientsList' 
      component={ClientsListScreen}
      options={{ title: 'CLIENT LIST' }}
    />
    <Drawer.Screen
      name='CleanerList' 
      component={CleanerListScreen}
      options={{ title: 'CLEANER LIST' }}
    />
    <Drawer.Screen
      name='OrdersAdmin'
      component={OrdersAdminScreen}
      options={{ title: 'ORDERS ADMIN' }}
    />
    <Drawer.Screen
      name='Logout' 
      component={LogoutScreen}
      options={{ title: 'LOGOUT' }}
    />
    <Drawer.Screen
      name='AdminCleanerInfo' 
      component={AdminCleanerInfoScreen}
    />
    <Drawer.Screen
      name='AdminOrderInfo'
      component={AdminOrderInfoScreen}
    />
  </Drawer.Navigator>
)

const UserDrawer = () => (
  <Drawer.Navigator
      drawerContentOptions={drawerContentOptions}
      drawerContent={props => {
        const filteredProps = {
          ...props,
          state: {
            ...props.state,
            routeNames: props.state.routeNames.filter(
              routeName => routeName !== 'FormOrder'
            ),
            routes: props.state.routes.filter(
              route => route.name !== 'FormOrder'
            ),
          },
        };
        return (
          <DrawerContentScrollView {...filteredProps}>
            <DrawerItemList {...filteredProps} />
          </DrawerContentScrollView>
        );
      }}
    >
    <Drawer.Screen 
      name='UserHome'
      component={UserProfileScreen}
      options={{ title: 'HOME' }}
    />
    <Drawer.Screen 
      name='CleanerList'
      component={CleanerListScreen}
      options={{ title: 'CLEANER LIST' }}
    />
    <Drawer.Screen 
      name='CleanerInfo'
      component={CleanerInfoScreen}
      options={{ title: 'CLEANER INFO' }}
    />
    <Drawer.Screen 
      name='Orders'
      component={OrdersScreen}
      options={{ title: 'ORDERS' }}
    />
    <Drawer.Screen 
      name='Logout'
      component={LogoutScreen}
      options={{ title: 'LOGOUT' }}
    />
    <Drawer.Screen 
      name='FormOrder'
      component={FormOrderScreen}
    />
  </Drawer.Navigator>
)

const MainNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name='Main' 
      component={MainScreen} 
      options={{ ...stackOptions, title: 'Dry Cleaner' }}
    />
    <Stack.Screen 
      name='SignIn'
      component={SignInScreen} 
      options={{ ...stackOptions, title: 'Sign In' }}
    />
    <Stack.Screen 
      name='SignUp' 
      component={SignUpScreen} 
      options={{ ...stackOptions, title: 'Sign Up' }}
    />
    <Stack.Screen 
      name='ForgotPassword' 
      component={ForgotPasswordScreen} 
      options={{ ...stackOptions, title: 'Forgot Password' }}
    />
    <Stack.Screen 
      name='AdminProfile' 
      component={AdminDrawer}
      options={() => ({
        headerLeft: () => (
          <AppHeaderMenu />
        ),
        headerRight: () => (
          <AppHeaderLogout />
        ),
        title: 'Admin Profile',
        ...stackOptions
      })}
    />
    <Stack.Screen 
      name='UserProfile' 
      component={UserDrawer} 
      options={() => ({
        headerLeft: () => (
          <AppHeaderMenu />
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row' }}>
            <AppHeaderBalance />
            <AppHeaderLogout />
          </View>
        ),
        title: 'User Profile',
        ...stackOptions
      })}
    />
  </Stack.Navigator> 
);

export default MainNavigation;
