import { Alert } from "react-native";

export const notAvailableYet = () => {
  Alert.alert("Bartek Budowniczy", "Funkcja jest niedostępna", [
    {
      text: "no dobra :(",
    },
  ]);
};
