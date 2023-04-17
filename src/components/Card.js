import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Dimensions, ImageBackground, Image, TouchableOpacity } from "react-native";

import AppText from "../components/AppText";
import AppTitle from "../components/AppTitle";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import Floaty from "../components/Floaty";

import * as VARS from "../../Vars";
import * as db from "../../Firebase";

import { Ionicons } from "@expo/vector-icons";

export const SLIDER_WIDTH = Dimensions.get('window').width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
export const SLIDER_HEIGHT = Dimensions.get('window').height;
export const ITEM_HEIGHT = Math.round(SLIDER_HEIGHT * 0.7);

export default function ({ item, index }) {

  // const [image, setImage] = useState(item.image);

  // useEffect(() => {

  //   db.getRideImage(item.company + item.model + item.year)
  //   .then((url) => { setImage(url); });

  // }, []);

  if (!item.image) {

    return (

      <View style = {{
        backgroundColor: 'white',
        width: ITEM_WIDTH,
        height: ITEM_HEIGHT,
        margin: 10,
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3, },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 7,
        borderRadius: 20,
      }} key = {index}>
  
        <ActivityIndicator
          size = "large"
          color = {VARS.midGray}
          style = {{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
  
      </View>

    );

  }
  
  else {

  return (

    <View style = {{
      backgroundColor: 'white',
      width: ITEM_WIDTH,
      height: ITEM_HEIGHT,
      margin: 10,
      alignSelf: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3, },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 7,
      borderRadius: 20,
    }} key = {index}>

      <ImageBackground
        source = {{ uri: item.image }}
        blurRadius = {Platform.OS === 'ios' ? 100 : 50}
        style = {{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          borderRadius: 20,
        }}>

        <AppTitle string = {item.company}
          style = {{
            color: "#FFFFFF70",
            fontSize: item.image ? 28 : 30,
            fontWeight: "bold",
            paddingLeft: 20,
            paddingTop: 20
          }}/>

        <AppTitle string = {item.model.toUpperCase()}
          style = {{
            color: "#FFFFFF70",
            fontSize: item.image ? 68 : "70%",
            fontWeight: "bold",
            paddingLeft: 20,
          }}/>

        <Image source = {{ uri: item.image }}
          style = {{
            alignSelf: "center",
            width: "90%",
            height: item.image ? 180 : "30%",
            borderRadius: 8,
            shadowColor: "black",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: .25,
            shadowRadius: 8,  
            elevation: 1,
            margin: 20
          }}/>

        <View
          style = {{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20,
            marginHorizontal: 20,
          }}>

          <AppText string = {item.model} style = {{ paddingLeft: 0, fontSize: 20, color: "#FFFFFF70" }} />
          <AppText string = "|" style = {{ paddingLeft: 0, fontSize: 20, color: "#FFFFFF70" }} />
          <AppText string = {item.year} style = {{ paddingLeft: 0, fontSize: 20, color: "#FFFFFF70" }} />
          <AppText string = "|" style = {{ paddingLeft: 0, fontSize: 20, color: "#FFFFFF70" }} />
          <AppText string = {item.engine} style = {{ paddingLeft: 0, fontSize: 20, color: "#FFFFFF70" }} />
          <AppText string = "|" style = {{ paddingLeft: 0, fontSize: 20, color: "#FFFFFF70" }} />
          <AppText string = {item.hp + " HP"} style = {{ paddingLeft: 0, fontSize: 20, color: "#FFFFFF70" }} />

        </View>

        <AppTitle
          string = {item.miles + (item.miles == 1 ? " mile" : " miles")}
          style = {{
            marginHorizontal: 15,
            marginBottom: 60,
            fontSize: 30,
            color: "#FFFFFF70",
            textAlign: "right"
          }} />

        <View
          style = {{
            position: "absolute",
            bottom: 0,
            right: 0,
            backgroundColor: VARS.redline,
            borderRadius: "100%",
            marginBottom: 10,
            marginRight: 10,
          }}>

          <AppTitle
            string = {item.topSpeed + " mph"}
            style = {{
              color: "white",
              paddingVertical: 10,
              paddingHorizontal: 20,
              fontSize: 40,
            }} />

          </View>

          <View
            style = {{
              position: "absolute",
              bottom: 0,
              left: 0,
            }}>

            <TouchableOpacity
						style = {{
							width: 80,
							height: 80,
							marginHorizontal: 20,
							marginVertical: -35,
							textAlign: "center",
							backgroundColor: "transparent"
						}}
						onPress = {() => {
              alert("Activated the " + item.company + " " + item.model + "!");
              db.setCurrentRide(item);
            }}>
							
						<Ionicons
							name = {"md-key"}
							style = {{}}
							size = {25}
							color = "#FFFFFF70"/>

					  </TouchableOpacity>

          </View>

      </ImageBackground>

    </View>

  );

  }

}