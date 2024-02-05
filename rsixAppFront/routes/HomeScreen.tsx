import { SafeAreaView, View, TouchableHighlight, Text } from "react-native";
import { Image } from "expo-image";

import { styles } from "../assets/styles";
import { devHanlder } from "../assets/handlers/devHandler";

import { HomeScreenProps } from "../assets/types/ScreenProps";
import { fixHanlder } from "../assets/handlers/fixHandler";

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
            onPress={() => props.navigation.push("WeaponsList")}
          >
            <Text style={styles.textColor}>Bronie</Text>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            style={styles.btn}
            underlayColor={"#363434"}
            onPress={() => {
              // devHanlder();
              props.navigation.push("Statistics");
            }}
          >
            <Text style={styles.textColor}>Statystyki</Text>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            style={styles.btn}
            underlayColor={"#363434"}
            onPress={() => {
              props.navigation.push("News");
            }}
          >
            <Text style={styles.textColor}>Nowości</Text>
          </TouchableHighlight>
        </View>
      </View>
      <TouchableHighlight
        style={styles.settingsButton}
        onPress={() => props.navigation.navigate("Settings")}
      >
        <Image
          style={styles.settingsIcon}
          source={require("../assets/png/settings.png")}
        />
      </TouchableHighlight>
    </SafeAreaView>
  );
};
