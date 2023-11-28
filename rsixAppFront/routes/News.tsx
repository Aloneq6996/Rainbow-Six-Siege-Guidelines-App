import {
  SafeAreaView,
  View,
  TouchableHighlight,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import React, { useEffect } from "react";
import axios from "axios";

import { styles } from "../assets/styles";
import { NewsScreenProps } from "../assets/types/ScreenProps";

export const News: React.FC<NewsScreenProps> = (props) => {
  useEffect(() => {
    loadSettings();
    getNews();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await axios.get(
        "http://192.168.88.141:6969/api/loadSettings"
      );
      if (!response.data) {
        Alert.alert(
          "Proszę podać mail i hasło do konta Ubisoft",
          "Nie martw się te dane są zapisywane tylko na twoim urządzeniu"
        );
        props.navigation.replace("Settings");
        return;
      }
    } catch (error) {
      console.error(error);
      Alert.alert("ERROR", `Wystąpił błąd podczas ładowania strony: ${error}`);
    }
  };

  const getNews = async () => {
    try {
      const response = await axios.get("http://192.168.88.141:6969/api/news");

      if (!response.data) {
        Alert.alert(
          "Proszę podać mail i hasło do konta Ubisoft",
          "Nie martw się te dane są zapisywane tylko na twoim urządzeniu"
        );
        props.navigation.replace("Settings");
        return;
      }

      console.log("uwu");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", `Wystąpił błąd podczas ładowania nowości: ${error}`);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Home")}
        activeOpacity={0.8}
        style={styles.logoBtn}
      >
        <Image source={require("../assets/png/logo.png")} style={styles.logo} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
