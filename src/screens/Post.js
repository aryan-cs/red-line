import React, { useEffect } from "react";
import { ImageBackground, View } from "react-native";
import {
  themeColor,
  useTheme,
} from "react-native-rapi-ui";

import AppText from "../components/AppText";
import AppTitle from "../components/AppTitle";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import Floaty from "../components/Floaty";
import Layout from "../components/Layout";

import * as VARS from "../../Vars";

import { Ionicons } from "@expo/vector-icons";

function Post ({ route, navigation }) {

  const { isDarkmode, setTheme } = useTheme();
  let time = new Date(route.params.date);

  return (

    <Layout>

    <View style = {{
      
      flex: 1,
      marginTop: -60,
      paddingTop: 60,
      marginBottom: -35
      
    }}>

      <View style = {{ flexDirection: "row" }}>

        <AppButton
          string = {
            <Ionicons
              name = {"chevron-back"}
              style = {{}}
              size = {25}
              color = { isDarkmode ? themeColor.white100 : themeColor.black }/>}
          status = {isDarkmode ? "success" : "warning"}
          onPress = {() => { navigation.goBack(); }}
          style = {{
            width: 50,
            height: 50,
            borderRadius: 50,
            padding: 0,
            left: 10,
            justifyContent: "center",
            backgroundColor: "transparent"
          }} />

      </View>

      <View style = {{ flex: 1 }}>

        <View style = {{
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}>

            <AppTitle
              string = {route.params.title}
              style = {{

                fontSize: 50,
                marginHorizontal: 0,
                marginVertical: 10,
                color: VARS.accent,
                fontWeight: "bold",
                textAlign: "center",
                backgroundColor: "transparent"

              }} />

      </View>

      <AppText
        string = {route.params.text}
        style = {{

          fontSize: 16,
          paddingHorizontal: 20,
          marginHorizontal: 0,
          marginVertical: 10,
          color: isDarkmode ? themeColor.white100 : themeColor.black,
          fontWeight: "bold",
          textAlign: "left",
          backgroundColor: "transparent"

        }}/>

      <AppText
        string = {route.params.user + " on " + time.toString().substring(0, time.toString().indexOf("GMT"))}
        style = {{

          fontSize: 16,
          paddingHorizontal: 20,
          marginHorizontal: 0,
          marginVertical: 30,
          color: isDarkmode ? themeColor.white100 : themeColor.black,
          fontWeight: "bold",
          textAlign: "left",
          color: "#666666",
          backgroundColor: "transparent"

        }}/>
      
    </View>

    </View>

    </Layout>

  );

}

export default Post;