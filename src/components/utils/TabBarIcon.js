import React from "react";
import { themeColor, useTheme } from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import * as VARS from "../../../Vars"

export default (props) => {
  const { isDarkmode } = useTheme();
  return (
    <Ionicons
      name={props.icon}
      style={{}}
      size={24}
      color={
        props.focused
          ? isDarkmode
            ? themeColor.white100
            : VARS.redline
          : "#757575"
      }
    />
  );
};
