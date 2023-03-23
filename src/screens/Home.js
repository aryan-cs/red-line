import React from "react";
import { View, Linking, ScrollView } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import {
  Layout,
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
            color = { isDarkmode ? themeColor.white100 : VARS.redline }/>}
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

        <Floaty
          title = "LAST CRUISE"
          desc = "You drove at James B. Conant High school" />

        <Floaty
          title = "UPCOMING MEET"
            desc = "March 18 | Schaumburg IKEA | 9:00 PM"
            src = {{ uri: "https://instagram.ford4-1.fna.fbcdn.net/v/t51.2885-15/331968637_2175413092659571_5100042604406842280_n.jpg?stp=dst-jpg_e35_s1080x1080&_nc_ht=instagram.ford4-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=cSv39Qzd8QcAX9FrgdM&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzA1MjI5NzY3OTg3NTQ3NDE1MQ%3D%3D.2-ccb7-5&oh=00_AfCI9vTkN8wndexmh6GIo6rPYOb7n-TJ21XyLFX-YQXDEA&oe=64179A4F&_nc_sid=1527a3" }}/>

        <Floaty
          title = "WELCOME!"
          desc = "Thank you for joining Red Line!"
          src = { require("../../assets/banner.png") }/>

      </View>

    </ScrollView>

    </View>

    </View>

    </Layout>

  );

}
