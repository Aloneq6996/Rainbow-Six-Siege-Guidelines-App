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
import RNPickerSelect from "react-native-picker-select";

// internal imports

import { styles } from "../assets/styles";
import { SettingsScreenProps } from "../assets/types/ScreenProps";

export const Settings: React.FC<SettingsScreenProps> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");

  useEffect(() => {
    loadSettings();
  }, []);

  const ubi = "Uplay";
  const ps = "PlayStation Network";
  const xb = "Xbox Live";

  const saveSettings = async () => {
    try {
      await axios.post("http://192.168.88.141:6969/api/saveSettings", {
        email: email,
        password: password,
        username: username,
        platform: platform,
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
      const { email, password, username, platform } = response.data;

      setEmail(email);
      setPassword(password);
      setUsername(username);
      setPlatform(platform);
    } catch (error) {
      Alert.alert("Error", `Błąd podczas ładowania danych: ${error}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../assets/png/logo.png")} />
      <View style={styles.settingsList}>
        <Text style={styles.textColor}>E-Mail:</Text>
        <TextInput
          style={styles.settingsInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.textColor}>Hasło:</Text>
        <TextInput
          style={styles.settingsInput}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Text style={styles.textColor}>Nazwa użytkownika:</Text>
        <TextInput
          style={styles.settingsInput}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Text style={styles.textColor}>Platforma:</Text>
        <RNPickerSelect
          style={styles.dropdownInput}
          onValueChange={(value) => setPlatform(value)}
          items={[
            { label: "Uplay", value: "uplay" },
            { label: "Xbox Live", value: "xbl" },
            { label: "Play Station Network", value: "psn" },
          ]}
          value={platform}
        >
          <View style={styles.settingsInput}>
            <Text style={styles.textColor}>
              {platform === "psn"
                ? ps
                : platform === "xbl"
                ? xb
                : platform === "uplay"
                ? ubi
                : null}
            </Text>
          </View>
        </RNPickerSelect>
        <Button title="Save" onPress={saveSettings} />
        <Button title="remove data" onPress={removeSettings} />
      </View>
    </SafeAreaView>
  );
};

// "email": "foyeso8338@mainoj.com",
// "password": "QMsxiBT7645!"
