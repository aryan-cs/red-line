import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import {
  useTheme,
  themeColor
} from "react-native-rapi-ui";

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

  useEffect(() => {

    db.getJourneys().then((allJourneys) => {

      lastCruiseCords.current = allJourneys[allJourneys.length - 1].journey[allJourneys[allJourneys.length - 1].journey.length - 1].latitude + ", " + allJourneys[allJourneys.length - 1].journey[allJourneys[allJourneys.length - 1].journey.length - 1].longitude;
      lastCruiseTime.current = allJourneys[allJourneys.length - 1].journey[allJourneys[allJourneys.length - 1].journey.length - 1].timestamp;
      lastCruiseAddress.current = Location.reverseGeocodeAsync({
        latitude: allJourneys[allJourneys.length - 1].journey[allJourneys[allJourneys.length - 1].journey.length - 1].latitude,
        longitude: allJourneys[allJourneys.length - 1].journey[allJourneys[allJourneys.length - 1].journey.length - 1].longitude
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
            navigation = {navigation}
          />,
          ...allFeed,

        ]);

      });

    });

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
              desc = {"Your lastest drive."}
              cords = {lastCruiseCords.current}
              postText = {"You last drove to " + lastCruiseAddress + "."}
              navigation = {navigation}
            />

            {allFeed}

          </View>

        </ScrollView>

      </View>

    </View>

  );

}
