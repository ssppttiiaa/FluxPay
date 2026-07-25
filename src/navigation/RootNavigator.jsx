import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStack from "./AuthStack";
import MainTabNavigator from "./MainTabNavigator";

import TambahLanggananScreen from "../screens/subscription/TambahLanggananScreen";
import KelolaLanggananScreen from "../screens/subscription/KelolaLanggananScreen";

import ExportScreen from "../screens/main/ExportScreen";
import EditProfileScreen from "../screens/main/EditProfileScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen
        name="Auth"
        component={AuthStack}
      />

      <Stack.Screen
        name="MainApp"
        component={MainTabNavigator}
      />

      <Stack.Screen
        name="TambahLangganan"
        component={TambahLanggananScreen}
        options={{ presentation: "modal" }}
      />

      <Stack.Screen
        name="KelolaLangganan"
        component={KelolaLanggananScreen}
        options={{ presentation: "modal" }}
      />

      <Stack.Screen
        name="Export"
        component={ExportScreen}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
      />

    </Stack.Navigator>
  );
}