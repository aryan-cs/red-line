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
          
            marginTop: 15,
            marginRight: 7,
            borderRadius: 10,
            width: 360,
            height: 200,
            zIndex: 1,
            borderColor: "transparent",
            backgroundColor: isDarkmode ? VARS.darkmodeBGaccent : "#1c1c1c",
            ...style

          }}>

            {/* <MapView
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}/> */}

            <ImageBackground
              source = { src }
              style = {{
                resizeMode: 'cover',
                height: 200,
                width: 360,
                zIndex: 1,
                position: "absolute",
                justifyContent: "flex-end",
                padding: 10,
                borderRadius: 10
                
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

            </ImageBackground>

        </TouchableOpacity>

    </View>

  );

}
