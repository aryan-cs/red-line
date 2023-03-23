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

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

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
            borderColor: "transparent",
            ...style

          }}>

            {src == null ? <View style = {{
              
              backgroundColor: isDarkmode ? VARS.darkmodeBGaccent : "#1c1c1c",
              borderRadius: 10,
              zIndex: 2}}>

              <AppTitle style = {{
                
                fontSize: 30,
                paddingHorizontal: 10,
                alignContent: "flex-end",
                textAlign: "right",

                color: isDarkmode ? themeColor.white100 : VARS.redline,
                
              }} string = {title} />

              <AppText style = {{

                fontSize: 15,
                paddingHorizontal: 10,
                alignContent: "flex-end",
                textAlign: "right",
                color: isDarkmode ? themeColor.white100 : VARS.lightmodeBGaccent,
                 
              }} string = {desc} />

            </View> 
              
            :
              
            <ImageBackground
              source = {src}
              style = {{

                resizeMode: 'cover',
                height: "100%",
                width: "100%",
                zIndex: 1,
                position: "absolute",
                justifyContent: "flex-end",
                padding: 10,
                borderRadius: 10,
                backgroundColor: isDarkmode ? VARS.darkmodeBGaccent : "#1c1c1c",

              }}>

              <AppTitle style = {{
                
                fontSize: 30,
                marginRight: 7,
                alignSelf: "flex-end",
                textAlign:'right',
                zIndex: 3,
                color: isDarkmode ? themeColor.white100 : VARS.redline,
                
              }} string = {title} />

              <AppText style = {{
                
                fontSize: 18,
                marginRight: 7,
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
