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

  const { isDarkmode, setTheme } = useTheme();
  const [allFeed, setAllFeed] = useState([]);
  const lastCruiseCords = useRef();
  const lastCruiseTime = useRef();
  const [lastCruiseAddress, setLastCruiseAddress] = useState();

  const updateFeed = async () => {

    db.getJourneys().then((allJourneys) => {

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

    <View style = {{ flex: 1, backgroundColor: isDarkmode ? VARS.darkmodeBG : VARS.lightmodeBG }}>

      <View style = {{
        marginTop: -60,
        paddingTop: 60,
        backgroundColor: isDarkmode ? VARS.darkmodeBGdarker : VARS.lightmodeBG,      
      }}>

        <TouchableOpacity style = {{
          width: 60,
          height: 60,
          position: "absolute",
          bottom: "2%",
          right: "3.5%",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: themeColor.white100,
          borderRadius: "100%",
          zIndex: 1,
        }}
        
        onPress = {() => { navigation.navigate("Upload") }}>
            
          <Ionicons
            name = {"ios-add-circle"}
            style = {{
              marginLeft: -5.25,
              marginTop: -10,
            }}
            size = {75}
            color = { VARS.redline }/>

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

            <Floaty
              title = {"LAST CRUISE"}
              desc = {(lastCruiseAddress !== undefined && lastCruiseAddress !== null) ?
                        "Last drove to " + lastCruiseAddress.substring(0, lastCruiseAddress.indexOf(",")) :
                        "Unable to load last cruise."}
              cords = {lastCruiseCords.current}
              postText = {(lastCruiseAddress !== undefined && lastCruiseAddress !== null) ?
                            "Last drove to " + lastCruiseAddress :
                            "Unable to load last cruise."}
              navigation = {navigation}
              date = {lastCruiseTime.current}
              user = {getAuth().currentUser.displayName}
            />

            {allFeed}

          </View>

        </ScrollView>

      </View>

    </View>

  );

}
