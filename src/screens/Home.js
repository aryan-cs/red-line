import React from "react";
import { View, Linking, ScrollView } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import {
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

    <View style = {{ flex: 1, backgroundColor: isDarkmode ? VARS.darkmodeBG : VARS.lightmodeBG }}>

    <View style = {{
						
      marginTop: -60,
      paddingTop: 60,
      backgroundColor: isDarkmode ? VARS.darkmodeBGdarker : VARS.lightmodeBG,
                
    }}>

    <ScrollView contentContainerStyle = {{ flexGrow: 1 }}>

      <View
        style = {{
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
          marginTop: 60,
          marginBottom: 60
        }}>

        <Floaty
          title = "NEXT MEET"
          desc = "Information for the next car meet will be posted here."
          src = {{ uri: "https://static1.hotcarsimages.com/wordpress/wp-content/uploads/2021/05/shutterstock_1327560506.jpg" }}
          navigation = {navigation}
        />

        <Floaty
          title = "TEST POST"
          desc = "This post will eventually become clickable and will lead to a page with more information about the event."
          navigation = {navigation}
        />

        <Floaty
          title = "LAST CRUISE"
          desc = "Map integration coming soon!"
          cords = "39.100483, 125.930597"
          navigation = {navigation}
        />

        <Floaty
          title = "WELCOME!"
          desc = "Thank you for joining Red Line!"
          src = { require("../../assets/banner.png") }
          navigation = {navigation}
        />

      </View>

    </ScrollView>

    </View>

    <AppButton
        string = {
          <Ionicons
            name = {"ios-add"}
            style = {{}}
            size = {38}
            color = {themeColor.white100}/>}
        status = {isDarkmode ? "success" : "warning"}
        onPress = {() => { alert("Feature coming soon!"); }}
        style = {{
          width: 70,
          height: 70,
          borderRadius: 999,
          bottom: 90,
          marginLeft: 310,
          padding: 0,
          textAlign: "center",
          justifyContent: "center",
          backgroundColor: VARS.redline,

          shadowColor: "black",
    			shadowOffset: { width: 0, height: 3 },
    			shadowOpacity: .5,
    			shadowRadius: 6,  
    			elevation: 1

        }} />

    </View>

  );

}
