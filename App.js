import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {

  const [fontsLoaded] = useFonts({

    'Montserrat-Italic': require('./assets/fonts/montserrat-italic.ttf'),
    'Montserrat-SemiBold-Italic': require('./assets/fonts/montserrat-semibold-italic.ttf'),
    'Montserrat-Regular': require('./assets/fonts/montserrat.ttf'),

  });

  return (

    <View style = {styles.container}>

      <Text>Welcome to</Text>
      <Text style = {styles.title}>RED LINE</Text>
      <StatusBar style = "auto" />

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
    color: 'red',
    fontFamily: 'Montserrat-SemiBold-Italic',    

  }

});
