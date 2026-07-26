import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import RootNavigator from "./src/navigation/RootNavigator";
import { createTables } from "./src/database/migrations";
import LocalNotificationService from "./src/services/LocalNotificationService";

export default function App() {

  useEffect(() => {

    const initApp = async () => {

      try {

        await createTables();

        await LocalNotificationService.initialize();

        console.log(
          "✅ Database dan notifikasi siap"
        );

      } catch (error) {

        console.log(
          "❌ App initialization error:",
          error
        );

      }

    };

    initApp();

  }, []);

  return (
    <NavigationContainer>

      <RootNavigator />

      <StatusBar style="auto" />

    </NavigationContainer>
  );
}