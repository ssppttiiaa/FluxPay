import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from './AuthStack';
import MainTabNavigator from './MainTabNavigator';
import TambahLanggananScreen from '../screens/subscription/TambahLanggananScreen';
import KelolaLanggananScreen from '../screens/subscription/KelolaLanggananScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  // TODO: Add logic to switch between AuthStack and MainApp based on authentication state
  // const isAuthenticated = false; // untuk tampilan di splash screen, login screen, register screen
  const isAuthenticated = true;  // untuk tampilan setelah login (dashboard, profile, dll)

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthStack} />
      ) : (
        <>
          <Stack.Screen name="MainApp" component={MainTabNavigator} />
          <Stack.Screen
            name="TambahLangganan"
            component={TambahLanggananScreen}
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen
            name="KelolaLangganan"
            component={KelolaLanggananScreen}
            options={{ presentation: 'modal' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
