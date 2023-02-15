import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Title from './pages/Title';
import Login from './pages/Login';
import Register from './pages/Register';
import Test from './pages/Test';

export default function App () {

  return (

    <SafeAreaView style = {styles.container}>

      <Title />
      {/* <Login /> */}
      {/* <Register /> */}
      <Test />

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,
    backgroundColor: "#171717", // light mode: #ffffff, dark mode: #171717
    alignItems: 'center',
    justifyContent: 'center',

  },

});
