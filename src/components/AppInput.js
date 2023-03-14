import { themeColor, useTheme } from "react-native-rapi-ui";
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import { TextInput } from "react-native";
import * as SplashScreen from 'expo-splash-screen';

import * as VARS from "../../Vars";

export default function AppInput ({containerStyle, placeholder, value, autoCapitalize, autoCompleteType, autoCorrect, secureTextEntry, keyboardType, onChangeText, style}) {

    const { theme, isDarkmode } = useTheme();

    const [fontsLoaded] = useFonts({
        'Barlow': require('../../assets/fonts/barlow.ttf'),
    });
    
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) { await SplashScreen.hideAsync(); }
    }, [fontsLoaded]);
    
    if (!fontsLoaded) { return null; }

    return (

        <TextInput
            containerStyle = {containerStyle}
            placeholder = {placeholder}
            value = {value}
            autoCapitalize = {autoCapitalize}
            autoCompleteType = {autoCompleteType}
            autoCorrect = {autoCorrect}
            secureTextEntry = {secureTextEntry}
            keyboardType = {keyboardType}
            onChangeText = {onChangeText}
            theme = {{ fonts: { regular: "Barlow" } }}
            placeholderTextColor = {VARS.midGray}
            style = {{

                fontFamily: "Barlow",
                padding: 12,
                borderRadius: 10,
                borderColor: "transparent",
                color: isDarkmode ? VARS.lightmodeBGaccent : VARS.darkmodeBGaccent,
                backgroundColor: isDarkmode ? VARS.darkmodeBGaccent : VARS.lightmodeBGaccent,
                ...style

            }}>



        </TextInput>

    );

}
