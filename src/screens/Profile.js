import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Layout, useTheme, themeColor } from 'react-native-rapi-ui';

import AppText from "../components/AppText";
import AppTitle from "../components/AppTitle";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import Floaty from "../components/Floaty";

import * as VARS from "../../Vars";

import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {

	const { isDarkmode, setTheme } = useTheme();

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
							width: 80,
							height: 80,
							marginLeft: "85%",
							marginHorizontal: 20,
							marginVertical: 10,
							textAlign: "center",
							backgroundColor: "transparent"
						}}
						onPress = {() => { navigation.navigate("Settings"); }}>
							
						<Ionicons
							name = {"ios-settings-sharp"}
							style = {{}}
							size = {25}
							color = { isDarkmode ? themeColor.white100 : VARS.midGray }/>

					</TouchableOpacity>

				<AppText style = {{ fontSize: 20, color: isDarkmode ? themeColor.white100 : VARS.midGray, marginBottom: 10, }}>PROFILE</AppText>
				
				<AppTitle style = {{ fontSize: 30, color: isDarkmode ? themeColor.white100 : VARS.midGray, marginBottom: 10, }}>John Doe</AppTitle>

			</View>

		</Layout>

	);

}
