import { themeColor, useTheme } from "react-native-rapi-ui";
import { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import AppText from "../../src/components/AppText";
import AppTitle from "../../src/components/AppTitle";
import AppButton from "../../src/components/AppButton";
import AppInput from "../../src/components/AppInput";

import * as VARS from "../../Vars";

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

export default function Floaty ({style, string, onPress}) {

  const { theme, isDarkmode } = useTheme();

  const [fontsLoaded] = useFonts({
    'Barlow': require('../../assets/fonts/barlow.ttf'),
    'Montserrat': require('../../assets/fonts/montserrat.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) { await SplashScreen.hideAsync(); }
  }, [fontsLoaded]);

  if (!fontsLoaded) { return null; }

  return (

    <View onLayout = {onLayoutRootView}>

        <TouchableOpacity

          onPress = {onPress}
          
          style = {{
          
            margin: 10,
            padding: 10,
            borderRadius: 10,
            width: 360,
            height: 200,
            zIndex: 1,
            borderColor: "transparent",
            justifyContent: "flex-end",
            backgroundColor: isDarkmode ? VARS.darkmodeBGaccent : VARS.lightmodeBGaccent,
            ...style

          }}>

            {/* image, map, etc as background of floaty */}

            <AppTitle style = {{
                
                fontSize: 30,
                marginRight: 7,
                alignSelf: "flex-end",
                color: VARS.redlineBrighter
                
            }} string = {string} />

        </TouchableOpacity>

    </View>

  );

}
