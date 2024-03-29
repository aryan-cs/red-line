import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useTheme } from "react-native-rapi-ui";

import AppText from "../../components/AppText";
import AppTitle from "../../components/AppTitle";
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import Layout from "../../components/Layout";

import * as VARS from "../../../Vars";

import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {

  const { isDarkmode }  =  useTheme();
  const auth  =  getAuth();
  const [email, setEmail]  =  useState("");
  const [loading, setLoading]  =  useState(false);

  async function forget () {

    setLoading(true);
    await sendPasswordResetEmail(auth, email).then(function () {

      setLoading(false);
      navigation.navigate("Login");
      alert("Your password reset has been sent to your email");

    }).catch(function (error) {

      setLoading(false);
      alert(error);
      
    });

  }
  
  return (

    <KeyboardAvoidingView behavior = "height" enabled style = {{ flex: 1 }}>
      
      <Layout>

        <ScrollView contentContainerStyle = {{ flexGrow: 1 }}>
        
          <View
            style = {{
              flex: 3,
              paddingHorizontal: 20,
              justifyContent: "center",
              alignContent: "center",
              paddingBottom: 100,
            }}>

            <AppTitle style = {{ alignSelf: "center", textAlign: "center", padding: 10, fontSize: 48 }} string = "FORGOT PASSWORD" />

            <AppText style = {{ marginTop: 25, fontSize: 17 }} string = "Email" />

            <AppInput
              containerStyle = {{ marginTop: 15 }}
              placeholder = "Enter your email"
              value = {email}
              autoCapitalize = "none"
              autoCompleteType = "off"
              autoCorrect = {false}
              keyboardType = "email-address"
              onChangeText = {(text) => setEmail(text)}
              style = {{ marginTop: 10 }}
            />

            <AppButton
              style = {{ marginTop: 20 }}
              string = {loading ? "Loading" : "Send email"}
              onPress = {() => { forget(); }}
              disabled = {loading}
            />

            <View
              style = {{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
              }}>

              <TouchableOpacity

                onPress = {() => { navigation.navigate("Login"); }}>

                <Ionicons
                  name = {"arrow-back-outline"}
                  style = {{ marginTop: 20 }}
                  size = {24}
                  color = { isDarkmode ? VARS.dark4 : VARS.light4 } />

              </TouchableOpacity>

            </View>

          </View>

        </ScrollView>

      </Layout>

    </KeyboardAvoidingView>

  );

}
