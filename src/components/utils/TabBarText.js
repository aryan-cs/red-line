import React from "react";
import { Text, themeColor, useTheme } from "react-native-rapi-ui";
import * as VARS from "../../../Vars";
import AppText from "../AppText";

export default (props) => {

  const { isDarkmode } = useTheme();
  
  return (

    <AppText
      style = {{
        marginBottom: 5,
        color: props.focused
          ? isDarkmode
            ? themeColor.white100
            : VARS.redline
          : "#757575",
        fontSize: 10,
      }}
      string = {props.title} />

  );
  
};
