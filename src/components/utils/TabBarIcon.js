import React from "react";
import { themeColor, useTheme } from "react-native-rapi-ui";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import * as VARS from "../../../Vars"

export default (props) => {
  const { isDarkmode } = useTheme();

  if (props.icon === "car-side") {
    return (
      <FontAwesome5
        name={props.icon}
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginBottom: 3,
        }}
        size={20}
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
        size={22}
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
