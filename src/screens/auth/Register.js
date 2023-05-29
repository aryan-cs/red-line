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
} from "react-native-rapi-ui";

import AppText from "../../components/AppText";
import AppTitle from "../../components/AppTitle";
import AppButton from "../../components/AppButton";
import AppInput from "../../components/AppInput";

import * as VARS from "../../../Vars";
import * as db from "../../../Firebase";

import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {

  const { isDarkmode } = useTheme();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function register () {

    // if (Dimensions.get("window").height < 850 || Dimensions.get("window").width < 390) {

    //   alert("This screen size is currently unsupported for this app. Please use a larger device.");

    //   return;

    // }

    // else {

      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        alert("Account created successfully!");
        db.saveUser(displayName, email, password);
      })
      .catch(function (error) {

        var errorCode = error.code;
        var errorMessage = error.message;
        setLoading(false);
        alert(errorMessage);

      });

    // }

  }

  return (
    
    <KeyboardAvoidingView behavior = "height" enabled style = {{ flex: 1 }}>
      
      <Layout>

        <ScrollView contentContainerStyle = {{ flexGrow: 1 }}>
        
          <View
            style = {{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
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

            <AppText style = {{ marginTop: 25, fontSize: 17 }} string = "Display Name" />

            <AppInput
              containerStyle = {{ marginTop: 15 }}
              placeholder = "Enter a display name"
              value = {displayName}
              autoCapitalize = "none"
              autoCompleteType = "off"
              autoCorrect = {false}
              keyboardType = "email-address"
              onChangeText = {(text) => setDisplayName(text)}
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
              style = {{ marginTop: 30 }}
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
