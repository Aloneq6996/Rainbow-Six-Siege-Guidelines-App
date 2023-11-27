// external imports

import React, { useState, useEffect } from "react";
import {
  Alert,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";
import { Image } from "expo-image";
import axios from "axios";

// internal imports

import { styles } from "../assets/styles";
import { SettingsScreenProps } from "../assets/types/ScreenProps";

export const Settings: React.FC<SettingsScreenProps> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    loadSettings();
  }, []);

  const saveSettings = async () => {
    try {
      await axios.post("http://192.168.88.141:6969/api/saveSettings", {
        email: email,
        password: password,
      });
      Alert.alert("Sukces", "Poprawnie zapisano dane!");
    } catch (error) {
      Alert.alert("Error", `Nie udało się zapisać danych: ${error}`);
    }
  };

  const removeSettings = async () => {
    try {
      await axios.post("http://192.168.88.141:6969/api/removeSettings");
      Alert.alert("Sukces", "Ustawienia usunięte poprawnie!");
    } catch (error) {
      Alert.alert("Error", `Nie udało się usunąć danych: ${error}`);
    }
  };

  const loadSettings = async () => {
    try {
      const response = await axios.get(
        "http://192.168.88.141:6969/api/loadSettings"
      );

      if (!response.data) return;
      const { email, password } = response.data;

      setEmail(email);
      setPassword(password);
    } catch (error) {
      Alert.alert("Error", `Błąd podczas ładowania danych: ${error}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../assets/png/logo.png")} />
      <Text style={styles.textColor}>{email}</Text>
      <Text style={styles.textColor}>{password}</Text>
      <View style={styles.settingsList}>
        <Text style={styles.textColor}>E-Mail:</Text>
        <TextInput
          style={styles.settingsInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoFocus
        />
        <Text style={styles.textColor}>Hasło:</Text>
        <TextInput
          style={styles.settingsInput}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          autoFocus
        />
        <Button title="Save" onPress={saveSettings} />
        <Button title="remove data" onPress={removeSettings} />
      </View>
    </SafeAreaView>
  );
};
