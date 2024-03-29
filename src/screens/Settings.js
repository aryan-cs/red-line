import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { themeColor, useTheme, } from "react-native-rapi-ui";

import AppText from "../components/AppText";
import AppTitle from "../components/AppTitle";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import Floaty from "../components/Floaty";
import Layout from "../components/Layout";

import * as VARS from "../../Vars";
import * as db from "../../Firebase";

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

export default function ({ navigation }) {

  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  const [user, setUser] = React.useState(null);

  useEffect(() => {

		db.getUser()
		.then((user) => { setUser(user); })
		.catch((error) => { console.log("Error getting user: " + error); });

	}, []);

  const choosePhoto = async () => {

		let _image = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.Images,
		  allowsEditing: true,
		  aspect: [4, 3],
		  quality: 1,
		});
		if (!_image.canceled) {
			// setProfileImage(_image.assets[0].uri);
			db.saveUserImage(_image.assets[0].uri, user.uid + ".png");
		}

	};

  return (

    <Layout>

    <View style = {{
      
      flex: 1,
      marginTop: -60,
      paddingTop: 60,
      marginBottom: -35
      
    }}>

          <TouchableOpacity
						style = {{
							width: 80,
							height: 80,
							marginHorizontal: 20,
							marginVertical: 10,
							textAlign: "center",
							backgroundColor: "transparent"
						}}
						onPress = {() => { navigation.goBack(); }}>
							
						<Ionicons
							name = {"md-chevron-back"}
							style = {{}}
							size = {25}
							color = { isDarkmode ? themeColor.white100 : "black" }/>

					</TouchableOpacity>

      <View style = {{
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",

      }}>

      <AppTitle
      
        string = "SETTINGS"
        style = {{

          padding: 20,
          fontSize: 45,
          textAlign: "center",
          justifyContent: "center",
          color: isDarkmode ? themeColor.white100 : themeColor.black


        }}/>

      </View>

      <View style = {{ flex: 1, padding: 15 }}>

        <AppButton
          string = "Contact Us"
          status = {isDarkmode ? "success" : "warning"}
          onPress = {() => { alert("Feature coming soon!"); }}
          style = {{ marginTop: 10, width: 360, backgroundColor: isDarkmode ? VARS.darkModeAccent : VARS.light3 }}/>

        <AppButton
          string = "Report an Issue"
          status = {isDarkmode ? "success" : "warning"}
          onPress = {() => { alert("Feature coming soon!"); }}
          style = {{ marginTop: 10, width: 360, backgroundColor: isDarkmode ? VARS.darkModeAccent : VARS.light3 }}/>

        <AppButton
          string = {isDarkmode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          status = {isDarkmode ? "success" : "warning"}
          onPress = {() => { if (isDarkmode) { setTheme("light"); } else { setTheme("dark"); }}}
          style = {{ marginTop: 10, width: 360, backgroundColor: isDarkmode ? VARS.darkModeAccent : VARS.light3 }}/>

        {/* <AppButton
          string = {"Change profile picture"}
          status = {isDarkmode ? "success" : "warning"}
          onPress = {() => { choosePhoto(); }}
          style = {{ marginTop: 10, width: 360, backgroundColor: isDarkmode ? VARS.darkModeAccent : VARS.light3 }}/> */}

        <AppButton
          status = "danger"
          string = "Logout"
          onPress = {() => { signOut(auth); }}
          style = {{ marginTop: 10, backgroundColor: VARS.accent }}
        />

      </View>
      
    </View>

    </Layout>

  );

}
