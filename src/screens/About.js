import React from 'react';
import { View, Image } from 'react-native';
import { Layout, useTheme } from 'react-native-rapi-ui';

import AppText from "../../src/components/AppText";
import AppTitle from "../../src/components/AppTitle";
import AppButton from "../../src/components/AppButton";
import AppInput from "../../src/components/AppInput";
import Floaty from "../../src/components/Floaty";

import * as VARS from "../../Vars";

export default function ({ navigation }) {

	const { isDarkmode, setTheme } = useTheme();

	return (

		<Layout>

			<View style = {{

					height: 900,
					marginTop: -60,
					paddingTop: 60,
					marginBottom: -35,
					flex: 1,
					justifyContent: 'center',
					backgroundColor: isDarkmode ? VARS.darkmodeBG : VARS.lightmodeBG,

				}}>
					
			{/* <View style = {{
					
					flex: 1,
					width: 400,
					height: 800,
					marginTop: -60,
					padding: 15,
					paddingTop: 60,
					backgroundColor: isDarkmode ? VARS.darkmodeBGdarker : VARS.lightmodeBG,
								  
				}}> */}

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

			</View>

			{/* </View> */}

		</Layout>

	);

}
