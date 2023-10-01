import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";

export default function ({ route, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState(null)

  const loginHandler = () => {
    setError(null);
    if (email.length == 0) {
      Alert.alert('email field is empty, please enter user email');
      return;
    }
    if (password.length == 0) {
      Alert.alert('password field is empty, please enter password');
      return;
    }

    axios.post(
      `http://192.168.1.3:8000/api/v1/users/login`, {
      "email": email,
      "password": password
    })
      .then(result => {
        console.log(result.data);
        AsyncStorage.setItem('user_token', result.data.token)
          .then(result => {
            console.log('Login has been done. Token has been stored as successfully');
            navigation.navigate('Home');
          })
          .catch(err => {
            console.log("token could not been stored..." + err.message);
            setError("token could not been stored..." + err.message);
          });
      }).catch(error => {
        console.log(error.response);
        setError(error.response.data.error.message);
      });
  };
  AsyncStorage.getItem('user_token').then(result => setToken(result)).catch(error => console.log(error.message));

  return (
    <View>
      <Image
        style={{ width: "100%", height: "50%" }}
        source={require("../../assets/images/signup.jpeg")}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          marginTop: 10,
          color: "gray"
        }}
      >
        Login
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 15,
          marginTop: 10,
          marginHorizontal: 30,
          color: "green"
        }}
      >
        ==========Token========{token}
        =======================User has got login successfully
      </Text>
      {error &&
        <Text style={{ margin: 30, textAlign: 'center', color: 'red' }}>
          {error}
        </Text>}
      <MyInput
        value={email}
        keyboardType="email-address"
        placeholder="Please enter your e-mail address"
        onChangeText={setEmail}
      />
      <MyInput
        value={password}
        secureTextEntry={true}
        placeholder="Please enter your password"
        onChangeText={setPassword}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <MyButton title="Back" onPress={() => navigation.goBack()} />
        <MyButton title="Login" onPress={loginHandler} />
      </View>
    </View>
  );
}

const css = StyleSheet.create({
  inputField: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10
  },
  button: {
    marginVertical: 5
  }
});
