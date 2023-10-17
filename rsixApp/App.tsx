import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  TouchableHighlight,
  Text,
  Alert,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
type OperatorsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Operators"
>;

const HomeScreen: React.FC<HomeScreenProps> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("./assets/logo.png")} />
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
            onPress={() =>
              Alert.alert("Bob the builder", "Funkcja niedostępna jeszcze", [
                {
                  text: "no dobra :(",
                },
              ])
            }
          >
            <Text style={styles.textColor}>Mapy</Text>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            style={styles.btn}
            underlayColor={"#363434"}
            onPress={() =>
              Alert.alert("Bob the builder", "Funkcja niedostępna jeszcze", [
                {
                  text: "no dobra :(",
                },
              ])
            }
          >
            <Text style={styles.textColor}>Bronie</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

const Operators: React.FC<OperatorsScreenProps> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("./assets/logo.png")} />
      <View></View>
    </SafeAreaView>
  );
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Operators"
          component={Operators}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
    alignItems: "center",
  },
  logo: {
    position: "absolute",
    width: 100,
    height: 100,
    top: 35,
  },
  btn: {
    color: "#fff",
    justifyContent: "center",
    paddingVertical: 30,
    margin: 30,
    paddingHorizontal: 30,
    borderRadius: 30,
    elevation: 3,
    width: 200,
    height: 100,
    backgroundColor: "#2b2a2a",
    alignSelf: "stretch",
  },
  textColor: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
  },
});
