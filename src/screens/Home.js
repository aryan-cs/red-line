import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useTheme, themeColor } from "react-native-rapi-ui";

import AppText from "../../src/components/AppText";
import AppTitle from "../../src/components/AppTitle";
import AppButton from "../../src/components/AppButton";
import AppInput from "../../src/components/AppInput";
import Floaty from "../../src/components/Floaty";

import * as VARS from "../../Vars";
import * as db from "../../Firebase";

import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {

  const { isDarkmode } = useTheme();
  const [allFeed, setAllFeed] = useState([]);
  const lastCruiseCords = useRef();
  const lastCruiseTime = useRef();
  const [lastCruiseAddress, setLastCruiseAddress] = useState();

  const updateFeed = async () => {

    db.getJourneys().then((allJourneys) => {

      if (allJourneys.length === 0) { return; }

      lastCruiseCords.current = allJourneys[allJourneys.length - 1].journey[allJourneys[allJourneys.length - 1].journey.length - 1].latitude + ", " + allJourneys[allJourneys.length - 1].journey[allJourneys[allJourneys.length - 1].journey.length - 1].longitude;
      lastCruiseTime.current = allJourneys[allJourneys.length - 1].journey[allJourneys[allJourneys.length - 1].journey.length - 1].timestamp;
      Location.reverseGeocodeAsync({
        latitude: allJourneys[allJourneys.length - 1].journey[allJourneys[allJourneys.length - 1].journey.length - 1].latitude,
        longitude: allJourneys[allJourneys.length - 1].journey[allJourneys[allJourneys.length - 1].journey.length - 1].longitude,
      })
      .then((address) => { setLastCruiseAddress(address[0].name + ", " + address[0].city + ", " + address[0].region + ", " + address[0].country); });

    });

    db.getPosts().then((posts) => {

      setAllFeed([]);

      posts.forEach((post) => {

        setAllFeed((allFeed) => [

          <Floaty
            title = {post.title}
            desc = {post.caption}
            src = {post.imagePath}
            cords = {post.cords}
            postText = {post.description}
            key = {post.timestamp}
            date = {post.timestamp}
            user = {post.user}
            navigation = {navigation}
          />,
          ...allFeed,

        ].sort((a, b) => { return b.key - a.key; }));

      });

    });

  };

  useEffect(() => {

    const focusHandler = navigation.addListener('focus', () => { updateFeed(); });

    updateFeed();

  }, []);

  return (

    <View style = {{ flex: 1 }}>

      <View style = {{
        marginTop: -60,
        paddingTop: 60,
        height: "108%",
        backgroundColor: isDarkmode ? VARS.darkMode : VARS.lightMode,
      }}>

        <TouchableOpacity style = {{
          position: "absolute",
          bottom: 0,
          right: 0,
          margin: 10,
          zIndex: 2,
          // backgroundColor: "black",
          borderRadius: 100,
          width: 75,
          height: 75,
          alignItems: "center",
          justifyContent: "center",

        }}
        onPress = {() => { navigation.navigate("Upload") }}>

          <View style = {{
            backgroundColor: isDarkmode ? VARS.dark : VARS.light,
            borderRadius: "100%",
            position: "absolute",
            width: 70,
            height: 70,
            zIndex: 3,
            justifyContent: "center",
            alignItems: "center",
            
          }}>
            
          <Ionicons
            name = {"ios-add-circle"}
            style = {{
              color: isDarkmode ? VARS.darkMode : VARS.dark,
              zIndex: 4,
              lineHeight: 75.5,
            }}
            size = {75}/>

          </View>

        </TouchableOpacity>

        <ScrollView contentContainerStyle = {{ flexGrow: 1 }}>

          <View style = {{
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: 20,
            marginTop: 60,
            marginBottom: 60,
            zIndex: 1
          }}>

            {lastCruiseAddress ? 

            <Floaty
              title = {"LAST CRUISE"}
              desc = {(lastCruiseAddress !== undefined && lastCruiseAddress !== null) ?
                        "Last drove to " + lastCruiseAddress.substring(0, lastCruiseAddress.indexOf(",")) :
                        " "}
              cords = {lastCruiseCords.current}
              postText = {(lastCruiseAddress !== undefined && lastCruiseAddress !== null) ?
                            "Last drove to " + lastCruiseAddress :
                            " "}
              navigation = {navigation}
              date = {lastCruiseTime.current}
              user = {getAuth().currentUser.displayName}
            />

            : <></> }

            {allFeed}
            

          </View>

        </ScrollView>

      </View>

    </View>

  );

}
