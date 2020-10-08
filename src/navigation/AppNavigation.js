import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { MainScreen } from '../screens/MainScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { CreateCleanerScreen } from '../screens/CreateCleanerScreen';
import { ClientsListScreen } from '../screens/ClientsListScreen';
import { CleanerListScreen } from '../screens/CleanerListScreen';
import { THEME } from '../theme';
import { LogoutScreen } from '../screens/LogoutScreen';
import { UserProfileScreen } from '../screens/UserProfileScreen';
import { CleanerInfoScreen } from '../screens/CleanerInfoScreen';
import { FormOrderScreen } from '../screens/FormOrderScreen';
import { OrdersScreen } from '../screens/OrdersScreen';
import { OrdersAdminScreen } from '../screens/OrdersAdminScreen';

const options = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: THEME.BLACK_COLOR,
    },
    headerTintColor: THEME.WHITE_COLOR,
  }
};

const drawOptions = {
  contentOptions: {
    activeTintColor: THEME.WHITE_COLOR,
    activeBackgroundColor: THEME.BLACK_COLOR,
  }
}

const AppNavigator = createStackNavigator(
  {
    Main: MainScreen,
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
  },
  options
);

const CleanerNavigator = createStackNavigator({
  CleanerList: CleanerListScreen
}, options);

const AdminNavigator = createStackNavigator({
  AdminProfile: CreateCleanerScreen,
}, options);

const ClientsNavigator = createStackNavigator({
  ClientsList: ClientsListScreen,
}, options);

const UserStackNavigator = createStackNavigator({
  UserProfile: UserProfileScreen,
}, options);

const CleanerInfoNavigator = createStackNavigator({
  CleanerInfo: CleanerInfoScreen,
}, options);

const FormOrderNavigator = createStackNavigator({
  FormOrder: FormOrderScreen,
}, options);

const OrdersNavigator = createStackNavigator({
  Orders: OrdersScreen,
}, options);

const LogoutNavigator = createStackNavigator({
  Logout: LogoutScreen,
}, options);

const UserNavigator = createDrawerNavigator({
  UserProfile: {
    screen: UserStackNavigator,
    navigationOptions: {
      drawerLabel: 'PROFILE INFO',
    }
  },
  CleanerList: {
    screen: CleanerNavigator,
    navigationOptions: {
      drawerLabel: 'CLEANER LIST',
    }
  },
  CleanerInfo: {
    screen: CleanerInfoNavigator,
    navigationOptions: {
      drawerLabel: 'CLEANER INFO',
    }
  },
  FormOrder: {
    screen: FormOrderNavigator,
    navigationOptions: {
      drawerLabel: () => null,
    }
  },
  Orders: {
    screen: OrdersNavigator,
    navigationOptions: {
      drawerLabel: 'MY ORDERS',
    }
  },
  Logout: {
    screen: LogoutNavigator,
    navigationOptions: {
      drawerLabel: 'LOGOUT',
    }
  },
}, drawOptions);

const OrdersAdminNavigator = createStackNavigator({
  OrdersAdmin: OrdersAdminScreen,
}, options);

const DrawNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppNavigator,
      navigationOptions: {
        drawerLabel: () => null,
      }
    },
    UserProfile: {
      screen: UserNavigator,
      navigationOptions: {
        drawerLabel: () => null,
      }
    },

    CreateCleaner: {
      screen: AdminNavigator,
      navigationOptions: {
        drawerLabel: 'CREATE CLEANER',
      }
    },
    ClientsList: {
      screen: ClientsNavigator,
      navigationOptions: {
        drawerLabel: 'CLIENTS LIST',
      }
    },
    CleanerList: {
      screen: CleanerNavigator,
      navigationOptions: {
        drawerLabel: 'CLEANER LIST',
      }
    },
    OrdersAdmin: {
      screen: OrdersAdminNavigator,
      navigationOptions: {
        drawerLabel: 'ALL ORDERS',
      }
    },
    Logout: {
      screen: LogoutNavigator,
      navigationOptions: {
        drawerLabel: 'LOGOUT',
      }
    },
  },
  drawOptions
);

export const AppNavigation = createAppContainer(DrawNavigator);
