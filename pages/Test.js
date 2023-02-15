import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

import * as Location from 'expo-location';

export default function App () {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [fontsLoaded] = useFonts({

    'Barlow': require('../assets/fonts/barlow-semibold.ttf'),

  });

  useEffect(() => {

    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') { setErrorMsg('Permission to access location was denied'); return; }

      const interval = setInterval(async () => {
        
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

      }, 1000);

    })();
    
  }, []);

  let text = 'Waiting..';
  if (errorMsg) { text = errorMsg; }
  else if (location) { text = JSON.stringify(location); }

  return (

    <View style={styles.container}>

      <Text style={styles.paragraph}>{text}</Text>

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
  
      fontSize: 70,
      color: '#e02251',
      fontFamily: 'Montserrat',
  
    },
  
    paragraph: {
  
      padding: 20,
      fontSize: 15,
      color: 'white',
      fontFamily: 'Barlow',
  
    }
  
  });
