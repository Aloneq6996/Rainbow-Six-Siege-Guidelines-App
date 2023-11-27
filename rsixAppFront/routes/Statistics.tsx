import {
  SafeAreaView,
  View,
  TouchableHighlight,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { styles } from "../assets/styles";
import { StatysticsScreenProps } from "../assets/types/ScreenProps";

export const Statistics: React.FC<StatysticsScreenProps> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  useEffect(() => {
    loadSettings();
  }, []);
  const loadSettings = async () => {
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
    const { email, password } = response.data;

    console.log(response.data);
    console.log(email);
    console.log(password);

    setEmail(email);
    setPassword(password);
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
      <View>
        <Text style={styles.textColor}>{email}</Text>
        <Text style={styles.textColor}>{password}</Text>
      </View>
    </SafeAreaView>
  );
};
