import { StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';
import React from 'react';

export default function Heading ({text}) {

  const [fontsLoaded] = useFonts({ 'Montserrat': require('../assets/fonts/montserrat-black-italic.ttf') });

  return ( <Text style = {styles.title}>{text}</Text> );

}

const styles = StyleSheet.create({

  title: {

    fontSize: 50,
    color: '#e02251',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    marginBottom: 30,

  },

});

