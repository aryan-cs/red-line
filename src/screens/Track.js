import React, { useState, useEffect, useRef } from "react";
import { View, ActivityIndicator } from "react-native";
import { Layout, useTheme } from "react-native-rapi-ui";

import AppText from "../../src/components/AppText";
import AppTitle from "../../src/components/AppTitle";
import AppButton from "../../src/components/AppButton";
import AppInput from "../../src/components/AppInput";
import Floaty from "../../src/components/Floaty";

import * as VARS from "../../Vars";

import * as Location from "expo-location";
import MapView from 'react-native-maps';

export default function ({ navigation }) {

	let refresh = 1000;

	const { isDarkmode, setTheme } = useTheme();
	const [location, setLocation] = useState(null);
  	const [address, setAddress] = useState(null);
	const [longi, setLongitude] = useState(null);
	const [lati, setLatitude] = useState(null);
  	const [cords, setCords] = useState(null);
  	const [timestamp, setTimestamp] = useState(null);
	const [lastUpdated, setLastUpdated] = useState("never");
  	const [speed, setSpeed] = useState(null);
  	const [errorMsg, setErrorMsg] = useState(null);
	const mapRef = useRef(null);

	const LOADING = <ActivityIndicator
						size = "small"
  						color = {VARS.redline}
  						style = {{ paddingTop: 6 }}/>;

	useEffect(() => {

		(async () => {
		  
		  let { status } = await Location.requestForegroundPermissionsAsync();
		  if (status !== "granted") { setErrorMsg("Permission to access location was denied"); return; }
	
		  const interval = setInterval(async () => {
			
			let location = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.BestForNavigation,
				activityType: Location.ActivityType.AutomotiveNavigation,
			}).catch(function(error) { return null; });

			let stamp = new Date(location.timestamp);
			let hrs = stamp.getHours() % 12;
			let mins = stamp.getMinutes();
			let secs = stamp.getSeconds();
			if (mins < 10) { mins = "0" + mins; }
			if (secs < 10) { secs = "0" + secs; }
			setLastUpdated("at " + hrs + ":" + mins + ":" + secs);

			let address = await Location.reverseGeocodeAsync(location.coords).then((address) => {

				return JSON.stringify(address[0].name).replace(/"/g,"");
			
			}).catch(function(error) { return LOADING });

			let lat = location.coords.latitude;
			let long = location.coords.longitude;
			let cords = lat + ", " + long;

			let speed = location.coords.speed;
			// console.log(speed);
	
			setLocation(location);
			setAddress(address);
			setCords(cords);
			setLongitude(long);
			setLatitude(lat);
			setTimestamp(timestamp);
			setSpeed(speed);

			mapRef.current.animateToRegion(({
				
				latitude: lat,
				longitude: long,
				latitudeDelta: 0.015,
				longitudeDelta: 0.015,

		  	}), refresh);
	
		  }, refresh);
	
		})();
		
	  }, []);
	
	  let locationInfo = "";
	  let addressInfo = LOADING;
	  let cordsInfo = "Getting user coordinates...";
	  let timestampInfo = "";
	  let speedInfo = "--";
	
	  if (errorMsg) { text = errorMsg; }
	  else if (location) {
		
		locationInfo = JSON.stringify(location).replace(/"/g,"");
		addressInfo = address;
		cordsInfo = JSON.stringify(cords).replace(/"/g,"");
		timestampInfo = JSON.stringify(timestamp).replace(/"/g,"");

		speedInfo = parseFloat(JSON.stringify(speed).replace(/"/g,"")) * 2.23694;
		if (speedInfo < 0) { speedInfo = 0; }
		else if (speedInfo < 10) { speedInfo = speedInfo.toFixed(1); }
		else { speedInfo = speedInfo.toFixed(0); }
	
	  }

	return (

		<Layout>

			<View style = {{ 
				
				alignItems: "center",
				flex: 1,
				backgroundColor: isDarkmode ? VARS.darkmodeBG : VARS.lightmodeBG,
				marginTop: -120,
				paddingTop: 120,
				marginBottom: -120,
				
			}}>

				<MapView style = {{

					width: "100%",
					height: "105%",
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: -1,
					
				}}
				ref = {mapRef}
				userInterfaceStyle = {isDarkmode ? "dark" : "light"}
				// customMapStyle = {mapStyle}
				/>

				<View style = {{

					paddingVertical: 10,
					paddingHorizontal: 20,
					backgroundColor: isDarkmode ? VARS.darkmodeBGaccent : VARS.lightmodeBGaccent,
					borderRadius: 999,
					borderColor: VARS.redline,
					marginTop: 5,

					borderWidth: 0,
					shadowColor: "black",
    				shadowOffset: { width: 0, height: 3 },
    				shadowOpacity: .3,
    				shadowRadius: 4,  
    				elevation: 1,

				}}>

				<AppText style = {{
						
					fontSize: 20,
					color: VARS.redline,
					textAlign: "center",
					justifyContent: "center",
					alignItems: "center",
						
				}} string = {addressInfo} />

				</View>

				<View style = {{
						
					borderRadius: 999,
					borderColor: VARS.redline,
					justifyContent: "center",
					alignItems: "center",
					position: "absolute",
					bottom: "12%",
					right: "3%",
					width: 125,
					height: 125,
					backgroundColor: isDarkmode ? VARS.darkmodeBGaccent : VARS.lightmodeBGaccent,

					borderWidth: 0,
					shadowColor: "black",
    				shadowOffset: { width: 0, height: 3 },
    				shadowOpacity: .3,
    				shadowRadius: 4,  
    				elevation: 1
						
				}}>

					<AppTitle style = {{
						
						fontSize: 45,
						textAlign: "center",
						color: VARS.redline,
						
						// textShadowColor: isDarkmode ? VARS.redline : "transparent",
    					// textShadowRadius: 7,
						// paddingHorizontal: 7
					
					}} string = {speedInfo} />

					<AppTitle style = {{
						
						fontSize: 20,
						textAlign: "center",
						color: VARS.redline,

						// textShadowColor: isDarkmode ? VARS.redline : "transparent",
    					// textShadowRadius: 7,
						// paddingHorizontal: 7
					
					}} string = {"MPH"} />

					</View>

			</View>

		</Layout>

	);

}
