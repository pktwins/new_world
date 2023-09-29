import React, { useState, useEffect, useLayoutEffect } from "react";
import { HeaderBackButton, useHeaderHeight } from "@react-navigation/elements";
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import useBook from "../hooks/useBook";

const BookDetailScreen = props => {
  const { id } = props.route.params;
  console.log(props.route.params);
  const [book, error] = useBook(id);

  const height = useHeaderHeight();
  // useLayoutEffect(() => {
  //   props.navigation.setOptions({
  //     headerRight: () => <Feather style={{ marginHorizontal: 10 }} name="menu" size={30} color="#fdcb6e" onPress={() => props.navigation.toggleDrawer()} />
  //   })
  // }, [props.navigation]);

  if (error) {
    return (
      <Text style={{ color: "red", margin: 30 }}>Error occured! {error}</Text>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <View style={{ marginTop: height }}>

      <Image
        style={{ width: 300, height: 400, alignSelf: "center" }}
        source={{ uri: "https://m.media-amazon.com/images/I" + book.photo }}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold", marginHorizontal: 60, top: 10 }}>
        {book.name}
      </Text>
      <Text style={{ marginHorizontal: 60, marginTop: 15 }}>{book.content}</Text>
      <View style={{ marginHorizontal: 150, marginTop: 15 }}>
        {/* <Button onPress={() => props.navigation.goBack()} title="Back" /> */}
        <Button title="Back"
          color='#00a8ff'

          onPress={() => {
            Alert.alert("Attention", "Are you sure to back?", [
              {
                text: "Cancel",
                onPress: () => console.log("болих")
              },
              {
                text: "Back",
                onPress: () => props.navigation.goBack()
              }
            ]);
          }}
        />
      </View>

    </View>
  );
};

export default BookDetailScreen;

const styles = StyleSheet.create({});
