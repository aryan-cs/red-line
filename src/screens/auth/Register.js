import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  Layout,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";

import AppText from "../../components/AppText";
import AppTitle from "../../components/AppTitle";
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";

import * as VARS from "../../../Vars";

import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {

  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function register () {

    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password).catch(function (error) {

      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      setLoading(false);
      alert(errorMessage);

    });

  }

  return (
    
    <KeyboardAvoidingView behavior = "height" enabled style = {{ flex: 1, marginTop: -60, marginBottom: -60 }}>
      
      <Layout>
        
          <View
            style = {{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? VARS.darkmodeBG : VARS.lightmodeBG,
              justifyContent: "center"
            }}>

            <AppTitle style = {{ alignSelf: "center", textAlign: "center", padding: 10, fontSize: 60 }} string = "REGISTER" />

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

            <AppText style = {{ marginTop: 25, fontSize: 17 }} string = "Password" />

            <AppInput
              containerStyle = {{ marginTop: 15 }}
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
              string = {loading ? "Loading" : "Create an account"}
              onPress = {() => { register(); }}
              style = {{ marginTop: 20 }}
              disabled = {loading}
            />

            <View
              style = {{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
              }}>

              {/* <AppText style = {{ marginTop: 25, fontSize: 17 }} string = "Already have an account? " /> */}

              <TouchableOpacity

                onPress = {() => { navigation.navigate("Login"); }}>

                <Ionicons
                  name = {"arrow-back-outline"}
                  style = {{ marginTop: 20 }}
                  size = {24}
                  color = { isDarkmode ? themeColor.white100 : VARS.midGray }/>

                {/* <AppText style = {{ marginTop: 25, fontSize: 17 }} string = "Go back" /> */}

              </TouchableOpacity>

            </View>

          </View>

      </Layout>

    </KeyboardAvoidingView>

  );
}
