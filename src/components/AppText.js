import { themeColor, useTheme } from "react-native-rapi-ui";
import { useCallback } from 'react';
import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function AppText ({style, string}) {

  const { theme, isDarkmode } = useTheme();

  const [fontsLoaded] = useFonts({
    'Barlow': require('../../assets/fonts/barlow.ttf'),
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
        fontFamily: "Barlow",
        ...style
      
      }}

      theme = {theme}
      isDarkmode = {isDarkmode}>
        
        {string}
        
    </Text>

    </View>

  );

}
