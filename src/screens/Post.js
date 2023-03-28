import React from "react";
import { ImageBackground, View } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import {
  Layout,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";

import AppText from "../components/AppText";
import AppTitle from "../components/AppTitle";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import Floaty from "../components/Floaty";

import * as VARS from "../../Vars";

import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {

  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();

  return (

    <Layout>

    <View style = {{
      
      flex: 1,
      backgroundColor: isDarkmode ? VARS.darkmodeBG : VARS.lightmodeBG,
      marginTop: -60,
      paddingTop: 60,
      marginBottom: -35
      
    }}>

      <View style = {{ flexDirection: "row", backgroundColor: isDarkmode ? VARS.darkmodeBG : VARS.lightmodeBG, }}>

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
              string = {"POST"}
              style = {{

                fontSize: 50,
                marginHorizontal: 0,
                marginVertical: 10,
                color: VARS.redline,
                fontWeight: "bold",
                textAlign: "right",
                backgroundColor: "transparent"

              }} />

      </View>
      
    </View>

    </View>

    </Layout>

  );

}