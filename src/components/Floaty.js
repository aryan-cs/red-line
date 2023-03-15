import { themeColor, useTheme } from "react-native-rapi-ui";
import { useCallback } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import AppText from "../../src/components/AppText";
import AppTitle from "../../src/components/AppTitle";
import AppButton from "../../src/components/AppButton";
import AppInput from "../../src/components/AppInput";

import * as VARS from "../../Vars";

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

export default function Floaty ({style, title, desc, src, onPress}) {

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

            <Image
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
              style = {{ height: 200, position: "absolute", zIndex: -1 }} />

            {/* image, map, etc as background of floaty */}

            <AppTitle style = {{
                
                fontSize: 30,
                marginRight: 7,
                alignSelf: "flex-end",
                textAlign:'right',
                color: VARS.redlineBrighter,
                
                
            }} string = {title} />

            <AppText style = {{
                
                fontSize: 18,
                marginRight: 7,
                alignSelf: "flex-end",
                textAlign:'right',
                color: VARS.redlineBrighter,
                
                
            }} string = {desc} />

        </TouchableOpacity>

    </View>

  );

}
