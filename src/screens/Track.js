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

	let refresh = 750;

	const mapRef = useRef(null);
	const { isDarkmode, setTheme } = useTheme();
	const [user, setUser] = useState(null);
	const [currentRide, setCurrentRide] = useState(null);
	const [username, setUsername] = useState("");
	const [location, setLocation] = useState(null);
  	const [address, setAddress] = useState(null);
	const [longi, setLongitude] = useState(null);
	const [lati, setLatitude] = useState(null);
  	const speed = useRef(null);
  	const [errorMsg, setErrorMsg] = useState(null);
	const [content, setContent] = React.useState(indicatorContent);
	const [tracking, setTracking] = React.useState(true);
	const tracker = useRef(null);
	const journey = useRef([]);

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
			speed.current = location.coords.speed;
	
			setLocation(location);
			setAddress(address);
			setLongitude(long);
			setLatitude(lat);

			if (mapRef.current !== null) {

				mapRef.current.animateToRegion(({

					latitude: lat,
					longitude: long,
					latitudeDelta: 0.005,
					longitudeDelta: 0.005,

		  		}), refresh);

			}
	
		  }, refresh);
	
		})();
		
	  }, []);
	
	  let addressInfo = LOADING;
	  let speedInfo = "--";
	
	  if (errorMsg) { text = errorMsg; }
	  else if (location) {
		
		addressInfo = address;
		speedInfo = parseFloat(JSON.stringify(speed.current).replace(/"/g,"")) * 2.23694;
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

				<Marker.Animated
            		coordinate = {{
						latitude: lati ? lati : 0,
						longitude: longi ? longi : 0,
					}}
            		title = {username}
            		description = {currentRide ? "Driving their " + currentRide.company + " " + currentRide.model : "No ride selected"}
					pinColor = {VARS.redline}
					animateToRegion = {true}
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
