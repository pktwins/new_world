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

export default () => {
    const state = useContext(UserContext);
    console.log("=====" + state);
    return (
        <UserState>
            <NavigationContainer>
                <Drawer.Navigator initialRouteName='New world Bookstore'>
                    <Drawer.Screen name="New world Bookstore" component={StackNavigator} />
                    {/* <Drawer.Screen name="New world bookstore" component={HomeScreen} /> */}
                    {state.isLoggedIn ? (<Drawer.Screen name="Logout" component={SignupScreen} />)
                        : (
                            <>
                                <Drawer.Screen name="Login" component={LoginScreen} />
                                <Drawer.Screen name="Signup" component={SignupScreen} />
                            </>
                        )};

                </Drawer.Navigator>
            </NavigationContainer>
        </UserState>
    );
};
