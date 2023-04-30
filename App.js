import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/provider/AuthProvider";
import { ThemeProvider } from "react-native-rapi-ui";
import { LogBox } from "react-native";
import { YellowBox } from 'react-native';

LogBox.ignoreAllLogs();
console.disableYellowBox = true;
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.warn = () => {};

export default function App() {
  const images = [
    // require("../assets/icon.png"),
    // require("../assets/splash.png"),
    // require("../assets/login.png"),
    // require("../assets/register.png"),
    // require("../assets/forget.png"),
  ];

  // Ignore firebase v9 AsyncStorage warning
  React.useEffect(() => {
    LogBox.ignoreAllLogs();
    // LogBox.ignoreLogs([
    //   "Error: Rate limit exceeded - too many requests",
    //   "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
    // ]);
  }, []);

  return (
    <ThemeProvider images = {images}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
