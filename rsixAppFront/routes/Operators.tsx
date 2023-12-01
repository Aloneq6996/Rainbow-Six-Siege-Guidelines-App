import {
  SafeAreaView,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Text,
} from "react-native";
import { Image } from "expo-image";

import { styles } from "../assets/styles";

import { OperatorsScreenProps } from "../assets/types/ScreenProps";

export const Operators: React.FC<OperatorsScreenProps> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.push("Home")}
        activeOpacity={0.8}
        style={styles.logoBtn}
      >
        <Image source={require("../assets/png/logo.png")} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.moveUp}>
        <View>
          <TouchableHighlight
            style={styles.btn}
            underlayColor={"#363434"}
            onPress={() => props.navigation.push("OperatorsListAttack")}
          >
            <Text style={styles.textColor}>Atakujący</Text>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            style={styles.btn}
            underlayColor={"#363434"}
            onPress={() => props.navigation.push("OperatorsListDefense")}
          >
            <Text style={styles.textColor}>Broniący</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};
