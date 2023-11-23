// external imports

import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";
import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";

// internal imports

import { styles } from "../assets/styles";
import { SettingsScreenProps } from "../assets/types/ScreenProps";

export const Settings: React.FC<SettingsScreenProps> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);
    } catch (error) {
      Alert.alert("ERROR", "Nie udało się zapisać danych");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../assets/png/logo.png")} />
      <View style={styles.containerList}>
        <Text style={styles.textColor}>Email</Text>
        <TextInput
          style={styles.searchInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text>Password:</Text>
        <TextInput
          style={styles.searchInput}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Button title="Save" onPress={saveSettings} />
      </View>
    </SafeAreaView>
  );
};
