import React, { useEffect } from "react";
import { View, Linking, ScrollView } from "react-native";
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
  let allFeed = [];

  useEffect(() => {

    db.getPosts().then((posts) => {

      posts.forEach((post) => {

        allFeed.push(
          <Floaty
            title = {post.title}
            desc = {post.caption}
            src = {{ uri: post.imagePath }}
            navigation = {navigation}
            postText = {post.description}
          />
        );

        console.log("Post: " + post.title);
        console.log(allFeed);

        console.log("---------------------------");
        console.log("Post: " + post.title);
        console.log("Caption: " + post.caption);
        console.log("Description: " + post.description);
        console.log("Image: " + post.imagePath);
        console.log("ID: " + post.id);
        console.log("Timestamp: " + post.timestamp);
        console.log("---------------------------");

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

      <AppButton
        string = {
          <Ionicons
            name = {"ios-add"}
            style = {{}}
            size = {38}
            color = {themeColor.white100}/>}
        status = {isDarkmode ? "success" : "warning"}
        onPress = {() => { alert("Feature coming soon!"); }}
        style = {{
          width: 70,
          height: 70,
          borderRadius: 999,
          padding: 0,
          marginRight: "6%",
          marginLeft: "auto",
          marginTop: "auto",
          marginBottom: "-190%",
          textAlign: "center",
          justifyContent: "center",
          backgroundColor: VARS.redline,
          shadowColor: "black",
    			shadowOffset: { width: 0, height: 3 },
    			shadowOpacity: .25,
    			shadowRadius: 6,  
    			elevation: 1

        }} />

    <ScrollView contentContainerStyle = {{ flexGrow: 1 }}>

      <View
        id = "feed"
        style = {{
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: 20,
          marginTop: 60,
          marginBottom: 60
        }}>

          {allFeed}

        {/* <Floaty
          title = "NEXT MEET"
          desc = "Information for the next car meet will be posted here."
          src = {{ uri: "https://static1.hotcarsimages.com/wordpress/wp-content/uploads/2021/05/shutterstock_1327560506.jpg" }}
          navigation = {navigation}
          postText = "so the next meet will be like idk"
        /> */}

        {/* <Floaty
          title = "TEST POST"
          desc = "This post will eventually become clickable and will lead to a page with more information about the event."
          navigation = {navigation}
          src = {{ uri: undefined }}
          postText = "ahaha do this working?"
        /> */}

        {/* <Floaty
          title = "LAST CRUISE"
          desc = "Map integration coming soon!"
          cords = "39.100483, 125.930597"
          navigation = {navigation}
          postText = "u big man fr"
        /> */}

        {/* <Floaty
          title = "WELCOME!"
          desc = "Thank you for joining Red Line!"
          src = { require("../../assets/banner.png") }
          navigation = {navigation}
          postText = "hello hello hello thank u for coming"
        /> */}

      </View>

    </ScrollView>

    </View>

    </View>

  );

}
