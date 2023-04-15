import React, { useEffect, useState } from 'react';
import { View } from "react-native";
import { useTheme, themeColor } from "react-native-rapi-ui";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './Card';

import AppText from "../components/AppText";
import AppTitle from "../components/AppTitle";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import Floaty from "../components/Floaty";

import * as VARS from "../../Vars";
import * as db from "../../Firebase";

const CarouselCards = () => {

  const { isDarkmode, setTheme } = useTheme();
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);
  const [rides, setRides] = React.useState([]);

  useEffect(() => { db.getRides().then((data) => { setRides(data); }); }, []);
   
  return (

    <View style = {{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: 40,
      backgroundColor: isDarkmode ? VARS.darkmodeBG : VARS.lightmodeBG
    }}>

      <Carousel
        layout = "tinder"
        layoutCardOffset = {9}
        ref = {isCarousel}
        data = {rides}
        renderItem = {CarouselCardItem}
        sliderWidth = {SLIDER_WIDTH}
        itemWidth = {ITEM_WIDTH}
        onSnapToItem = {(index) => setIndex(index)}
        useScrollView = {true}
      />

      <Pagination
        dotsLength = {rides.length}
        activeDotIndex = {index}
        carouselRef = {isCarousel}
        dotStyle = {{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.92)'
        }}
        inactiveDotOpacity = {0.4}
        inactiveDotScale = {0.6}
        tappableDots = {true}
      />

    </View>

  );

}

export default CarouselCards;