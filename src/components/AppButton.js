import { themeColor, useTheme } from "react-native-rapi-ui";
import { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import * as VARS from "../../Vars";

TouchableOpacity.defaultProps = { activeOpacity: 0.99 };

export default function AppText ({style, string, onPress, disabled}) {

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

        <TouchableOpacity

          onPress = {onPress}

          disabled = {disabled}
          
          style = {{
          
            padding: 13,
            borderRadius: 10,
            borderColor: "transparent",
            backgroundColor: VARS.redline,
            ...style

          }}>

        <Text

            style = {{

              color: VARS.lightmodeBGaccent,
              fontFamily: "Barlow",
              textAlign: "center",
              fontSize: 17

            }}

            theme = {theme}
            isDarkmode = {isDarkmode}>
  
              {string}
  
        </Text>

        </TouchableOpacity>

    </View>

  );

}
