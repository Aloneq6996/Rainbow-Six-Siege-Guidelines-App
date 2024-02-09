import {
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  TouchableHighlight,
} from "react-native";
import { Image } from "expo-image";

import { styles } from "../assets/styles";
import { SpecialGadgetScreenProps } from "../assets/types/ScreenProps";
import * as Type from "../assets/types/Types";

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
            style={styles.logoFix}
          />
        </TouchableOpacity>
        <View style={styles.personalContainer}>
          {gadget.image ? (
            <Image
              style={styles.imageAbility}
              source={gadget.image}
              placeholder="nie ma fotki"
            />
          ) : null}
          <Text style={styles.textColorHeaderBold}>{gadget.type}</Text>
          <Text style={styles.textColorHeader}>{gadget.name}</Text>
          <Text style={styles.textColor}>{gadget.description}</Text>
          {gadget.quantity ? (
            <View>
              <Text style={styles.textColorHeader}>Ilość:</Text>
              <Text style={styles.textColor}>{gadget.quantity}</Text>
            </View>
          ) : null}
          <Text style={styles.textColorHeader}>Operator</Text>
          <TouchableHighlight
            onPress={() => {
              props.navigation.navigate("OperatorsSpecific", {
                operatorName: gadget.operator,
              });
            }}
          >
            <View style={styles.border}>
              <Text style={styles.textColor}>{gadget.operator}</Text>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
