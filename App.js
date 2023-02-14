import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

import Title from './pages/Title';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App () {

  return (

    <View style = {styles.container}>

      <Title />
      {/* <Login /> */}
      {/* <Register /> */}

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

    fontSize: 70,
    color: '#e02251',
    fontFamily: 'Montserrat-Black-Italic',

  },

  text: {

    fontSize: 25,
    color: 'black',
    fontFamily: 'Barlow-Semibold',

  }

});
