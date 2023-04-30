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
  const [company, setCompany] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(null);
  const [engine, setEngine] = useState("");
  const [hp, setHP] = useState(null);
  const [loading, setLoading] = useState(false);

  const choosePhoto = async () => {

		let _image = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.Images,
		  allowsEditing: true,
		  aspect: [4, 3],
		  quality: 1,
		});

		if (!_image.canceled) {

      console.log("Image selected!");

			db.saveRideImage(_image.assets[0].uri, company + model + year);

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

          string = "ADD RIDE"
          style = {{

            marginTop: -20,
            fontSize: 45,
            textAlign: "center",
            justifyContent: "center",
            color: isDarkmode ? themeColor.white100 : themeColor.black

          }}/>

        </View>

        <View style = {{ flex: 1, padding: 15 }}>

          <AppText style = {{ marginTop: 15, fontSize: 17 }} string = "Make" />

          <AppInput
            containerStyle = {{ marginTop: 10 }}
            placeholder = "Enter company name"
            value = {company}
            autoCapitalize = "none"
            autoCompleteType = "off"
            autoCorrect = {false}
            keyboardType = "default"
            onChangeText = {(text) => setCompany(text)}
            style = {{ marginTop: 10 }}
          />

          <AppText style = {{ marginTop: 15, fontSize: 17 }} string = "Model" />

          <AppInput
            containerStyle = {{ marginTop: 10 }}
            placeholder = "Enter model name"
            value = {model}
            autoCapitalize = "none"
            autoCompleteType = "off"
            autoCorrect = {false}
            keyboardType = "default"
            onChangeText = {(text) => setModel(text)}
            style = {{ marginTop: 10 }}
          />

          <AppText style = {{ marginTop: 15, fontSize: 17 }} string = "Year" />

          <AppInput
            containerStyle = {{ marginTop: 10 }}
            placeholder = "Enter production year"
            value = {year}
            autoCapitalize = "none"
            autoCompleteType = "off"
            autoCorrect = {false}
            keyboardType = "number-pad"
            onChangeText = {(text) => setYear(text)}
            style = {{ marginTop: 10 }}
          />

          <AppText style = {{ marginTop: 15, fontSize: 17 }} string = "Engine" />

          <AppInput
            containerStyle = {{ marginTop: 10 }}
            placeholder = "Enter engine type"
            value = {engine}
            autoCapitalize = "none"
            autoCompleteType = "off"
            autoCorrect = {false}
            keyboardType = "default"
            onChangeText = {(text) => setEngine(text)}
            style = {{ marginTop: 10 }}
          />

          <AppText style = {{ marginTop: 15, fontSize: 17 }} string = "Horsepower" />

          <AppInput
            containerStyle = {{ marginTop: 10 }}
            placeholder = "Enter horsepower"
            value = {hp}
            autoCapitalize = "none"
            autoCompleteType = "off"
            autoCorrect = {false}
            keyboardType = "number-pad"
            onChangeText = {(text) => setHP(text)}
            style = {{ marginTop: 10 }}
          />

          <AppButton
            style = {{ marginTop: 30 }}
            string = {loading ? "Loading" : "Register"}
            onPress = {() => {

              if (company == "" || model == "" || year == null || engine == "" || hp == null) {

                alert("Please fill all fields!"); return;

              }

              setLoading(true);
              choosePhoto().then(() => {
                db.saveRide(company, model, parseInt(year), engine, parseInt(hp), 0).then(() => {
                  alert("Ride added!");
                  setLoading(false);
                  navigation.navigate("Your Ride");
                });
              });

            }}
            disabled = {loading}
          />

        </View>
      
      </View>

    </Layout>

  );

}
