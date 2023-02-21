import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import Heading from '../components/Heading';

import * as Location from 'expo-location';

export default function App () {

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [cords, setCords] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [speed, setSpeed] = useState(null);
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
        let address = await Location.reverseGeocodeAsync(location.coords).then((address) => { return address[0].name + ', ' + address[0].city + ', ' + address[0].region + ', ' + address[0].country });
        let cords = location.coords.latitude + ', ' + location.coords.longitude;
        let timestamp = location.timestamp;
        let speed = location.coords.speed + " mph";

        setLocation(location);
        setAddress(address);
        setCords(cords);
        setTimestamp(timestamp);
        setSpeed(speed);

      }, 5000);

    })();
    
  }, []);

  let text = 'Waiting..';
  let locationInfo = 'Waiting..';
  let addressInfo = 'Waiting..';
  let cordsInfo = 'Waiting..';
  let timestampInfo = 'Waiting..';
  let speedInfo = 'Waiting..';

  if (errorMsg) { text = errorMsg; }
  else if (location) {
    
    locationInfo = JSON.stringify(location);
    addressInfo = JSON.stringify(address);
    cordsInfo = JSON.stringify(cords);
    timestampInfo = JSON.stringify(timestamp);
    speedInfo = JSON.stringify(speed);

  }

  return (

    <View style = {styles.container}>

      <Heading text = "DATA" />

      <Text style = {styles.paragraph}>{addressInfo}</Text>
      <Text style = {styles.paragraph}>{cordsInfo}</Text>
      <Text style = {styles.paragraph}>{speedInfo}</Text>
      <Text style = {styles.paragraph}>{timestampInfo}</Text>

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
