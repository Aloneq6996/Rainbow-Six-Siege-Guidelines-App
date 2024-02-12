import { SafeAreaView, View, TouchableHighlight, Text } from "react-native";
import { Image } from "expo-image";

import { styles } from "../assets/styles";
import { HomeScreenProps } from "../assets/types/ScreenProps";

import { notAvailableYet } from "../assets/handlers/notAvaibleHandler";
import { devHanlder } from "../assets/handlers/devHandler";

export const HomeScreen: React.FC<HomeScreenProps> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../assets/png/logo.png")} />
      <View style={{ top: 50 }}>
        <View>
          <TouchableHighlight
            style={styles.btn}
            underlayColor={"#363434"}
            onPress={() => props.navigation.push("Operators")}
          >
            <Text style={styles.btnText}>Operatorzy</Text>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            style={styles.btn}
            underlayColor={"#363434"}
            onPress={() => props.navigation.push("WeaponsList")}
          >
            <Text style={styles.btnText}>Bronie</Text>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            style={styles.btn}
            underlayColor={"#363434"}
            onPress={() => {
              devHanlder();
              props.navigation.push("MapList");
            }}
          >
            <Text style={styles.btnText}>Mapy</Text>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            style={styles.btn}
            underlayColor={"#363434"}
            onPress={() => {
              notAvailableYet();
              // props.navigation.push("Statistics");
            }}
          >
            <Text style={styles.btnText}>Statystyki</Text>
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
            <Text style={styles.btnText}>Nowości</Text>
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
