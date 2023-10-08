import React, { useContext } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MyStackNavigator from "./MyStackNavigator";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import UserContext from "../context/UserContext";
import HomeScreen from "../screens/HomeScreen";

const Drawer = createDrawerNavigator();

export default () => {
  const state = useContext(UserContext);

  return (
    <Drawer.Navigator initialRouteName="Book store">
      <Drawer.Screen name="BookStore" component={MyStackNavigator} />
      {state.isLoggedIn ? (
        <>
          {state.userRole === "admin" && (
            <Drawer.Screen name="Add new book" component={MyStackNavigator} />
          )}
          <Drawer.Screen name="Logout" component={HomeScreen} />
        </>
      ) : (
        <>
          <Drawer.Screen name="Registration" component={SignupScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Drawer.Navigator>
  );
};
