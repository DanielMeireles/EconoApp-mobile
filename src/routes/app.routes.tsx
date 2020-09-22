import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import defaultTheme from '../styles/theme/default';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import CreateShoppingList from '../pages/CreateShoppingList';
import CreateShoppingListComplete from '../pages/CreateShoppingListComplete';
import ViewShoppingList from '../pages/ViewShoppingList';

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
      name="CreateShoppingListComplete"
      component={CreateShoppingListComplete}
    />
  </App.Navigator>
);

export default AppRoutes;
