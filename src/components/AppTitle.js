import { themeColor, useTheme } from "react-native-rapi-ui";
import { useCallback } from 'react';
import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function AppText ({style, string}) {

  const { theme, isDarkmode } = useTheme();

  const [fontsLoaded] = useFonts({
    'Montserrat': require('../../assets/fonts/montserrat.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) { await SplashScreen.hideAsync(); }
  }, [fontsLoaded]);

  if (!fontsLoaded) { return null; }

  return (

    <View onLayout = {onLayoutRootView}>

    <Text

      style = {{
        
        color: isDarkmode ? themeColor.white : themeColor.black,
        fontFamily: "Montserrat",
        paddingHorizontal: 5,
        ...style
      
      }}

      theme = {theme}
      isDarkmode = {isDarkmode}
      onLayoutRootView = {onLayoutRootView}>
        
        {string}
        
    </Text>

    </View>

  );

}
