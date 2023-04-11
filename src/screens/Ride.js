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

export default function ({ navigation }) {

	let current = 0;

	const { isDarkmode, setTheme } = useTheme();
	const [rides, setRides] = React.useState([]);
	const [milesDriven, setMilesDriven] = React.useState(0);
	const [topSpeed, setTopSpeed] = React.useState(0);
	const [company, setCompany] = React.useState("");
	const [model, setModel] = React.useState("");
	const [year, setYear] = React.useState("");
	const [engine, setEngine] = React.useState("");
	const [hp, setHP] = React.useState(0);
	const [miles, setMiles] = React.useState("");
	const [image, setImage] = React.useState(null);


	useEffect(() => {

		db.getRides()
		.then((rides) => {

			let _miles = 0;
			let _topSpeed = 0;

			for (let r = 0; r < rides.length; r++) {

				_miles += parseInt(rides[r].miles);

				if (rides[r].topSpeed > _topSpeed) { _topSpeed = rides[r].topSpeed; }

				// db.getRideImage(rides[r].image);

			}

			setRides(rides);
			setMilesDriven(_miles);
			setTopSpeed(_topSpeed);
			setCompany(rides[current].company);
			setModel(rides[current].model);
			setYear(rides[current].year);
			setEngine(rides[current].engine);
			setHP(rides[current].hp);
			setImage(rides[current].image);
			setMiles(rides[current].miles);

		})
		.catch((error) => { console.log("Error getting rides: " + error); });

	}, []);

	return (

		<Layout>

			<View style = {{

				marginTop: -60,
				paddingTop: 100,
				marginBottom: -35,
				paddingBottom: 35,
				padding: 30,
				flex: 1,
				justifyContent: 'center',
				backgroundColor: isDarkmode ? VARS.darkmodeBG : VARS.lightmodeBG,

			}}>

				<AppTitle
				
				style = {{
					
					textAlign: "left",
					fontSize: "40%",
					color: isDarkmode ? VARS.lightmodeBGaccent : VARS.midGray
				}}
				
				string = {company} />

				<AppTitle
				
				style = {{
					
					fontSize: "80%",
					color: isDarkmode ? VARS.lightmodeBGaccent : VARS.midGray
					
				}}
				
				string = {model.toUpperCase()} />

				<Image

					style = {{

						width: "100%",
						height: 200,
						marginVertical: 20,
						resizeMode: 'stretch',

					}}

					defaultSource = { require("../../assets/car.png") }
					source = {{ uri: image }}/>

				<View style = {{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>

					<AppText string = {model} style = {{ paddingLeft: 0, fontSize: 20, color: isDarkmode ? VARS.lightmodeBGaccent : VARS.midGray }} />
					<AppText string = "|" style = {{ paddingLeft: 0, fontSize: 20, color: isDarkmode ? VARS.lightmodeBGaccent : VARS.midGray }} />
					<AppText string = {year} style = {{ paddingLeft: 0, fontSize: 20, color: isDarkmode ? VARS.lightmodeBGaccent : VARS.midGray }} />
					<AppText string = "|" style = {{ paddingLeft: 0, fontSize: 20, color: isDarkmode ? VARS.lightmodeBGaccent : VARS.midGray }} />
					<AppText string = {engine} style = {{ paddingLeft: 0, fontSize: 20, color: isDarkmode ? VARS.lightmodeBGaccent : VARS.midGray }} />
					<AppText string = "|" style = {{ paddingLeft: 0, fontSize: 20, color: isDarkmode ? VARS.lightmodeBGaccent : VARS.midGray }} />
					<AppText string = {hp + " HP"} style = {{ paddingLeft: 0, fontSize: 20, color: isDarkmode ? VARS.lightmodeBGaccent : VARS.midGray }} />

				</View>

				<AppTitle string = {miles + (miles > 1 ? " miles" : " mile")} style = {{ marginTop: 30, fontSize: "45%", color: isDarkmode ? VARS.lightmodeBGaccent : VARS.midGray, textAlign: "right" }} />

			</View>

		</Layout>

	);

}
