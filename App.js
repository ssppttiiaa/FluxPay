// import { NavigationContainer } from "@react-navigation/native";
// import { StatusBar } from "expo-status-bar";
// import { useEffect } from "react";

// import RootNavigator from "./src/navigation/RootNavigator";

// import { resetDatabase } from "./src/database/migrations";

// export default function App() {
//   useEffect(() => {
//     const initDatabase = async () => {
//       // await resetDatabase();
//     };

//     initDatabase();
//   }, []);

//   return (
//     <NavigationContainer>
//       <RootNavigator />
//       <StatusBar style="auto" />
//     </NavigationContainer>
//   );
// }


import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

import RootNavigator from "./src/navigation/RootNavigator";

import { createTables } from "./src/database/migrations";

export default function App() {
  useEffect(() => {
    const initDatabase = async () => {
      await createTables();
    };

    initDatabase();
  }, []);

  return (
    <NavigationContainer>
      <RootNavigator />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}