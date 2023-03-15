import React from "react";
import { View, Linking, ScrollView } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import {
  Layout,
  Button,
  useTheme,
  themeColor
} from "react-native-rapi-ui";

import AppText from "../../src/components/AppText";
import AppTitle from "../../src/components/AppTitle";
import AppButton from "../../src/components/AppButton";
import AppInput from "../../src/components/AppInput";
import Floaty from "../../src/components/Floaty";

import * as VARS from "../../Vars";

import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {

  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();

  return (

    <Layout>

    <View style = {{ flex: 1, backgroundColor: isDarkmode ? VARS.darkmodeBG : VARS.lightmodeBG }}>

    <View style = {{
						
      width: 400,
      height: 800,
      marginTop: -60,
      padding: 15,
      paddingTop: 60,
      backgroundColor: isDarkmode ? VARS.darkmodeBGdarker : VARS.lightmodeBG,
                
    }}>

      <AppButton
        string = {
          <Ionicons
            name = {"ios-settings-sharp"}
            style = {{}}
            size = {25}
            color = { isDarkmode ? themeColor.white100 : VARS.redlineBrighter }/>}
        status = {isDarkmode ? "success" : "warning"}
        onPress = {() => { navigation.navigate("Settings"); }}
        style = {{
          width: 40,
          height: 40,
          borderRadius: 50,
          top: -10,
          marginLeft: 330,
          padding: 0,
          textAlign: "center",
          justifyContent: "center",
          backgroundColor: "transparent"

        }} />

    <ScrollView contentContainerStyle = {{ flexGrow: 1 }}>

      <View
        style = {{
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
          marginBottom: 20,
        }}>

        <Floaty title = "LAST CRUISE" desc = "You drove at James B. Conant High school"/>

        <Floaty title = "UPCOMING MEET" desc = "March 18 | Schaumburg IKEA | 9:00 PM"/>

        <Floaty title = "WELCOME!" desc = "Thank you for joining Red Line!" src = "../../assets/banner.png"/>

      </View>

    </ScrollView>

    </View>

    </View>

    </Layout>

  );

}
