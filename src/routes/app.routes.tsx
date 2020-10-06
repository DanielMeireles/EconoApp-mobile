import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import defaultTheme from '../styles/theme/default';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import CreateShoppingList from '../pages/CreateShoppingList';
import ViewShoppingList from '../pages/ViewShoppingList';
import CreateShoppingListItem from '../pages/CreateShoppingListItem';
import SuccessPage from '../pages/SuccessPage';
import QRCode from '../pages/QRCode';
import Map from '../pages/Map';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: defaultTheme.colors.background },
    }}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="Profile" component={Profile} />
    <App.Screen name="CreateShoppingList" component={CreateShoppingList} />
    <App.Screen name="ViewShoppingList" component={ViewShoppingList} />
    <App.Screen
      name="CreateShoppingListItem"
      component={CreateShoppingListItem}
    />
    <App.Screen name="SuccessPage" component={SuccessPage} />
    <App.Screen name="QRCode" component={QRCode} />
    <App.Screen name="Map" component={Map} />
  </App.Navigator>
);

export default AppRoutes;
