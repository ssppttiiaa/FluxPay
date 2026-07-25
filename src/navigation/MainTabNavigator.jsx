import React, { useState, useCallback } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";

import BerandaScreen from '../screens/main/BerandaScreen';
import LanggananScreen from '../screens/main/LanggananScreen';
import NotifikasiScreen from '../screens/main/NotifikasiScreen';
import ProfilScreen from '../screens/main/ProfilScreen';
import ReminderAPI from "../api/ReminderApi";

import { colors } from '../constants/colors';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const [notificationCount, setNotificationCount] = useState(0);

  useFocusEffect(
    useCallback(() => {

      const loadReminder = async () => {

        try {

          const count =
            await ReminderAPI.getTodayCount();

          setNotificationCount(count);

        } catch (error) {

          console.log(error);

        }

      };

      loadReminder();

    }, [])
  );

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
        options={{
          tabBarBadge:
            notificationCount > 0
              ? notificationCount
              : undefined,
        }}
      />

      <Tab.Screen
        name="Profil"
        component={ProfilScreen}
      />
    </Tab.Navigator>
  );
}

