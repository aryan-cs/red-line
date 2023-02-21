import { useRef, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Title from './pages/Title';
import Login from './pages/Login';
import Register from './pages/Register';
import Test from './pages/Test';

function AppStack () {

  return (

    <Stack.Navigator>

      <Stack.Screen

        name = "Title"
        component = {Title}
        options = {{loggedIn: false, headerShown: false}}

      />

      <Stack.Screen

        name = "Log In"
        component = {Login}

      />

      <Stack.Screen

        name = "Register"
        component = {Register}

      />

      <Stack.Screen

        name = "Test"
        component = {Test}

      />

    </Stack.Navigator>

  );

}

export default function App () {

  return (

    <NavigationContainer styles = {styles.container}>

      <AppStack />

    </NavigationContainer>

  );

}

const styles = StyleSheet.create({

  container: {

    backgroundColor: "#171717", // light mode: #ffffff, dark mode: #171717
    alignItems: 'center',
    justifyContent: 'center',

  },

});
