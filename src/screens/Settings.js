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
        flexDirection: "row"
      }}>

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

      {/* <TopNav
        middleContent="Settings"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.black}
          />
        }
        style = {{

          color: "red",
          fontFamily: "Montserrat",

        }}
        leftAction = {() => navigation.goBack()}
      /> */}

      <View
        style={{
          flex: 1,
        }}
      >

            <Button
              status="danger"
              text="Logout"
              onPress={() => {
                signOut(auth);
              }}
              style={{
                marginTop: 10,
              }}
            />
            <Button
              text={isDarkmode ? "Light Mode" : "Dark Mode"}
              status={isDarkmode ? "success" : "warning"}
              onPress={() => {
                if (isDarkmode) {
                  setTheme("light");
                } else {
                  setTheme("dark");
                }
              }}
              style={{
                marginTop: 10,
              }}
            />

      </View>

    </Layout>

  );

}
