import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { Avatar, Caption, Title, Drawer } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import UserContext from "../context/UserContext";
import { SimpleLineIcons } from "@expo/vector-icons";

const DrawerContent = (props) => {
  const state = useContext(UserContext);
  state.setIsLoggedIn(true);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ flexDirection: "row", paddingLeft: 20, marginTop: 20 }}>
          <Avatar.Image
            source={require("../../assets/adaptive-icon.png")}
            size={50}
          />
          <View style={{ marginLeft: 10 }}>
            <Title style={{ fontSize: 16, fontWeight: "bold", lineHeight: 25 }}>
              Batjargal Gochoosuren
            </Title>
            <Caption style={{ lineHeight: 13 }}>Admin</Caption>
          </View>
        </View>
        <View style={{ marginHorizontal: 15, marginTop: 20 }}>
          <Drawer.Section>
            <DrawerItem
              label="Book store"
              icon={() => <Feather name="book-open" size={20} color="black" />}
            />
          </Drawer.Section>
          <Drawer.Section>
            {state.isLoggedIn ? (
              <View>
                {state.userRole === "admin" && (
                  <Drawer.Section>
                    <DrawerItem
                      label="Add new book"
                      icon={() => (
                        <AntDesign name="addfile" size={20} color="black" />
                      )}
                    />
                  </Drawer.Section>
                )}
                <DrawerItem
                  label="Logout"
                  icon={() => (
                    <AntDesign name="logout" size={20} color="black" />
                  )}
                />
              </View>
            ) : (
              <View>
                <Drawer.Section>
                  <DrawerItem
                    label="Registration"
                    icon={() => (
                      <AntDesign name="setting" size={20} color="black" />
                    )}
                  />
                </Drawer.Section>
                <DrawerItem
                  label="Login"
                  icon={() => (
                    <SimpleLineIcons name="login" size={20} color="black" />
                  )}
                />
              </View>
            )}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default DrawerContent;
