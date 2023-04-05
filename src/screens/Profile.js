import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Layout, useTheme, themeColor } from 'react-native-rapi-ui';

import AppText from "../components/AppText";
import AppTitle from "../components/AppTitle";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import Floaty from "../components/Floaty";

import * as VARS from "../../Vars";
import * as db from "../../Firebase";

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

export default function ({ navigation }) {

	const { isDarkmode, setTheme } = useTheme();
	const [user, setUser] = React.useState(null);
	const [username, setUsername] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [profileImage, setProfileImage] = React.useState();
	
	useEffect(() => {

		db.getUser()
		.then((user) => {
			
			setUser(user);
			setUsername(user.username);
			setEmail(user.email);
		
		})
		.catch((error) => { console.log("Error getting user: " + error); });

		db.getUserImage("default.png")
		.then((image) => { setProfileImage(image); });

	}, []);

	

	const choosePhoto = async () => {
		let _image = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.Images,
		  allowsEditing: true,
		  aspect: [4, 3],
		  quality: 1,
		});
		if (!_image.canceled) {
			setProfileImage(_image.assets[0].uri);
			db.saveUserImage(_image.assets[0].uri, user.uid + ".png");
		}
	  };

	return (

		<Layout>

			<View style = {{

				marginTop: -60,
				paddingTop: 60,
				marginBottom: -35,
				paddingBottom: 35,
				flex: 1,
				backgroundColor: isDarkmode ? VARS.darkmodeBG : VARS.lightmodeBG,

			}}>

					<TouchableOpacity
						style = {{
							width: 25,
							height: 25,
							marginLeft: "88%",
							marginHorizontal: 20,
							textAlign: "center",
							backgroundColor: "transparent",
							zIndex: 1,
						}}
						onPress = {() => { navigation.navigate("Settings"); }}>
							
						<Ionicons
							name = {"ios-settings-sharp"}
							style = {{}}
							size = {25}
							color = { themeColor.white100 }/>

					</TouchableOpacity>

					<View style = {{

						width: "100%",
						height: "45%",
						backgroundColor: isDarkmode ? "#2b2b2b" : VARS.redline,
						marginTop: "-50%",
						justifyContent: "flex-end",
						alignItems: "flex-end",
						shadowColor: "black",
    		  			shadowOffset: { width: 0, height: 2 },
    		  			shadowOpacity: .25,
    		  			shadowRadius: 8,  
    		  			elevation: 1,

					}}>

						<AppTitle style = {{
							fontSize: 40,
							marginHorizontal: 10,
							color: themeColor.white100,
						}}
						string = {username}/>

						<AppText style = {{
							fontSize: 15,
							marginHorizontal: 15,
							marginBottom: 10,
							color: themeColor.white100 + "b3",
						}}
						string = {email}/>

					</View>

					<Image style = {{
							width: 100,
							height: 100,
							marginTop: -50,
							marginLeft: 20,
							borderRadius: "100%",
							marginBottom: 10,
							backgroundColor: isDarkmode ? "#2b2b2b" : VARS.redline,
							borderWidth: 8,
							borderColor: isDarkmode ? "#2b2b2b" : VARS.redline,
							shadowColor: "black",
							shadowOffset: { width: 0, height: 0 },
							shadowOpacity: .25,
							shadowRadius: 8,  
							elevation: 1,
						}}
						// defaultSource = {require("../../assets/default.png")}
						source = {{ uri: profileImage }}/>

					<View style = {{
						marginHorizontal: 20,
						flex: 1,
						flexDirection: "row",
						justifyContent: "space-between",
						alignContent: "flex-end",
						alignItems: "flex-end",
					}}>

						<AppButton style = {{
							marginBottom: 10,
							width: 170,
							backgroundColor: isDarkmode ? "#2b2b2b" : VARS.redline,
						}}
						string = "Upload picture"
						onPress = {() => {

							choosePhoto();

							// db.saveUserImage(require("../../assets/default.png"), db.auth.currentUser.uid + ".png");
						}}/>

					</View>				

			</View>

		</Layout>

	);

}
