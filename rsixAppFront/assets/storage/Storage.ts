import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";

// {
//     "email": "foyeso8338@mainoj.com",
//     "password": "QMsxiBT7645!",
//     "username": "pioeirgjoj4njoe",
//     "platform": "uplay"
// }

export const saveUserData = async (
  email: string,
  password: string,
  username: string,
  platform: string
) => {
  try {
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("password", password);
    await AsyncStorage.setItem("username", username);
    await AsyncStorage.setItem("platform", platform);
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

    return {
      savedEmail: email as string,
      savedPassword: password as string,
      savedUsername: username as string,
      savedPlatform: platform as string,
    };
  } catch (error) {
    console.error("Nie udało się wczytać ustawień", error);
    return null;
  }
};

// export const sendUserData = async () => {
//   try {
//     const email = await AsyncStorage.getItem("email");
//     const password = await AsyncStorage.getItem("password");
//     const username = await AsyncStorage.getItem("username");
//     const platform = await AsyncStorage.getItem("platform");

//     if (email && password && username && platform) {
//       await axios.get("http://192.168.88.89:6996/api/statistics", {
//         params: {
//           email: email as string,
//           password: password as string,
//           username: username as string,
//           platform: platform as string,
//         },
//       });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
