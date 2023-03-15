import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Layout, useTheme } from "react-native-rapi-ui";

import AppText from "../../src/components/AppText";
import AppTitle from "../../src/components/AppTitle";
import AppButton from "../../src/components/AppButton";
import AppInput from "../../src/components/AppInput";
import Floaty from "../../src/components/Floaty";

import * as VARS from "../../Vars";

import * as Location from "expo-location";

export default function ({ navigation }) {

	let refresh = 1000;
	let lastAddress = "Getting user address...";

	const { isDarkmode, setTheme } = useTheme();
	const [location, setLocation] = useState(null);
  	const [address, setAddress] = useState(null);
  	const [cords, setCords] = useState(null);
  	const [timestamp, setTimestamp] = useState(null);
	const [lastUpdated, setLastUpdated] = useState("never");
  	const [speed, setSpeed] = useState(0);
  	const [errorMsg, setErrorMsg] = useState(null);

	useEffect(() => {

		(async () => {
		  
		  let { status } = await Location.requestForegroundPermissionsAsync();
		  if (status !== "granted") { setErrorMsg("Permission to access location was denied"); return; }
	
		  const interval = setInterval(async () => {
			
			let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High }).catch(function(error) { return null; });

			let timestamp = location.timestamp;
			let stamp = new Date(timestamp);
			setLastUpdated("at " + (stamp .getHours() % 12) + ":" + stamp.getMinutes() + ":" + stamp.getSeconds());

			let address = await Location.reverseGeocodeAsync(location.coords).then((address) => {

				lastAddress = address[0].name;
				return address[0].name;
			
			}).catch(function(error) { return lastAddress; });

			let lat = location.coords.latitude;
			let long = location.coords.longitude;
			lat = parseFloat(lat).toFixed(5);
			long = parseFloat(long).toFixed(5);
			let cords = lat + ", " + long;

			let speed = location.coords.speed;
	
			setLocation(location);
			setAddress(address);
			setCords(cords);
			setTimestamp(timestamp);
			setSpeed(speed);
	
		  }, refresh);
	
		})();
		
	  }, []);
	
	  let locationInfo = "";
	  let addressInfo = "Getting user address...";
	  let cordsInfo = "Getting user coordinates...";
	  let timestampInfo = "";
	  let speedInfo = "";
	
	  if (errorMsg) { text = errorMsg; }
	  else if (location) {
		
		locationInfo = JSON.stringify(location).replace(/"/g,"");
		addressInfo = JSON.stringify(address).replace(/"/g,"");
		cordsInfo = JSON.stringify(cords).replace(/"/g,"");
		timestampInfo = JSON.stringify(timestamp).replace(/"/g,"");

		speedInfo = parseFloat(JSON.stringify(speed).replace(/"/g,"")) * 2.23694;
		if (speedInfo < 0) { speedInfo = 0; }
		speedInfo = speedInfo.toFixed(1);
	
	  }

	return (

		<Layout>

			<View style = {{  alignItems: "center", flex: 1, backgroundColor: isDarkmode ? VARS.darkmodeBG : VARS.lightmodeBG }}>

			<View style = {{
						
				width: 400,
				height: 800,
				marginTop: -60,
				paddingTop: 60,
				padding: 15,
				backgroundColor: isDarkmode ? VARS.darkmodeBGdarker : VARS.lightmodeBG,
						
			}}>

				<View style = {{
					
					alignItems: "center",
					borderTopRightRadius: 30,
					borderTopLeftRadius: 30,
					width: 360,
					height: 800,
					padding: 65,
					backgroundColor: isDarkmode ? VARS.darkmodeBGdarker : VARS.lightmodeBG,
					
				}}>

					<View style = {{
						
						borderRadius: 200,
						width: 275,
						height: 275,
						marginTop: 30,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: isDarkmode ? VARS.darkmodeBGaccent : VARS.lightmodeBGaccent,
						
					}}>

						<AppTitle style = {{
						
							fontSize: 90,
							textAlign: "center",
							color: VARS.redlineBrighter
						
						}} string = {speedInfo} />

						<AppTitle style = {{
						
							fontSize: 60,
							textAlign: "center",
							color: VARS.redlineBrighter
						
						}} string = {"MPH"} />

					</View>

					<View style = {{
						
						width: 350,
						justifyContent: "flex-end",
						alignItems: "flex-start",
						position: "absolute",
						bottom: 150,
						
					}}>

						<AppText style = {{
						
							fontSize: 30,
							color: VARS.redlineBrighter,
							marginBottom: 15
						
						}} string = {addressInfo} />

						<AppText style = {{
						
							fontSize: 20,
							color: VARS.redlineBrighter,
							marginBottom: 15
						
						}} string = {cordsInfo} />

						<AppText style = {{
						
							fontSize: 15,
							color: VARS.redlineBrighter
					
						}} string = {"Last updated " + lastUpdated} />

					</View>

				</View>

			</View>

			</View>

		</Layout>

	);

}
