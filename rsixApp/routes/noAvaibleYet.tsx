import { Alert } from "react-native";

export const notAvailableYet = () => {
  Alert.alert("Bob budowniczy", "Funkcja niedostępna jeszcze", [
    {
      text: "no dobra :(",
    },
  ]);
};
