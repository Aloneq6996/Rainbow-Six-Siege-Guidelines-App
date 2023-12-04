import { Alert } from "react-native";

export const devHanlder = () => {
  Alert.alert("Dawid Deweloper", "Funkcja jest w trakcie tworzenia", [
    {
      text: "o ale super",
    },
  ]);
};
