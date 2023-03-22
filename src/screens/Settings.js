import React from "react";
import { View } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import {
  Layout,
  themeColor,
  useTheme,
  Button
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
      width: 400,
      height: 800,
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

      <AppTitle
      
        string = "SETTINGS"
        style = {{

          padding: 20,
          paddingTop: 10,
          marginLeft: 60,
          fontSize: 25,
          textAlign: "center",
          justifyContent: "center",
          color: isDarkmode ? themeColor.white100 : themeColor.black


        }}/>

      </View>

      <View style = {{ flex: 1, padding: 15 }}>

        <AppButton
          string = "Contact Us"
          status = {isDarkmode ? "success" : "warning"}
          onPress = {() => { alert("Feature coming soon!"); }}
          style = {{ marginTop: 10, width: 360, backgroundColor: isDarkmode ? VARS.darkmodeBGaccent : VARS.midGray }}/>

        <AppButton
          string = "Report an Issue"
          status = {isDarkmode ? "success" : "warning"}
          onPress = {() => { alert("Feature coming soon!"); }}
          style = {{ marginTop: 10, width: 360, backgroundColor: isDarkmode ? VARS.darkmodeBGaccent : VARS.midGray }}/>

        <AppButton
          string = {isDarkmode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          status = {isDarkmode ? "success" : "warning"}
          onPress = {() => { if (isDarkmode) { setTheme("light"); } else { setTheme("dark"); }}}
          style = {{ marginTop: 10, width: 360, backgroundColor: isDarkmode ? VARS.darkmodeBGaccent : VARS.midGray }}/>

        <AppButton
          status = "danger"
          string = "Logout"
          onPress = {() => { signOut(auth); }}
          style = {{ marginTop: 10, backgroundColor: VARS.redline }}
        />

      </View>
      
    </View>

    </Layout>

  );

}
