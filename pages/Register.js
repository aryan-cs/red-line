import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import React from 'react';

export default function Register () {

  const [fontsLoaded] = useFonts({

    'Montserrat': require('../assets/fonts/montserrat-black-italic.ttf'),
    'Barlow': require('../assets/fonts/barlow-semibold.ttf'),

  });

  const [emailText, onChangeEmailText] = React.useState("Email");
  const [passwordText, onChangePasswordText] = React.useState("Password");

  return (

    <View style = {styles.container}>

      <Text style = {styles.title}>Sign Up</Text>

      <TextInput

        style = {styles.input}
        onChangeText = {onChangeEmailText}
        placeholder = {emailText}
        placeholderTextColor = "#8a8a8a"

      />

      <TextInput
      
        style = {styles.input}
        onChangeText = {onChangePasswordText}
        placeholder = {passwordText}
        secureTextEntry = {true}
        placeholderTextColor = "#8a8a8a"
      
      />

      <TouchableHighlight onPress = {() => Alert.alert('Thank you for signing up!')} style = {styles.touchable}>

        <Text style = {styles.label}>Continue</Text>

      </TouchableHighlight>
        
    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },

  title: {

    fontSize: 50,
    color: '#e02251',
    fontFamily: 'Montserrat',
    marginBottom: 30,

  },

  text: {

    fontSize: 25,
    color: 'black',
    fontFamily: 'Barlow',

  },

  input: {

    height: 40,
    width: 250,
    margin: 15,
    padding: 10,
    borderRadius: 10,
    color: "white", // light mode: white, dark mode: black
    backgroundColor: '#2e2e2e', // light mode: #ebebeb, dark mode: #2e2e2e
    fontFamily: 'Barlow',

  },

  label: {

    color: "white",
    fontFamily: 'Barlow',
    textAlign: 'center',
    fontSize: 20,

  },

  touchable: {

    width: 250,
    margin: 15,
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#e02251',
    borderRadius: 10,

  }

});
