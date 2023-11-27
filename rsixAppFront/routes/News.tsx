import {
  SafeAreaView,
  View,
  TouchableHighlight,
  Text,
  TouchableOpacity,
} from "react-native";
import { Image } from "expo-image";
import React from "react";

import { styles } from "../assets/styles";
import { NewsScreenProps } from "../assets/types/ScreenProps";

export const News: React.FC<NewsScreenProps> = (props) => {
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
