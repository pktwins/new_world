import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { mainColor, lightColor } from "../Constant";
import * as Animatable from "react-native-animatable";
import FormSwitch from "../components/FormSwitch";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = (props) => {
  const [alarm, setAlarm] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("alarm")
      .then((result) => {
        console.log("++++++", JSON.parse(result).alarm);
        setAlarm(JSON.parse(result).alarm);
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleAlarm = () => {
    setAlarm((alarm) => {
      console.log("전에", alarm);
      const newValue = !alarm;
      console.log("후에", newValue);
      AsyncStorage.setItem("alarm", JSON.stringify({ alarm: newValue }));
      return newValue;
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
          - Settings for local notification
        </Text>
        <Text style={{ fontSize: 16, color: lightColor, marginTop: 10 }}>
          Please set alarm on book SALE
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
          <FormSwitch
            label="Remind book SALE or not"
            icon="clock"
            value={alarm}
            onChangeValue={toggleAlarm}
            data={["remind me book sale", "do not remind me"]}
          />
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SettingsScreen;
