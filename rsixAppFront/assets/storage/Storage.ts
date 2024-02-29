import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const DEFAULT_LANGUAGE = "pl";

export const saveUserData = async (
  email: string,
  password: string,
  username: string,
  platform: string,
  language: string
) => {
  try {
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("password", password);
    await AsyncStorage.setItem("username", username);
    await AsyncStorage.setItem("platform", platform);
    await AsyncStorage.setItem("language", language);
    return Alert.alert("Udało się!", "Udało się zapisać ustawienia");
  } catch (error) {
    console.error(error);
    return Alert.alert("Error", "Nie udało się zapisać ustawień");
  }
};

export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem("email");
    await AsyncStorage.removeItem("password");
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("platform");
    await AsyncStorage.setItem("language", DEFAULT_LANGUAGE);
    return Alert.alert("Udało się!", "Udało się usunąć ustawienia");
  } catch (error) {
    console.error(error);
    return Alert.alert("Error", "Nie udało się usunąć ustawień");
  }
};

export const loadUserData = async () => {
  try {
    const email = await AsyncStorage.getItem("email");
    const password = await AsyncStorage.getItem("password");
    const username = await AsyncStorage.getItem("username");
    const platform = await AsyncStorage.getItem("platform");
    const language = await AsyncStorage.getItem("language");

    if (!language) await AsyncStorage.setItem("language", "pl");

    return {
      savedEmail: email as string,
      savedPassword: password as string,
      savedUsername: username as string,
      savedPlatform: platform as string,
      savedLanguage: language as string,
    };
  } catch (error) {
    console.error("Nie udało się wczytać ustawień", error);
    return null;
  }
};

export const languageChange = async () => {
  try {
    const language = await AsyncStorage.getItem("language");
    if (!language) await AsyncStorage.setItem("language", DEFAULT_LANGUAGE);

    return {
      choosenLanguage: language as string,
    };
  } catch (error) {
    await AsyncStorage.setItem("language", DEFAULT_LANGUAGE);
    return error;
  }
};
