import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  return (

    <View style={styles.container}>

      <Text>Welcome to</Text>
      <Text style = {styles.title}>Red Line.</Text>
      <StatusBar style = "auto" />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'

  },

  title: {

    fontSize: 40,
    fontWeight: 'bold',
    color: 'red'

  }

});
