// import { useHeaderHeight } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import React, { useState, useEffect, useLayoutEffect, useContext } from "react";
import useBook from "../hooks/useBook";
import UserContext from "../context/UserContext";

const BookDetailScreen = (props) => {
  const { id } = props.route.params;
  const [book, error] = useBook(id);
  const userState = useContext(UserContext);

  if (error) {
    return (
      <Text style={{ color: "red", margin: 30 }}>Error occured! {error}</Text>
    );
  }
  if (!book) {
    return null;
  }
  return (
    <View style={{ padding: 20 }}>
      <Image
        style={{ width: 300, height: 400, alignSelf: "center" }}
        source={{ uri: "https://m.media-amazon.com/images/I" + book.photo }}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold", marginHorizontal: 60, top: 10 }}>
        {book.name}
      </Text>
      <Text style={{ textAlign: 'center', marginHorizontal: 40, marginTop: 10, color: 'red', fontSize: 20 }}>
        {"User logged in? - " + userState.isLoggedIn}
      </Text>
      <Text style={{ marginHorizontal: 60 }}>{book.content}</Text>
      <View style={{ marginHorizontal: 100, marginTop: 35 }}>
        <Button title="Context tester"
          color='#00a8ff'
          onPress={() => userState.setIsLoggedIn(!userState.isLoggedIn)}
        />
      </View>
      <View style={{ marginHorizontal: 150 }}>
        <Button title="Back"
          color='#00a8ff'
          onPress={() => {
            Alert.alert("Attention", "Are you sure to back?", [
              {
                text: "Cancel",
                onPress: () => console.log("cancel")
              },
              {
                text: "Back",
                onPress: () => props.navigation.goBack()
              }
            ]);
          }}
        />
      </View>
    </View >
  );
};

export default BookDetailScreen;

const styles = StyleSheet.create({});
