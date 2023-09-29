import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Button
} from "react-native";
import {
  HeaderButtons,
  Item,
  HiddenItem,
  OverflowMenu,
  Divider
} from 'react-navigation-header-buttons';
import { Feather } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Search from "../components/Search";
import useCategory from "../hooks/useCategory";
import CategoryBookList from "../components/CategoryBookList";
import Spinner from "../components/Spinner";
import MyHeaderButton from '../components/MyHeaderButton';

const HomeScreen = ({ navigation }) => {
  const [localSearchText, setLocalSearchText] = useState("");
  const [serverSearchText, setServerSearchText] = useState("");
  const [categories, errorMessage, loading] = useCategory();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => <Feather style={{ marginHorizontal: 10 }} name="menu" size={30} color="#fdcb6e" onPress={() => navigation.toggleDrawer()} />
  //   })
  // }, [navigation]);
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <HeaderButtons HeaderButtonComponent={MyHeaderButton}>
  //         <OverflowMenu
  //           OverflowIcon={() => (
  //             <MaterialIcons name="more-horiz" size={30} color='#fdcb6e' />
  //           )}
  //         >
  //           <HiddenItem title="hidden1" onPress={() => alert('hidden1')} />
  //           <HiddenItem title="hidden2" onPress={() => alert('hidden2')} />
  //           <HiddenItem title="hidden3" onPress={() => alert('hidden3')} />
  //           <Divider />

  //         </OverflowMenu>
  //       </HeaderButtons >
  // <View style={{ marginHorizontal: 5 }}>
  //   <Button
  //     title="Menu"
  //     color='#fdcb6e'
  //     onPress={() => Alert.alert("Your searched text: " + localSearchText)}
  //   />
  // </View>
  //     )
  //   });
  // }, [navigation, localSearchText]);

  const searchBookFromServer = () => {
    console.log(`Сэрвэрээс ${localSearchText} утгаар хайж эхэллээ...`);

    setServerSearchText(localSearchText);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {loading ? (
        <Spinner />
      ) : (
        <View>
          <Search
            value={localSearchText}
            onValueChange={setLocalSearchText}
            onFinishEnter={searchBookFromServer}
          />

          {errorMessage && (
            <Text style={{ marginHorizontal: 20, color: "red" }}>
              {errorMessage}
            </Text>
          )}
          <ScrollView style={{ marginTop: 20 }}>
            {categories.map(category => (
              <CategoryBookList
                searchLocalValue={localSearchText}
                searchServerValue={serverSearchText}
                key={category._id}
                style={{ marginVertical: 10 }}
                data={category}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
