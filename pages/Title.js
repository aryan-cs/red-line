import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

export default function Title () {

  const [fontsLoaded] = useFonts({

    'Montserrat': require('../assets/fonts/montserrat-black-italic.ttf'),
    'Barlow': require('../assets/fonts/barlow-semibold.ttf'),

  });

  return (

    <View style = {styles.container}>

      <Text style = {styles.text}>Welcome to</Text>
      <Text style = {styles.title}>RED LINE</Text>

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

  text: {

    fontSize: 25,
    color: 'white',
    fontFamily: 'Barlow',

  }

});
