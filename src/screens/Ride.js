import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { Layout, useTheme, themeColor } from 'react-native-rapi-ui';

import AppText from "../components/AppText";
import AppTitle from "../components/AppTitle";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import Floaty from "../components/Floaty";

import * as VARS from "../../Vars";
import * as db from "../../Firebase";

import { Ionicons } from "@expo/vector-icons";
import CarouselCards from '../components/CarouselCards';

export default function ({ navigation }) {

	const { isDarkmode, setTheme } = useTheme();

	return (

		<Layout>

			<View style = {{

				marginTop: -60,
				paddingTop: 65,
				marginBottom: -35,
				padding: 30,
				flex: 1,
				justifyContent: 'center',
				backgroundColor: isDarkmode ? VARS.darkmodeBG : VARS.lightmodeBG,

			}}>

				<CarouselCards />

			</View>

		</Layout>

	);

}
