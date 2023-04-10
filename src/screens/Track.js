import React, { useState, useEffect, useRef } from "react";
import { View, ActivityIndicator, Image } from "react-native";
import { Layout, themeColor, useTheme } from "react-native-rapi-ui";

import AppText from "../../src/components/AppText";
import AppTitle from "../../src/components/AppTitle";
import AppButton from "../../src/components/AppButton";
import AppInput from "../../src/components/AppInput";
import Floaty from "../../src/components/Floaty";

import * as VARS from "../../Vars";
import * as db from "../../Firebase";

import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {

	let refresh = 1000;

	const mapRef = useRef(null);
	const { isDarkmode, setTheme } = useTheme();
	const [username, setUsername] = React.useState("");
	const [location, setLocation] = useState(null);
  	const [address, setAddress] = useState(null);
	const [longi, setLongitude] = useState(null);
	const [lati, setLatitude] = useState(null);
  	const [speed, setSpeed] = useState(null);
  	const [errorMsg, setErrorMsg] = useState(null);
	const [content, setContent] = React.useState(indicatorContent);
	const [tracking, setTracking] = React.useState(true);
	// const [journey, setJourney] = React.useState([]);
	let journey = new Array();
	let sec = 0;

	const LOADING = <ActivityIndicator
						size = "small"
  						color = {VARS.redline}
  						style = {{ paddingTop: 6 }}/>;
					
	let indicatorContent = <ActivityIndicator
								size = "small"
								style = {{
									width: 40,
									height: 40,
									borderRadius: "100%",
									borderColor: VARS.darkmodeBGaccent,
									borderWidth: 2.5,
									backgroundColor: themeColor.white100,

									shadowColor: "black",
    								shadowOffset: { width: 0, height: 3 },
    								shadowOpacity: .3,
    								shadowRadius: 4,  
    								elevation: 1,
								}}/>;

	let trackButton = <ActivityIndicator
						size = "small"
						color = {VARS.redline}
						style = {{
							backgroundColor: themeColor.white100,
							width: "100%",
							height: "100%",
							borderRadius: "100%",
						}}/>;

	let tracker;

	const toggleTracking = () => {

		setTracking(!tracking);
		console.log("Tracking? " + tracking);

		tracker = setInterval(() => {

			// console.log(journey)

			// console.log("--------------------");
			// console.log("Tracking? " + tracking);
			// console.log("Journey length: " + journey.length);
			// console.log("Timestamp: " + timestamp);
			// console.log("Latitude: " + lati);
			// console.log("Longitude: " + longi);
			// console.log("Speed: " + speed);
			// console.log("--------------------");

			sec++;

			journey.push({
				latitude: lati,
				longitude: longi,
				timestamp: Date.now(),
				speed: speed,
			});

			// setJourney([ ...journey, {
			// 	latitude: lati,
			// 	longitude: longi,
			// 	timestamp: Date.now(),
			// 	speed: speed,	
			// }]);

			if (!tracking) {
				
				clearInterval(tracker);
				console.log("Tracker stopped");
				console.log("Journey length: " + journey.length);
				console.log(sec + "!!!");

				if (journey.length > 0) {

					console.log(journey[journey.length - 1].timestamp - journey[0].timestamp + "ms");

					if (journey[journey.length - 1].timestamp - journey[0].timestamp > 1000) {

						console.log("Saving journey...");

						db.saveJourney(journey);
						console.log("Journey added to database");

					}

				}
			
			}

		}, refresh);

		// setJourney([]);
		// journey = [];

	}

	useEffect(() => {

		db.getUser()
		.then((user) => {

			setUsername(user.username);

			// db.getUserImage(user.uid + ".png")
			db.getUserImage("default.png")
			.then((image) => {
				setContent(<Image style = {{
								width: 40,
								height: 40,
								borderRadius: "100%",
								borderWidth: 0,
							}}
							source = {{ uri: image }}/>);
			});

		});

		(async () => {
		  
		  let { status } = await Location.requestForegroundPermissionsAsync();
		  if (status !== "granted") { setErrorMsg("Permission to access location was denied"); return; }
	
		  const interval = setInterval(async () => {
			
			let location = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.BestForNavigation,
				// activityType: Location.ActivityType.AutomotiveNavigation,
			}).catch(function(error) { return null; });

			// setTimestamp(location.timestamp)

			let stamp = new Date(location.timestamp);
			let hrs = stamp.getHours() % 12;
			let mins = stamp.getMinutes();
			let secs = stamp.getSeconds();
			if (mins < 10) { mins = "0" + mins; }
			if (secs < 10) { secs = "0" + secs; }
			// setLastUpdated("at " + hrs + ":" + mins + ":" + secs);

			let address = await Location.reverseGeocodeAsync(location.coords).then((address) => {

				return JSON.stringify(address[0].name).replace(/"/g,"");
			
			}).catch(function(error) { return LOADING; });

			let lat = location.coords.latitude;
			let long = location.coords.longitude;
			let speed = location.coords.speed;
	
			setLocation(location);
			setAddress(address);
			setLongitude(long);
			setLatitude(lat);
			setSpeed(speed);

			mapRef.current.animateToRegion(({
				
				latitude: lat,
				longitude: long,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005,

		  	}), refresh);

			// if (tracking) {

			// 	// console.log(location.timestamp + " | " + timestamp + " | " + Date.now())
			// 	// console.log(lat + ", " + long + " | @ " + Date.now() + " going " + speed + " mph");

			// 	setJourney([ ...journey, {
			// 		latitude: lat,
			// 		longitude: long,
			// 		timestamp: Date.now(),
			// 		speed: parseFloat(speed * 2.23694).toFixed(1),	
			// 	}]);

			// }
	
		  }, refresh);
	
		})();
		
	  }, []);
	
	  let addressInfo = LOADING;
	  let speedInfo = "--";
	
	  if (errorMsg) { text = errorMsg; }
	  else if (location) {
		
		addressInfo = address;
		speedInfo = parseFloat(JSON.stringify(speed).replace(/"/g,"")) * 2.23694;
		if (speedInfo < 0) { speedInfo = 0; }
		else { speedInfo = speedInfo.toFixed(0); }

		trackButton = <TouchableOpacity
						onPress = {toggleTracking}
						style = {{}}>
						
						<Ionicons
							name = {tracking ? "ios-play-circle" : "ios-pause-circle"}
							style = {{
							  marginLeft: -5.25,
							  marginTop: -10,
							}}
							size = {75}
							color = {isDarkmode ? VARS.darkmodeBGaccent : themeColor.white100}/>

					</TouchableOpacity>	
	
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
				// showsUserLocation={true}
				loadingEnabled = {true}
         		loadingIndicatorColor = {VARS.redline}
         		loadingBackgroundColor = {"white"}
				userInterfaceStyle = {isDarkmode ? "dark" : "light"}
				>

				<Marker
            		coordinate = {{
						latitude: lati ? lati : 0,
						longitude: longi ? longi : 0,
					}}
            		title = {username}
            		description = {"Current Location"}
					pinColor = {VARS.redline}
					style = {{

						shadowColor: "black",
						shadowOffset: { width: 0, height: 3 },
						shadowOpacity: 0.35,
						shadowRadius: 4,  
						elevation: 1,

					}}>

					{content}

				</Marker>

				</MapView>

				<View style = {{

					paddingVertical: 10,
					paddingHorizontal: 20,
					backgroundColor: isDarkmode ? VARS.darkmodeBGaccent : VARS.lightmodeBGaccent,
					borderRadius: "100%",
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
						
					borderRadius: "100%",
					justifyContent: "center",
					alignItems: "center",
					textAlign: "center",
					position: "absolute",
					bottom: "28%",
					right: "2%",
					backgroundColor: VARS.redline,
					width: 60,
					height: 60,

					shadowColor: "black",
					shadowOffset: { width: 0, height: 3 },
					shadowOpacity: .3,
					shadowRadius: 4,  
					elevation: 1
							
				}}>
	
					{trackButton}
	
				</View>

				<View style = {{
						
					borderRadius: "100%",
					borderColor: VARS.redline,
					justifyContent: "center",
					alignItems: "center",
					position: "absolute",
					bottom: "12%",
					right: "3%",
					width: 125,
					height: 125,
					backgroundColor: isDarkmode ? VARS.darkmodeBGaccent : VARS.lightmodeBGaccent,

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
