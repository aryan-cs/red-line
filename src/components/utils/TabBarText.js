import React from "react";
import { Text, useTheme } from "react-native-rapi-ui";
import * as VARS from "../../../Vars";
import AppText from "../AppText";

export default (props) => {

  const { isDarkmode } = useTheme();
  
  return (

    <AppText
      style = {{
        color: props.focused
          ? isDarkmode
            ? VARS.dark5 : VARS.light5
          : "#757575",
        fontSize: 10,
      }}
      string = {props.title} />

  );
  
};
