import React, { useContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useTheme, themeColor } from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";

// Screens
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import About from "../screens/About";
import Track from "../screens/Track";
import Loading from "../screens/utils/Loading";

// Auth screens
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import ForgetPassword from "../screens/auth/ForgetPassword";
import { AuthContext } from "../provider/AuthProvider";

// Better put your these secret keys in .env file
const firebaseConfig = {
  apiKey: "AIzaSyCt9YHjNGMBL1g9RYPkzEhPBVtn74991MQ",
  authDomain: "red-line-6577e.firebaseapp.com",
  databaseURL: "https://red-line-6577e.firebaseio.com",
  projectId: "red-line-6577e",
  storageBucket: "red-line-6577e.appspot.com",
  messagingSenderId: "674959264736",
  appId: "1:674959264736:web:6aebdfd3527b42af7ab985",
};

if (getApps().length === 0) { initializeApp(firebaseConfig); }

const AuthStack = createNativeStackNavigator();
const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />
    </AuthStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="Settings" component={Settings} />
    </MainStack.Navigator>
  );
};

const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  const { isDarkmode } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
          backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
        },
      }}
    >
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name="Track"
        component={Track}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Track" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"md-speedometer-sharp"} />
          ),
        }}
      />

      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Home" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"md-home"} />
          ),
        }}
      />

      <Tabs.Screen
        name="Your Ride"
        component={About}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Your Ride" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"car-sharp"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default () => {
  const auth = useContext(AuthContext);
  const user = auth.user;
  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth />}
      {user == true && <Main />}
    </NavigationContainer>
  );
};
