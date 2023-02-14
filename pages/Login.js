import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import { useFonts } from 'expo-font';
import React from 'react';

export default function Login () {

  const [fontsLoaded] = useFonts({

    'Montserrat-Italic': require('../assets/fonts/montserrat-italic.ttf'),
    'Montserrat-Black-Italic': require('../assets/fonts/montserrat-black-italic.ttf'),
    'Montserrat-Regular': require('../assets/fonts/montserrat.ttf'),

    'Barlow-Semicondensed': require('../assets/fonts/barlow-semicondensed.ttf'),
    'Barlow-Semibold': require('../assets/fonts/barlow-semibold.ttf'),

  });

  const [emailText, onChangeEmailText] = React.useState("Email");
  const [passwordText, onChangePasswordText] = React.useState("Password");

  return (

    <View style = {styles.container}>

      <Text style = {styles.title}>Log In</Text>

      <TextInput

        style = {styles.input}
        onChangeText = {onChangeEmailText}
        placeholder = {emailText}

      />

      <TextInput
      
        style = {styles.input}
        onChangeText = {onChangePasswordText}
        placeholder = {passwordText}
      
      />

      <TouchableHighlight onPress = {() => Alert.alert('Simple Button pressed')} style = {styles.touchable}>

        <Text style = {styles.label}>Continue</Text>

      </TouchableHighlight>
        
    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },

  title: {

    fontSize: 50,
    color: '#e02251',
    fontFamily: 'Montserrat-Black-Italic',
    marginBottom: 30,

  },

  text: {

    fontSize: 25,
    color: 'black',
    fontFamily: 'Barlow-Semibold',

  },

  input: {

    height: 40,
    width: 250,
    margin: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ebebeb',
    borderColor: '#ebebeb00',
    fontFamily: 'Barlow-Semibold',

  },

  label: {

    color: "white",
    fontFamily: 'Barlow-Semibold',
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
