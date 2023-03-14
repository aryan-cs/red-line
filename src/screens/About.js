import React from 'react';
import { View, Image } from 'react-native';
import { Layout, Text } from 'react-native-rapi-ui';

import AppText from "../../src/components/AppText";
import AppTitle from "../../src/components/AppTitle";
import AppButton from "../../src/components/AppButton";
import AppInput from "../../src/components/AppInput";
import Floaty from "../../src/components/Floaty";

import * as VARS from "../../Vars";

export default function ({ navigation }) {

	return (

		<Layout>

			<View
				style = {{
					flex: 1,
					justifyContent: 'center',
				}}>

				<AppTitle
				
				style = {{
					
					textAlign: "left",
					paddingLeft: 30,
					fontSize: 38,
					color: "#21212166"
				}}
				
				string = "Toyota" />

				<AppTitle
				
				style = {{
					
					paddingLeft: 20,
					fontSize: 100,
					position: "absolute",
					color: "#21212166"
					
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

		</Layout>

	);

}
