import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-rapi-ui";
import * as VARS from "../../Vars";

const Layout = (props) => {

    const { isDarkmode } = useTheme();

    return (
        <SafeAreaView
            {...props}
            style={[
                props.style,
                {
                    flex: 1,
                    backgroundColor: isDarkmode ? VARS.darkMode : VARS.lightMode,
                },
            ]}>

      {props.children}
    
    </SafeAreaView>

  );

};

export default Layout;