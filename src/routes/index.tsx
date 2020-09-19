import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hide();
    }
  }, [loading]);

  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
