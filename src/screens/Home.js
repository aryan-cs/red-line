import React, { useEffect, useState } from "react";
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

import { Ionicons } from "@expo/vector-icons";

export default function ({ navigation }) {

  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  const [allFeed, setAllFeed] = useState([]);

  useEffect(() => {

    db.getPosts().then((posts) => {

      setAllFeed([]);

      posts.forEach((post) => {

        setAllFeed((allFeed) => [
          <Floaty
            title = {post.title}
            desc = {post.caption}
            src = {post.imagePath}
            cords = {post.cords}
            navigation = {navigation}
            postText = {post.description}
            key = {post.timestamp}
          />,
          ...allFeed,
        ]);

        // console.log("---------------------------");
        // console.log("Post: " + post.title);
        // console.log("Caption: " + post.caption);
        // console.log("Description: " + post.description);
        // console.log("Image: " + post.imagePath);
        // console.log("Timestamp: " + post.timestamp);
        // console.log("---------------------------");

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

<TouchableOpacity
						style = {{
							width: 60,
							height: 60,
							position: "absolute",
              bottom: "2%",
              right: "3.5%",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
							backgroundColor: VARS.redline,
              borderRadius: "100%",
							zIndex: 1,
						}}
						onPress = {() => { alert("Feature coming soon!"); }}>
							
						<Ionicons
							name = {"ios-add"}
							style = {{marginLeft: 2, marginTop: 1}}
							size = {40}
							color = { themeColor.white100 }/>

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

        {allFeed}

      </View>

    </ScrollView>

    </View>

    </View>

  );

}
