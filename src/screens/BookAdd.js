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
import FormSwitch from "../components/FormSwitch";
import FormPicker from "../components/FormPicker";
import useCategory from "../hooks/useCategory";
import Spinner from "../components/Spinner";

const BookAdd = () => {
  const [categories, errorMessage, loading] = useCategory();
  const [book, setBook] = useState({
    name: "",
    content: "",
    price: "",
    author: "",
    bestseller: "This book is not bestseller",
    category: "literature",
  });
  const [error, setError] = useState({
    name: false,
    content: false,
    price: false,
    author: false,
  });

  const toggleBestSeller = () => {
    setBook({
      ...book,
      bestseller:
        book.bestseller === "This book is bestseller"
          ? "This book is not bestseller"
          : "This book is bestseller",
    });
  };
  const checkName = (text) => {
    // let isValid = false;
    // if (text.length < 5 || text.length > 30) isValid = true;
    // setError({
    //   ...error,
    //   name: isValid,
    // });

    setError({
      ...error,
      name: text.length < 5 || text.length > 31,
    });

    setBook({
      ...book,
      name: text,
    });
  };
  const checkAuthor = (text) => {
    setError({
      ...error,
      author: text.length < 4 || text.length > 21,
    });
    setBook({
      ...book,
      author: text,
    });
  };
  const checkPrice = (text) => {
    setError({
      ...error,
      price: text < 5,
    });
    setBook({
      ...book,
      price: text,
    });
  };
  const checkContent = (text) => {
    setError({
      ...error,
      content: text.length > 1001,
    });
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
        {loading ? (
          <Spinner />
        ) : (
          <ScrollView
          // showsVerticalScrollIndicator="false"
          >
            <FormText
              label="Enter book title"
              placeHolder="title of book"
              icon="book"
              value={book.name}
              onChangeText={checkName}
              errorText="Book title must be at least 4 at most 30 letters"
              errorShow={error.name}
            />
            <FormText
              label="Enter author name"
              placeHolder="author name"
              icon="user"
              value={book.author}
              onChangeText={checkAuthor}
              errorText="Author name must be 4-20 letters"
              errorShow={error.author}
            />
            <FormText
              label="Enter price"
              placeHolder="per book price"
              icon="dollar-sign"
              keyboardType="numeric"
              value={book.price}
              onChangeText={checkPrice}
              errorText="Book price must be at least 5 USD"
              errorShow={error.price}
            />
            <FormText
              label="Enter brief content"
              placeHolder="at most 1000 letters will be settled for brief"
              icon="edit-3"
              multiline
              numberOfLines={10}
              value={book.content}
              onChangeText={checkContent}
              errorText="Brief content must be at most 1000 letters"
              errorShow={error.content}
            />
            <FormSwitch
              label="Bestseller or not"
              icon="trending-up"
              value={book.bestseller}
              onChangeValue={toggleBestSeller}
              data={["This book is bestseller", "This book is not bestseller"]}
            />
            <FormPicker
              label="Choose category:"
              icon="layers"
              data={categories.map((el) => el.name)}
              value={categories.map((el) => el._id)}
              onValueChange={(value, index) => {
                setBook({ ...book, category: value });
                console.log(value);
              }}
              selectedValue={book.category}
            />
          </ScrollView>
        )}
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default BookAdd;
