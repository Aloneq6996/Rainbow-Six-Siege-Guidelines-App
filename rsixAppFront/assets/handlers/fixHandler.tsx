import { Alert } from "react-native";

export const fixHanlder = () => {
  Alert.alert("Natan Naprawiacz", "Funkcja w trakcie naprawiania", [
    {
      text: "o kurcze poważna sprawa",
    },
  ]);
};
