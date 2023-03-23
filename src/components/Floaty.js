import { themeColor, useTheme } from "react-native-rapi-ui";
import { useCallback } from 'react';
import { TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import AppText from "../../src/components/AppText";
import AppTitle from "../../src/components/AppTitle";
import AppButton from "../../src/components/AppButton";
import AppInput from "../../src/components/AppInput";

import * as VARS from "../../Vars";

import MapView from 'react-native-maps';

TouchableOpacity.defaultProps = { activeOpacity: 0.95 };

export default function Floaty ({style, title, desc, src, onPress, background}) {

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
          
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
            width: 360,
            height: 200,
            marginVertical: 10,
            borderColor: "transparent",
            ...style

          }}>

            {src == null ? <View style = {{
              
              backgroundColor: isDarkmode ? VARS.darkmodeBGaccent : "#1c1c1c",
              borderRadius: 10,
              height: "100%",
              width: "100%",
              justifyContent: "flex-end",
              zIndex: 2}}>

              <AppTitle style = {{
                
                fontSize: 30,
                marginHorizontal: 15,
                alignSelf: "flex-end",
                textAlign:'right',
                zIndex: 3,
                color: isDarkmode ? VARS.redline : VARS.redline,
                
              }} string = {title} />

              <AppText style = {{
                
                fontSize: 14,
                marginHorizontal: 15,
                marginBottom: 10,
                alignSelf: "flex-end",
                textAlign:'right',
                zIndex: 3,
                color: isDarkmode ? themeColor.white100 : VARS.lightmodeBGaccent,
                
              }} string = {desc} />

            </View> 
              
            :
              
            <ImageBackground
              source = {src}
              style = {{

                resizeMode: 'stretch',
                height: "100%",
                width: "100%",
                zIndex: 1,
                position: "absolute",
                justifyContent: "flex-end",
                borderRadius: 10,
                backgroundColor: isDarkmode ? VARS.darkmodeBGaccent : "#1c1c1c",

              }}>

              <AppTitle style = {{
                
                fontSize: 30,
                marginHorizontal: 15,
                alignSelf: "flex-end",
                textAlign:'right',
                zIndex: 3,
                color: isDarkmode ? VARS.redline : VARS.redline,
                
              }} string = {title} />

              <AppText style = {{
                
                fontSize: 14,
                marginHorizontal: 15,
                marginBottom: 10,
                alignSelf: "flex-end",
                textAlign:'right',
                zIndex: 3,
                color: isDarkmode ? themeColor.white100 : VARS.lightmodeBGaccent,
                
              }} string = {desc} />
                
            </ImageBackground>}

        </TouchableOpacity>

    </View>

  );

}
