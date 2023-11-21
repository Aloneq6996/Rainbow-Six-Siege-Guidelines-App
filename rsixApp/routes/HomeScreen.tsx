import { SafeAreaView, View, TouchableHighlight, Text } from "react-native";
import { Image } from "expo-image";

import { styles } from "../assets/styles";
import { notAvailableYet } from "../assets/notAvaibleHandler";

import { HomeScreenProps } from "../assets/types/ScreenProps";

export const HomeScreen: React.FC<HomeScreenProps> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../assets/png/logo.png")} />
      <View>
        <View>
          <TouchableHighlight
            style={styles.btn}
            underlayColor={"#363434"}
            onPress={() => props.navigation.push("Operators")}
          >
            <Text style={styles.textColor}>Operatorzy</Text>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            style={styles.btn}
            underlayColor={"#363434"}
            onPress={notAvailableYet}
          >
            <Text style={styles.textColor}>Mapy</Text>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            style={styles.btn}
            underlayColor={"#363434"}
            onPress={() => props.navigation.push("WeaponsList")}
          >
            <Text style={styles.textColor}>Bronie</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};
