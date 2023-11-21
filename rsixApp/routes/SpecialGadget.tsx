// external imports

import {
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
} from "react-native";
import { Image } from "expo-image";

// internal imports

import { styles } from "../assets/styles";
import { SpecialGadgetScreenProps } from "../assets/types/ScreenProps";
import * as Type from "../assets/types/Types";

import { devHanlder } from "../assets/devHandler";

// require

const specialGadgetJson = require("../assets/json/weapons/specialGadgets.json");

export const SpecialGadget: React.FC<SpecialGadgetScreenProps> = (props) => {
  const { route } = props;

  const gadget: Type.SpecialGadget | undefined = specialGadgetJson.find(
    (sGadget: any) => sGadget.name === route.params.gadgetName
  );

  if (!gadget) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Home")}
          activeOpacity={0.8}
          style={styles.logoBtn}
        >
          <Image
            source={require("../assets/png/logo.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.textColor}>Gadżet nieznaleziony</Text>
        </View>
      </SafeAreaView>
    );
  }

  const showQuantity: boolean = gadget.quantity.trim() !== "";

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentInsetAdjustmentBehavior="automatic"
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Home")}
          activeOpacity={0.8}
          style={styles.logoBtn}
        >
          <Image
            source={require("../assets/png/logo.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
        <View></View>
      </SafeAreaView>
    </ScrollView>
  );
};
