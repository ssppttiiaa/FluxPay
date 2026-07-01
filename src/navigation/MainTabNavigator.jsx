import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import BerandaScreen from '../screens/main/BerandaScreen';
import LanggananScreen from '../screens/main/LanggananScreen';
import NotifikasiScreen from '../screens/main/NotifikasiScreen';
import ProfilScreen from '../screens/main/ProfilScreen';

import { colors } from '../constants/colors';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarShowLabel: true,

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#9CA3AF',

        tabBarStyle: {
          height: 70,
          paddingTop: 8,
          paddingBottom: 10,
          borderTopWidth: 0,
          elevation: 8,
          backgroundColor: '#FFFFFF',
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },

        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          switch (route.name) {
            case 'Beranda':
              iconName = focused ? 'home' : 'home-outline';
              break;

            case 'Langganan':
              iconName = focused ? 'albums' : 'albums-outline';
              break;

            case 'Notifikasi':
              iconName = focused
                ? 'notifications'
                : 'notifications-outline';
              break;

            case 'Profil':
              iconName = focused ? 'person' : 'person-outline';
              break;

            default:
              iconName = 'ellipse';
          }

          return (
            <Ionicons
              name={iconName}
              size={24}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Beranda"
        component={BerandaScreen}
      />

      <Tab.Screen
        name="Langganan"
        component={LanggananScreen}
      />

      <Tab.Screen
        name="Notifikasi"
        component={NotifikasiScreen}
      />

      <Tab.Screen
        name="Profil"
        component={ProfilScreen}
      />
    </Tab.Navigator>
  );
}