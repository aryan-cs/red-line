import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme, themeColor } from 'react-native-rapi-ui';

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

	const { isDarkmode } = useTheme();
	const [user, setUser] = React.useState(null);
	const [username, setUsername] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [profileImage, setProfileImage] = React.useState();
	const [createdDate, setCreatedDate] = React.useState();
	const [lastSignIn, setLastSignIn] = React.useState();
	const [rides, setRides] = React.useState([]);
	const [milesDriven, setMilesDriven] = React.useState(0);
	const [topSpeed, setTopSpeed] = React.useState(0);
	const [currentRide, setCurrentRide] = React.useState(null);
	
	useEffect(() => {

		let data = db.auth.currentUser;
		setCreatedDate(data.metadata.creationTime);
		setLastSignIn(data.metadata.lastSignInTime);

		db.getUser()
		.then((user) => {
			
			setUser(user);
			setUsername(user.username);
			setEmail(user.email);
			setCurrentRide(user.currentRide.year + " " + user.currentRide.company + " " + user.currentRide.model);

			db.getUserImage(user.uid)
			.then((image) => { setProfileImage(image); });
		
		})
		.catch((error) => { console.log("Error getting user: " + error); });

		db.getRides()
		.then((rides) => {

			let _miles = 0;
			let _topSpeed = 0;

			for (let i = 0; i < rides.length; i++) {

				_miles += parseInt(rides[i].miles);

				if (rides[i].topSpeed > _topSpeed) { _topSpeed = rides[i].topSpeed; }

			}

			setRides(rides);
			setMilesDriven(_miles);
			setTopSpeed(_topSpeed);

		})
		.catch((error) => { console.log("Error getting rides: " + error); });

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

			<View style = {{ flex: 1 }}>

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
						backgroundColor: isDarkmode ? VARS.darkModeAccent : VARS.accent,
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
							width: 250,
							textAlign: "right",

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
							backgroundColor: isDarkmode ? VARS.darkModeAccent : VARS.accent,
							borderWidth: 8,
							borderColor: isDarkmode ? VARS.darkModeAccent : VARS.accent,
							shadowColor: "black",
							shadowOffset: { width: 0, height: 0 },
							shadowOpacity: .25,
							shadowRadius: 8,  
							elevation: 1,
						}}
						defaultSource = {require("../../assets/default.png")}
						source = {{ uri: profileImage }}/>

					<View style = {{
						marginHorizontal: 20,
						marginTop: 10,
						paddingTop: 15,
						borderRadius: 15,
						flex: 1,
						flexDirection: "column",
						justifyContent: "center",
						backgroundColor: isDarkmode ? VARS.darkModeAccent : VARS.lightModeAccent,
					}}>

						<AppText style = {{
							fontSize: 18,
							margin: 7,
							paddingHorizontal: 15,
							color: isDarkmode ? themeColor.white100 : themeColor.black100,
						}}
						string = {"Joined on " + (new Date(createdDate)).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}/>

						<AppText style = {{
							fontSize: 18,
							margin: 7,
							paddingHorizontal: 15,
							color: isDarkmode ? themeColor.white100 : themeColor.black100,
						}}
						string = {"Last seen on " + (new Date(lastSignIn)).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}/>

						<AppText style = {{
							fontSize: 18,
							margin: 7,
							paddingHorizontal: 15,
							color: isDarkmode ? themeColor.white100 : themeColor.black100,
						}}
						string = {"Currently driving their " + currentRide }/>

						<View style = {{
							flexDirection: "column",
							justifyContent: "space-between",
							paddingTop: 20,
						}}>

						<View style = {{
							flexDirection: "column",
							marginBottom: 10,
						}}>

							<AppTitle style = {{
								fontSize: 30,
								color: isDarkmode ? themeColor.white100 : themeColor.black100,
								textAlign: "center",
							}}
							string = {rides.length}/>

							<AppText style = {{
								fontSize: 18,
								margin: 10,
								color: isDarkmode ? themeColor.white100 : themeColor.black100,
								flexWrap: 'wrap',
								textAlign: "center",
							}}
							string = {rides.length > 1 ? "rides" : "ride"}/>

						</View>

						<View style = {{
							flexDirection: "column",
							marginBottom: 10,
						}}>

							<AppTitle style = {{
								fontSize: 30,
								color: isDarkmode ? themeColor.white100 : themeColor.black100,
								textAlign: "center",
							}}
							string = {milesDriven}/>

							<AppText style = {{
								fontSize: 18,
								margin: 10,
								color: isDarkmode ? themeColor.white100 : themeColor.black100,
								flexWrap: "wrap",
								textAlign: "center",
							}}
							string = {(milesDriven == 1 ? " mile driven" : " miles driven")}/>

						</View>

						<View style = {{
							flexDirection: "column",
							marginBottom: 10,
						}}>

							<AppTitle style = {{
								fontSize: 30,
								color: isDarkmode ? themeColor.white100 : themeColor.black100,
								textAlign: "center",
							}}
							string = {topSpeed}/>

							<AppText style = {{
								fontSize: 18,
								margin: 10,
								color: isDarkmode ? themeColor.white100 : themeColor.black100,
								flexWrap: 'wrap',
								textAlign: "center",
							}}
							string = {"mph topspeed"}/>

						</View>

					</View>

					<View style = {{
						flex: 1,
						flexDirection: "row",
						justifyContent: "space-between",
						alignContent: "flex-end",
						alignItems: "flex-end",
						paddingHorizontal: 15,
					}}>

						<AppButton style = {{
							marginBottom: 15,
							width: 155,
							backgroundColor: isDarkmode ? VARS.dark1 : VARS.accent,
						}}
						string = "Change photo"
						onPress = {() => { choosePhoto(); }}/>

					</View>		

				</View>		

			</View>

		</Layout>

	);

}
