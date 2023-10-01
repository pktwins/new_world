import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import axios from 'axios';
import MyButton from "../components/MyButton";
import MyInput from "../components/MyInput";

export default function ({ route, navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);

  const signupHandler = () => {
    setError(null);
    if (name.length == 0) {
      Alert.alert('name field is empty, please enter user name');
      return;
    }
    if (email.length == 0) {
      Alert.alert('email field is empty, please enter email address');
      return;
    }
    if (password1 !== password2) {
      Alert.alert('passwords are not same');
      return;
    }

    axios.post(
      `http://192.168.1.3:8000/api/v1/users/register`, {
      "name": name,
      "email": email,
      "password": password1,
      "role": "user"
    })
      .then(result => {
        console.log(result.data);
        navigation.navigate('Home');
      }
      )
      .catch(error => {
        console.log(error.response);
        setError(error.response.data.error.message);
      })
  };

  return (
    <View>
      <Image
        style={{ width: "100%", height: "40%" }}
        source={require("../../assets/images/login.png")}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          marginTop: 10,
          color: "gray"
        }}
      >
        New user registration
      </Text>
      {error &&
        <Text style={{ margin: 30, textAlign: 'center', color: 'red' }}>
          {error}
        </Text>}

      <MyInput
        value={name}
        keyboardType="default"
        placeholder="Please enter your name"
        onChangeText={setName}
      />
      <MyInput
        value={email}
        keyboardType="email-address"
        placeholder="Please enter your e-mail address"
        onChangeText={setEmail}
      />

      <MyInput
        value={password1}
        secureTextEntry={true}
        placeholder="Please enter password for entrance"
        onChangeText={setPassword1}
      />

      <MyInput
        value={password2}
        secureTextEntry={true}
        placeholder="Please repeat above password"
        onChangeText={setPassword2}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <MyButton title="Back" onPress={() => navigation.goBack()} />
        <MyButton title="Register" onPress={signupHandler} />
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
