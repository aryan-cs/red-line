import React, { useState } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  Layout,
  useTheme,
} from "react-native-rapi-ui";

import AppText from "../../components/AppText";
import AppTitle from "../../components/AppTitle";
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";

import * as VARS from "../../../Vars";

export default function ({ navigation }) {

  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login () {

    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password).catch(function (error) {

      var errorCode  =  error.code;
      var errorMessage  =  error.message;
      setLoading(false);
      alert(errorMessage);

    });

  }

  return (

    <KeyboardAvoidingView
      behavior = "height"
      enabled style = {{
        
        flex: 1,
        backgroundColor: isDarkmode ? VARS.darkmodeBG : VARS.lightmodeBG,
        marginTop: -60,
        marginBottom: -60,
        
      }}>

      <Layout>

        {/* <ScrollView contentContainerStyle = {{ flexGrow: 1 }}> */}

          <View
            style = {{
              flex: 3,
              paddingHorizontal: 20,
              justifyContent: "center",
              paddingBottom: 30,
              backgroundColor: isDarkmode ? VARS.darkmodeBG : VARS.lightmodeBG,
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

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
              }}
            >

            </View>

            </View>

        {/* </ScrollView> */}

      </Layout>

    </KeyboardAvoidingView>

);

}
