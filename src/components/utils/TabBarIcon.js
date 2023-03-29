import React from "react";
import { themeColor, useTheme } from "react-native-rapi-ui";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import * as VARS from "../../../Vars"

export default (props) => {

  const { isDarkmode } = useTheme();
  
  let size = 22;

  if (props.icon === "car-side") { size = 20; }
  else if (props.icon === "ios-person-circle") { size = 26; }

  if (props.icon === "car-side") {
    return (
      <FontAwesome5
        name={props.icon}
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginBottom: 3,
        }}
        size={size}
        color={
          props.focused
            ? isDarkmode
              ? themeColor.white100
              : VARS.redline
            : "#757575"
        }
      />
    );
  }

  else {

    return (
      <Ionicons
        name={props.icon}
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginBottom: 3,
        }}
        size={size}
        color={
          props.focused
            ? isDarkmode
              ? themeColor.white100
              : VARS.redline
            : "#757575"
        }
      />
    );

  }

};
