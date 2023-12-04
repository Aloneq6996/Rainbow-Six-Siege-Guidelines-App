import { Alert } from "react-native";

export const notAvailableYet = () => {
  Alert.alert("Bartek Budowniczy", "Funkcja jest jeszcze niedostępna", [
    {
      text: "no dobra :(",
    },
  ]);
};
