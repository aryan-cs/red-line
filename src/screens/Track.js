import React, { useState, useEffect, useRef } from "react";
import { View, ActivityIndicator, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import { themeColor, useTheme } from "react-native-rapi-ui";

import AppText from "../../src/components/AppText";
import AppTitle from "../../src/components/AppTitle";
import AppButton from "../../src/components/AppButton";
import AppInput from "../../src/components/AppInput";
import Floaty from "../../src/components/Floaty";
import Layout from "../../src/components/Layout";

import * as VARS from "../../Vars";
import * as db from "../../Firebase";

import * as Location from "expo-location";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {

	let refresh = 500;

	const mapRef = useRef(null);
	const { isDarkmode } = useTheme();
	const [user, setUser] = useState(null);
	const [currentRide, setCurrentRide] = useState(null);
	const [username, setUsername] = useState("");
	const [location, setLocation] = useState(null);
  	const [address, setAddress] = useState(null);
	const [longi, setLongitude] = useState(null);
	const [lati, setLatitude] = useState(null);
	let lat = 0, long = 0;
	let addressInfo = LOADING;
	  let speedInfo = "--";
  	const speed = useRef(null);
  	const [errorMsg, setErrorMsg] = useState(null);
	const [content, setContent] = React.useState(indicatorContent);
	const [tracking, setTracking] = React.useState(true);
	const tracker = useRef(null);
	const journey = useRef([]);

	// for address
	let LOADING = <ActivityIndicator
						size = "small"
  						color = {isDarkmode ? VARS.dark5 : VARS.light4}
  						style = {{ paddingTop: 4.5, marginVertical: 2 }}/>;
				
	// for user icon
	let indicatorContent = <ActivityIndicator
								size = "small"
								color = {isDarkmode ? VARS.dark5 : VARS.light4}
								style = {{
									width: 40,
									height: 40,
									borderRadius: "100%",
									borderWidth: 2.5,
									shadowColor: "black",
    								shadowOffset: { width: 0, height: 3 },
    								shadowOpacity: .3,
    								shadowRadius: 4,  
    								elevation: 1,
								}}/>;

	let trackButton = <ActivityIndicator
						size = "small"
						color = {VARS.light3}
						style = {{
							backgroundColor: themeColor.white100,
							width: "100%",
							height: "100%",
							borderRadius: "100%",
						}}/>;

	const toggleTracking = () => {

		setTracking(!tracking);

		if (tracking) {

			tracker.current = setInterval(() => {

				journey.current.push({
					latitude: lati,
					longitude: longi,
					timestamp: Date.now(),
					speed: speed.current,
				});

			}, refresh);

		}

		else if (!tracking) {
				
			clearInterval(tracker.current);

			if (journey.current.length > 0) {

				console.log(journey.current[journey.current.length - 1].timestamp - journey.current[0].timestamp + "ms");

				if (journey.current[journey.current.length - 1].timestamp - journey.current[0].timestamp > 1000) {

					db.saveJourney(journey.current, currentRide);
					alert("Drive saved!");

					let miles = 0;
					
					for (let i = 0; i < journey.current.length; i++) {

						let datapoint = journey.current[i];
						let nextPoint = journey.current[i + 1];

						if (nextPoint) {

							let distance = Math.sqrt(Math.pow(datapoint.latitude - nextPoint.latitude, 2) + Math.pow(datapoint.longitude - nextPoint.longitude, 2));
							miles += distance * 69;
							
						}

						if (datapoint.speed > user.currentRide.topSpeed) { user.currentRide.topSpeed = datapoint.speed; }

					}

					user.currentRide.miles += miles;
					db.saveUser(username, user.email, currentRide);

				}

			}
	
		}

		journey.current = [];

	}

	const focus = () => {

		if (mapRef.current !== null) {

			mapRef.current.animateToRegion(({
		
				latitude: lati,
				longitude: longi,
				latitudeDelta: 0.007,
				longitudeDelta: 0.007,
		
			}), 1000);
		
		}

	}

	useEffect(() => {

		db.getUser()
		.then((user) => {

			setUser(user);
			setCurrentRide(user.currentRide);
			setUsername(user.username);

			db.getUserImage(user.uid)
			.then((image) => {
				setContent(<Image style = {{
								width: 40,
								height: 40,
								borderRadius: "100%",
								borderWidth: 0,
							}}
							defaultSource={require("../../assets/default.png")}
							source = {{ uri: image }}/>);

			});

		});

		(async () => {
		  
		  let { status } = await Location.requestForegroundPermissionsAsync();
		  if (status !== "granted") { setErrorMsg("Permission to access location was denied"); return; }
	
		  const interval = setInterval(async () => {
			
			let location = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.BestForNavigation,
				activityType: Location.ActivityType.AutomotiveNavigation,
			}).catch(function(error) { return null; });

			let address = await Location.reverseGeocodeAsync(location.coords).then((address) => {

				// console.log(address[0].name);
				return JSON.stringify(address[0].name).replace(/"/g,"");
			
			})
			.catch(function(error) { return LOADING; });
			// uncomment to show loading indicator when address is loading otherwise shows last address

			lat = location.coords.latitude;
			long = location.coords.longitude;
			speed.current = location.coords.speed;
	
			setLocation(location);
			setAddress(address);
			setLongitude(long);
			setLatitude(lat);

			// focus();
	
		  }, refresh);
	
		})();
		
	  }, []);
	
	  if (errorMsg) { text = errorMsg; }
	  else if (location) {
		
		addressInfo = <AppText style = {{

			fontSize: 20,
			color: isDarkmode ? VARS.dark5 : VARS.light5,
			textAlign: "center",
			justifyContent: "center",
			alignItems: "center",
			
		}} string = {address} />

		speedInfo = parseFloat(JSON.stringify(speed.current).replace(/"/g,"")) * 2.23694;
		if (speedInfo < 0) { speedInfo = "0"; }
		else { speedInfo = speedInfo.toFixed(0); }	
	
	  }

	return (

		<Layout>

			<View style = {{ 
				
				alignItems: "center",
				flex: 1,
				marginTop: -120,
				paddingTop: 120,
				marginBottom: -120,
				
			}}>

				<MapView style = {{

					width: "100%",
					height: "110%",
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: -1,
					
				}}
				ref = {mapRef}
				loadingEnabled = {true}
         		loadingIndicatorColor = {VARS.accent}
         		loadingBackgroundColor = {"white"}
				userInterfaceStyle = {isDarkmode ? "dark" : "light"}>

				<TouchableOpacity onPress = {() => focus()}>

				<Marker.Animated
            		coordinate = {{
						latitude: lati ? lati : 0,
						longitude: longi ? longi : 0,
					}}
            		title = {username}
            		description = {currentRide ? (currentRide.company + " " + currentRide.model) : "No ride selected"}
					pinColor = {isDarkmode ? VARS.opaqueAccent3 : VARS.opaqueAccent3}
					animateToRegion = {
						({
							latitude: lati,
							longitude: longi,
							latitudeDelta: 0.005,
							longitudeDelta: 0.005,
						}, 1000)
					}
					style = {{

						shadowColor: "black",
						shadowOffset: { width: 0, height: 3 },
						shadowOpacity: 0.35,
						shadowRadius: 4,  
						elevation: 1,
						paddingTop: 5,

					}}>

					{content}

				</Marker.Animated>

				</TouchableOpacity>

				</MapView>

				<View style = {{

					paddingVertical: 10,
					paddingHorizontal: 20,
					backgroundColor: isDarkmode ? VARS.darkMode : VARS.lightMode,
					borderRadius: "100%",
					marginTop: 5,

					borderWidth: 0,
					shadowColor: "black",
    				shadowOffset: { width: 0, height: 3 },
    				shadowOpacity: .3,
    				shadowRadius: 4,  
    				elevation: 1,

				}}>

				{addressInfo}

				</View>

				{/* <View style = {{
						
					borderRadius: "100%",
					justifyContent: "center",
					alignItems: "center",
					textAlign: "center",
					position: "absolute",
					bottom: "28%",
					right: "2%",
					backgroundColor: isDarkmode ? VARS.dark3 : VARS.light4,
					width: 60,
					height: 60,

					shadowColor: "black",
					shadowOffset: { width: 0, height: 3 },
					shadowOpacity: .3,
					shadowRadius: 4,  
					elevation: 1
							
				}}>
	
					<TouchableOpacity
						onPress = {toggleTracking}
						style = {{}}>
						
						<Ionicons
							name = {tracking ? "ios-play-circle" : "ios-pause-circle"}
							style = {{
							  marginLeft: -5.25,
							  marginTop: -10,
							}}
							size = {70}
							color = {isDarkmode ? VARS.accent : VARS.dark}/>

					</TouchableOpacity>
	
				</View> */}

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
					backgroundColor: isDarkmode ? VARS.darkMode : VARS.lightMode,

					shadowColor: "black",
    				shadowOffset: { width: 0, height: 3 },
    				shadowOpacity: .3,
    				shadowRadius: 4,  
    				elevation: 1
						
				}}>

					<AppTitle style = {{
						
						fontSize: 45,
						textAlign: "center",
						color: isDarkmode ? VARS.dark5 : VARS.light5,

					}} string = {speedInfo} />

					<AppTitle style = {{
						
						fontSize: 20,
						textAlign: "center",
						color: isDarkmode ? VARS.dark5 : VARS.light5,

					}} string = {"MPH"} />

				</View>

			</View>

		</Layout>

	);

}
