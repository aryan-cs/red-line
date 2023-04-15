import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { useTheme } from "react-native-rapi-ui";

import AppText from "../components/AppText";
import AppTitle from "../components/AppTitle";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import Floaty from "../components/Floaty";

import * as VARS from "../../Vars";
import * as db from "../../Firebase";

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
export const SLIDER_HEIGHT = Dimensions.get('window').height;
export const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.7);

const { isDarkmode, setTheme } = useTheme();

const CarouselCardItem = ({ item, index }) => {

  return (

    <View style = {{
      backgroundColor: 'white',
      borderRadius: 8,
      width: ITEM_WIDTH,
      height: ITEM_HEIGHT,
      margin: 10,
      alignSelf: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3, },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 7,
      backgroundColor: isDarkmode ? VARS.darkmodeBG : VARS.lightmodeBG,
    }} key = {index}>

      <AppTitle string = {item.company}
        style = {{
          color: "#222",
          fontSize: 28,
          fontWeight: "bold",
          paddingLeft: 20,
          paddingTop: 20
        }}/>

    </View>

  );

}

export default CarouselCardItem;