import React from 'react';
import { View, Image } from 'react-native';
import { Layout, useTheme } from 'react-native-rapi-ui';

import AppText from "../components/AppText";
import AppTitle from "../components/AppTitle";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import Floaty from "../components/Floaty";

import * as VARS from "../../Vars";

export default function ({ navigation }) {

	const { isDarkmode, setTheme } = useTheme();

	return (

		<Layout>

			<View style = {{

					height: 1000,
					marginTop: -60,
					paddingTop: 60,
					marginBottom: -35,
					flex: 1,
					justifyContent: 'center',
					backgroundColor: isDarkmode ? VARS.darkmodeBG : VARS.lightmodeBG,

				}}>

				<AppTitle
				
				style = {{
					
					textAlign: "left",
					paddingLeft: 30,
					fontSize: 38,
					color: isDarkmode ? VARS.lightmodeBGaccent : VARS.midGray
				}}
				
				string = "Toyota" />

				<AppTitle
				
				style = {{
					
					paddingLeft: 20,
					fontSize: 100,
					position: "absolute",
					color: isDarkmode ? VARS.lightmodeBGaccent : VARS.midGray
					
				}}
				
				string = "SUPRA" />

				<Image

					style = {{

						top: 40,
						left: 30,
						width: 530,
    					height: 350,
						resizeMode: 'stretch',

					}}

					source = {{ uri: "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/2c9ffe7c-be6b-42fd-8ba0-045467e4c0c0/6fe7cda2-6e61-4197-ae03-7d9bd29af358.png" }} />

				<View style = {{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 50, paddingLeft: 30, paddingRight: 30 }}>

					<AppText string = "MK5" style = {{ paddingLeft: 0, fontSize: 20, color: isDarkmode ? VARS.lightmodeBGaccent : VARS.midGray }} />
					<AppText string = "|" style = {{ paddingLeft: 0, fontSize: 20, color: isDarkmode ? VARS.lightmodeBGaccent : VARS.midGray }} />
					<AppText string = "2023" style = {{ paddingLeft: 0, fontSize: 20, color: isDarkmode ? VARS.lightmodeBGaccent : VARS.midGray }} />
					<AppText string = "|" style = {{ paddingLeft: 0, fontSize: 20, color: isDarkmode ? VARS.lightmodeBGaccent : VARS.midGray }} />
					<AppText string = "3.0L Turbo V6" style = {{ paddingLeft: 0, fontSize: 20, color: isDarkmode ? VARS.lightmodeBGaccent : VARS.midGray }} />
					<AppText string = "|" style = {{ paddingLeft: 0, fontSize: 20, color: isDarkmode ? VARS.lightmodeBGaccent : VARS.midGray }} />
					<AppText string = "382 HP" style = {{ paddingLeft: 0, fontSize: 20, color: isDarkmode ? VARS.lightmodeBGaccent : VARS.midGray }} />

				</View>

				<AppTitle string = "12,345 miles" style = {{ paddingHorizontal: 30, marginTop: 20, fontSize: 30, color: isDarkmode ? VARS.lightmodeBGaccent : VARS.midGray, textAlign: "right" }} />

			</View>

		</Layout>

	);

}
