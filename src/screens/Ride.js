import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
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

				<CarouselCards navigation = {navigation} />

				<TouchableOpacity style = {{
        			width: 30,
        			height: 30,
        			position: "absolute",
        			top: "9%",
        			right: "6%",
        			justifyContent: "center",
        			alignItems: "center",
        			textAlign: "center",
        			backgroundColor: themeColor.white100,
        			borderRadius: "100%",
        			zIndex: 1,
					shadowColor: "black",
    		  		shadowOffset: { width: 0, height: 2 },
    		  		shadowOpacity: .5,
    		  		shadowRadius: 4,  
    		  		elevation: 1,
        		}}
			
        		onPress = {() => { navigation.navigate("Add Ride"); }}>
				
        		  <Ionicons
        		    name = {"ios-add-circle"}
        		    style = {{
        		      marginLeft: -4.50,
        		      marginTop: -7.2,
        		    }}
        		    size = {40}
        		    color = { VARS.redline }/>

        		</TouchableOpacity>

			</View>

		</Layout>

	);

}
