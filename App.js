import 'react-native-gesture-handler';
import React from "react";
import { Alert, View, Button } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/screens/HomeScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';
import { Feather } from '@expo/vector-icons';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const StackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: "#636e72" },
      headerTintColor: "white",
      headerTitleStyle: { fontSize: 22 }
    }}
    initialRouteName="Home"
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={({ navigation }) => ({
        // title: "New World Bookstore",
        headerRight: () => <Feather style={{ marginHorizontal: 10 }} name="menu" size={30} color="#fdcb6e" onPress={() => navigation.toggleDrawer()} />
      })}
    />

    <Stack.Screen
      name="Detail"
      component={BookDetailScreen}
      options={({ navigation }) => ({
        // title: "New World Bookstore",
        headerBackTitleVisible: true,
        headerBackTitle: "Back",
        headerTruncatedBackTitle: "",
        headerLeft: () =>
          <View style={{ marginHorizontal: 5 }}>
            {/* <Button title="Back"
              color='#fdcb6e'

              onPress={() => {
                Alert.alert("Attention", "Are you sure to back?", [
                  {
                    text: "Cancel",
                    onPress: () => console.log("болих")
                  },
                  {
                    text: "Back",
                    onPress: () => navigation.goBack()
                  }
                ]);
              }}
            /> */}
          </View>
      })
      }
    />
  </Stack.Navigator>
);



const DrawerNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='New world Bookstore'>
        {/* <Drawer.Screen name="New world Bookstore" component={StackNavigator} /> */}
        <Drawer.Screen name="New world Bookstore" component={HomeScreen} />
        <Drawer.Screen name="Login" component={StackNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
};


export default DrawerNavigator;
