import 'react-native-gesture-handler';
import React, { useContext } from "react";
import { Alert, View, Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/screens/HomeScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';
import { Feather } from '@expo/vector-icons';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import { UserState } from './src/context/UserContext';
import UserContext from './src/context/UserContext';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName="Home"
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
    />
    <Stack.Screen
      name="Detail"
      component={BookDetailScreen}
    />
  </Stack.Navigator>
);

const DrawerNavigator = () => {
  const state = useContext(UserContext);
  const drawerScreens = state
    ? [{ name: 'New world Bookstore', component: StackNavigator }, { name: 'Logout', component: SignupScreen }]
    : [
      { name: 'New world Bookstore', component: StackNavigator },
      { name: 'Login', component: LoginScreen },
      { name: 'Signup', component: SignupScreen }
    ];

  return (
    <UserState>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName='New world Bookstore'>
          {drawerScreens.map(({ name, component }) => (
            <Drawer.Screen name={name} component={component} key={name} />
          ))}
        </Drawer.Navigator>
      </NavigationContainer>
    </UserState >

  );
};
export default DrawerNavigator;