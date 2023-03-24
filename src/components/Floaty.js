import { themeColor, useTheme } from "react-native-rapi-ui";
import { useCallback, useRef } from 'react';
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

export default function Floaty ({style, title, desc, src, cords, onPress, background}) {

  const { theme, isDarkmode } = useTheme();
  const mapRef = useRef(null);

  const [fontsLoaded] = useFonts({
    'Barlow': require('../../assets/fonts/barlow.ttf'),
    'Montserrat': require('../../assets/fonts/montserrat.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) { await SplashScreen.hideAsync(); }
  }, [fontsLoaded]);

  if (!fontsLoaded) { return null; }

  const content = (type) => {

    var col = [themeColor.white100, VARS.lightmodeBGaccent];

    if (type === "map") { col = [themeColor.white100, VARS.darkmodeBGaccent]; }

    return (<>

      <AppTitle style = {{
                
        fontSize: 30,
        marginHorizontal: 16,
        alignSelf: "flex-end",
        textAlign:'right',
        zIndex: 3,
        color: VARS.redline,
                
      }} string = {title} />

      <AppText style = {{
                
        fontSize: 14,
        marginHorizontal: 16,
        marginBottom: 22,
        alignSelf: "flex-end",
        textAlign:'right',
        zIndex: 3,
        color: isDarkmode ? col[0] : col[1],
                
      }} string = {desc} />
    
    </>);

  };

  if (src !== undefined && src !== null) {
    
    return (

      <View onLayout = {onLayoutRootView}>

      <TouchableOpacity style = {{
          
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

              {content("image")}
                
            </ImageBackground>

        </TouchableOpacity>

    </View>

    );
  
  }

  else if (cords !== undefined && cords !== null) {

    return (
    
      <View onLayout = {onLayoutRootView}>

        <TouchableOpacity style = {{
          
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

          <View style = {{

              backgroundColor: isDarkmode ? VARS.darkmodeBGaccent : "#1c1c1c",
              borderRadius: 10,
              height: "100%",
              width: "100%",
              justifyContent: "flex-end",
              zIndex: 2
              
          }}>

            <MapView style = {{

              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
              borderRadius: 10,

            }}

            initialRegion = {{

              latitude: parseFloat(cords.substring(0, cords.indexOf(","))),
              longitude: parseFloat(cords.substring(cords.indexOf(",") + 1)),
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,

            }}

            userInterfaceStyle = {isDarkmode ? "dark" : "light"}
            pointerEvents = "none"
            // customMapStyle = {mapStyle}
            />

            {content("map")}
              
          </View>

        </TouchableOpacity>

      </View>

    );
  
  }

  else {

    return (
    
      <View onLayout = {onLayoutRootView}>

        <TouchableOpacity
            
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

              <View style = {{

                backgroundColor: isDarkmode ? VARS.darkmodeBGaccent : "#1c1c1c",
                borderRadius: 10,
                height: "100%",
                width: "100%",
                justifyContent: "flex-end",
                zIndex: 2

              }}>

                {content("normal")}

          </View>

        </TouchableOpacity>

      </View>

    );
  
  }

}
