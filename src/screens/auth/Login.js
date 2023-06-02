import React, { useState } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Dimensions
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useTheme } from "react-native-rapi-ui";

import AppText from "../../components/AppText";
import AppTitle from "../../components/AppTitle";
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";
import Layout from "../../components/Layout";

import * as VARS from "../../../Vars";
import * as db from "../../../Firebase";

export default function ({ navigation }) {

  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login () {

    if (Dimensions.get("window").height < 850 || Dimensions.get("window").width < 390) {

      alert("This screen size is currently unsupported for this app. Please use a larger device.");

      return;

    }

    else {

      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password)
      .catch(function (error) {

        var errorCode  =  error.code;
        var errorMessage  =  error.message;
        setLoading(false);
        alert(errorMessage);

      });

    }

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
              paddingBottom: 90,
            }}>

            <AppTitle style = {{ alignSelf: "center", padding: 30, fontSize: 60 }} string = "LOG IN" />

            <AppText style = {{ marginTop: 25, fontSize: 17 }} string = "Email" />

            <AppInput
              containerStyle = {{ marginTop: 10 }}
              placeholder = "Enter your email"
              value = {email}
              autoCapitalize = "none"
              autoCompleteType = "off"
              autoCorrect = {false}
              keyboardType = "email-address"
              onChangeText = {(text) => setEmail(text)}
              style = {{ marginTop: 10 }}
            />

            <AppText style = {{ marginTop: 25, fontSize: 17 }} string = "Password" />

            <AppInput
              containerStyle = {{ marginTop: 10 }}
              placeholder = "Enter your password"
              value = {password}
              autoCapitalize = "none"
              autoCompleteType = "off"
              autoCorrect = {false}
              secureTextEntry = {true}
              onChangeText = {(text) => setPassword(text)}
              style = {{ marginTop: 10 }}
            />

            <AppButton
              style = {{ marginTop: 30 }}
              string = {loading ? "Loading" : "Continue"}
              onPress = {() => { login(); }}
              disabled = {loading}
            />

            <AppButton
              style = {{ marginTop: 15 }}
              string = {loading ? "Loading" : "Register"}
              onPress = {() => { navigation.navigate("Register"); }}
              disabled = {loading}
            />

            <AppButton
              style = {{ marginTop: 15 }}
              string = {loading ? "Loading" : "Forgot Password"}
              onPress = {() => { navigation.navigate("ForgetPassword"); }}
              disabled = {loading}
            />

          </View>

        </ScrollView>

      </Layout>

    </KeyboardAvoidingView>

);

}
