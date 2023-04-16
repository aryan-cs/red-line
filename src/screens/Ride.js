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

				<CarouselCards />

				<TouchableOpacity style = {{
        		  width: 60,
        		  height: 60,
        		  position: "absolute",
        		  bottom: "2%",
        		  right: "50%",
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
			
        		onPress = {() => { alert("Feature coming soon!"); }}>
				
        		  <Ionicons
        		    name = {"ios-add-circle"}
        		    style = {{
        		      marginLeft: -5.25,
        		      marginTop: -10,
        		    }}
        		    size = {75}
        		    color = { VARS.redline }/>

        		</TouchableOpacity>

			</View>

		</Layout>

	);

}
