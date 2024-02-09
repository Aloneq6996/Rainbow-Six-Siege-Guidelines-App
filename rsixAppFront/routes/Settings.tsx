import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, Button } from "react-native";
import { Image } from "expo-image";
import RNPickerSelect from "react-native-picker-select";

import { styles } from "../assets/styles";
import { SettingsScreenProps } from "../assets/types/ScreenProps";
import {
  loadUserData,
  removeUserData,
  saveUserData,
} from "../assets/storage/Storage";

export const Settings: React.FC<SettingsScreenProps> = (props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [platform, setPlatform] = useState<string>("");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const settings = await loadUserData();

    if (!settings) {
      return null;
    }

    setEmail(settings.savedEmail);
    setPassword(settings.savedPassword);
    setUsername(settings.savedUsername);
    setPlatform(settings.savedPlatform);
  };

  const saveSettings = async () => {
    if (!email || !password || !username || !platform) {
      return null;
    }

    saveUserData(email, password, username, platform);
  };

  const ubi = "Uplay";
  const ps = "PlayStation Network";
  const xb = "Xbox Live";

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
        <Button title="Save" onPress={() => saveSettings()} />
        <Button title="remove data" onPress={() => removeUserData()} />
      </View>
    </SafeAreaView>
  );
};
