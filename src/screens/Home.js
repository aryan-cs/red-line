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
        }}>

        <Floaty string = "floaty 1"/>
        <Floaty string = "floaty 2"/>
        <Floaty string = "floaty 3"/>
        <Floaty string = "floaty 4"/>
        <Floaty string = "floaty 5"/>
        <Floaty string = "floaty 6"/>

        {/* <Section>
          <SectionContent>
            <Text fontWeight="bold" style={{ textAlign: "center" }}>
              These UI components provided by Rapi UI
            </Text>
            <Button
              style={{ marginTop: 10 }}
              text="Rapi UI Documentation"
              status="info"
              onPress={() => Linking.openURL("https://rapi-ui.kikiding.space/")}
            />
            <Button
              text="Go to second screen"
              onPress={() => {
                navigation.navigate("SecondScreen");
              }}
              style={{
                marginTop: 10,
              }}
            />
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
          </SectionContent>
        </Section> */}

      </View>

    </ScrollView>

    </Layout>

  );

}
