import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { mainColor, lightColor, textColor } from "../Constant";
import FormText from "../components/FormText";
import * as Animatable from "react-native-animatable";

const BookAdd = () => {
  const [book, setBook] = useState({
    name: "",
    content: "",
    price: "",
    author: "",
    bestseller: true,
  });

  const checkName = (text) => {
    setBook({
      ...book,
      name: text,
    });
  };
  const checkAuthor = (text) => {
    setBook({
      ...book,
      author: text,
    });
  };
  const checkPrice = (text) => {
    setBook({
      ...book,
      price: text,
    });
  };
  const checkContent = (text) => {
    setBook({
      ...book,
      content: text,
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: mainColor }}>
      <StatusBar backgroundColor={mainColor} barStyle="light-content" />
      <View
        style={{
          flex: 1,
          backgroundColor: mainColor,
          paddingHorizontal: 30,
          paddingVertical: 20,
        }}
      >
        <Text style={{ fontSize: 24, color: lightColor }}>
          - New book which will be added
        </Text>
        <Text style={{ fontSize: 16, color: lightColor, marginTop: 10 }}>
          Please enter new book related information as detail
        </Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        duration={800}
        style={{
          flex: 5,
          backgroundColor: "#fff",
          paddingHorizontal: 30,
          paddingVertical: 20,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
        }}
      >
        <ScrollView>
          <FormText
            label="Enter book title"
            placeHolder="title of book"
            icon="book"
            value={book.name}
            onChangeText={checkName}
          />
          <FormText
            label="Enter author name"
            placeHolder="author name"
            icon="user"
            value={book.author}
            onChangeText={checkAuthor}
          />
          <FormText
            label="Enter price"
            placeHolder="per book price"
            icon="dollar-sign"
            keyboardType="numeric"
            value={book.price}
            onChangeText={checkPrice}
          />
          <FormText
            label="Enter brief content"
            placeHolder="at most 1000 letters will be settled for brief"
            icon="edit-3"
            multiline
            numberOfLines={10}
            value={book.content}
            onChangeText={checkContent}
          />
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default BookAdd;
