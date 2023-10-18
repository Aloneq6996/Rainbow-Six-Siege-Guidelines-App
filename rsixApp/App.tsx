// IMPORTS

import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  TouchableHighlight,
  Text,
  Alert,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

// Types, interfaces

type RootStackParamList = {
  Home: undefined;
  Operators: undefined;
  OperatorsListAttack: undefined;
  OperatorsListDefense: undefined;
  OperatorsSpecific: { operatorName: string; imageUri: string };
  Maps: undefined;
  Weapons: undefined;
};

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
type OperatorsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Operators"
>;

type OperatorsListAttackScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "OperatorsListAttack"
>;

type OperatorsListDefenseScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "OperatorsListDefense"
>;

type OperatorsSpecific = NativeStackScreenProps<
  RootStackParamList,
  "OperatorsSpecific"
>;

// Not available handler

const notAvailableYet = () => {
  Alert.alert("Bob budowniczy", "Funkcja niedostępna jeszcze", [
    {
      text: "no dobra :(",
    },
  ]);
};

// Home Screen

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
            onPress={notAvailableYet}
          >
            <Text style={styles.textColor}>Mapy</Text>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            style={styles.btn}
            underlayColor={"#363434"}
            onPress={notAvailableYet}
          >
            <Text style={styles.textColor}>Bronie</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Choose Attack/Defense

const Operators: React.FC<OperatorsScreenProps> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={props.navigation.goBack}
        activeOpacity={0.8}
        style={styles.logoBtn}
      >
        <Image source={require("./assets/logo.png")} style={styles.logo} />
      </TouchableOpacity>
      <View>
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
            // onPress={() => props.navigation.push("OperatorsListDefense")}
            onPress={notAvailableYet}
          >
            <Text style={styles.textColor}>Broniący</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Operators on Attack

const data = require("./assets/json/operatorsAttack.json");

const sledgeImage = require("./assets/json/images/sledge.png");
const thatcherImage = require("./assets/json/images/thatcher.png");

const imageMapping: { [key: string]: any } = {
  "sledge.png": sledgeImage,
  "thatcher.png": thatcherImage,
};

const OperatorsListAttack: React.FC<OperatorsListAttackScreenProps> = (
  props
) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Home")}
        activeOpacity={0.8}
        style={styles.logoBtn}
      >
        <Image source={require("./assets/logo.png")} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.containerList}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => {
                props.navigation.navigate("OperatorsSpecific", {
                  operatorName: item.nickname,
                  imageUri: item.image,
                });
              }}
            >
              <View style={styles.itemContainer}>
                <Image source={imageMapping[item.image]} style={styles.image} />
                <Text style={styles.textColor}>{item.nickname}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

// Operators on Defense

const OperatorsListDefense: React.FC<OperatorsListDefenseScreenProps> = (
  props
) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("./assets/logo.png")} />
      <View></View>
    </SafeAreaView>
  );
};

const OperatorsSpecificTemplate: React.FC<
  OperatorsSpecific & { operatorName: string }
> = ({ route }) => {
  // const lowerCaseOperatorName = route.params.operatorName.toLowerCase();
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("./assets/logo.png")} />
      <View>
        <Image
          source={imageMapping[`${route.params.imageUri}`]}
          style={styles.imageOp}
        />
        <Text style={styles.textColor}>{route.params.operatorName}</Text>
      </View>
    </SafeAreaView>
  );
};

// Routing and main func

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
        <Stack.Screen
          name="OperatorsListAttack"
          component={OperatorsListAttack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OperatorsSpecific"
          component={OperatorsSpecificTemplate}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles

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
  logoBtn: {
    position: "absolute",
    width: 100,
    height: 100,
    top: 0,
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
  containerList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 110,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  imageOp: {
    width: 50,
    height: 50,
  },
});
