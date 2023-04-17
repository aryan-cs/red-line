import React, { useState } from "react";import { View, TouchableOpacity } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { Layout, themeColor, useTheme, } from "react-native-rapi-ui";

import AppText from "../components/AppText";
import AppTitle from "../components/AppTitle";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import Floaty from "../components/Floaty";

import * as VARS from "../../Vars";
import * as db from "../../Firebase";

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from "react-native-gesture-handler";

export default function ({ navigation }) {

  const { isDarkmode, setTheme } = useTheme();
  const [postTitle, setPostTitle] = useState("");
  const [postCaption, setPostCaption] = useState("");
  const [postDescription, setPostDescription] = useState(null);
  const [engine, setEngine] = useState("");
  const [hp, setHP] = useState(null);
  const [loading, setLoading] = useState(false);

  const choosePhoto = async () => {

		let _image = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.Images,
		  allowsEditing: true,
		  aspect: [16, 9],
		  quality: 1,
		});

		if (!_image.canceled) {
			
      db.getUser().then((user) => {

			  db.saveRideImage(_image.assets[0].uri, user.uid + Date.now());

      });

		}

	};

  return (

    <Layout>
      
      <View style = {{

        flex: 1,
        backgroundColor: isDarkmode ? VARS.darkmodeBG : VARS.lightmodeBG,
        marginTop: -60,
        paddingTop: 60,
        marginBottom: -35,

      }}>

        <TouchableOpacity
					style = {{
						width: 80,
						height: 80,
						marginHorizontal: 20,
						marginTop: 10,
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
          backgroundColor: isDarkmode ? VARS.darkmodeBG : VARS.lightmodeBG,
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",

        }}>

        <AppTitle

          string = "UPLOAD POST"
          style = {{

            marginTop: -20,
            fontSize: 45,
            textAlign: "center",
            justifyContent: "center",
            color: isDarkmode ? themeColor.white100 : themeColor.black

          }}/>

        </View>

        <View style = {{ flex: 1, padding: 15 }}>

          <AppText style = {{ marginTop: 15, fontSize: 17 }} string = "Title" />

          <AppInput
            containerStyle = {{ marginTop: 10 }}
            placeholder = "Enter post title"
            value = {postTitle}
            autoCapitalize = "none"
            autoCompleteType = "off"
            autoCorrect = {false}
            keyboardType = "default"
            onChangeText = {(text) => setPostTitle(text)}
            style = {{ marginTop: 10 }}
          />

          <AppText style = {{ marginTop: 15, fontSize: 17 }} string = "Caption" />

          <AppInput
            containerStyle = {{ marginTop: 10 }}
            placeholder = "Enter post caption"
            value = {postCaption}
            autoCapitalize = "none"
            autoCompleteType = "off"
            autoCorrect = {false}
            keyboardType = "default"
            onChangeText = {(text) => setPostCaption(text)}
            style = {{ marginTop: 10 }}
          />

          <AppText style = {{ marginTop: 15, fontSize: 17 }} string = "Description" />

          <AppInput
            containerStyle = {{ marginTop: 10 }}
            placeholder = "Enter post description"
            value = {postDescription}
            autoCapitalize = "none"
            autoCompleteType = "off"
            autoCorrect = {false}
            keyboardType = "default"
            onChangeText = {(text) => setPostDescription(text)}
            style = {{ marginTop: 10, paddingBottom: 150 }}
          />

          <AppButton
            style = {{ marginTop: 30 }}
            string = {loading ? "Loading" : "Post"}
            onPress = {() => {

              if (postTitle == "" || postCaption == "" || postDescription == null) {

                alert("Please fill all fields!"); return;

              }

              setLoading(true);
              // choosePhoto().then(() => {
                db.savePost(postTitle, postCaption, postDescription).then(() => {
                  alert("Uploaded post!");
                  setLoading(false);
                  navigation.navigate("Home");
                // });
              });

            }}
            disabled = {loading}
          />

        </View>
      
      </View>

    </Layout>

  );

}
