// IMPORTS

import { useState } from "react";
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
  ScrollView,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

// requires

const operatorsJson = require("./assets/json/operators/operatorsAttack.json");
const weaponsJson = require("./assets/json/weapons/weaponsPrimary.json");
const weaponsSecondaryJson = require("./assets/json/weapons/weaponsSecondary.json");

// Types, interfaces

type RootStackParamList = {
  Home: undefined;
  Operators: undefined;
  OperatorsListAttack: undefined;
  OperatorsListDefense: undefined;
  OperatorsSpecific: { operatorName: string; imageUri: string };
  Maps: undefined;
  WeaponsList: undefined;
  WeaponSpecific: { weaponName: string };
};

type Operator = {
  id: number;
  role: string;
  name: string;
  surname: string;
  nickname: string;
  mainLoadout: Record<string, any>;
  secLoadout: Record<string, any>;
  uniGadget: Record<string, any>;
  counters: string[];
  counteredBy: string[];
};
type WeaponPrimary = {
  id: number;
  name: string;
  type: string;
  damage: number;
  operators: string[];
  attachments: Record<string, any>;
};

type WeaponSecondary = {
  id: number;
  name: string;
  type: string;
  damage: number;
  operators: string[];
  attachments: {
    barrels: string[];
    underbarrel: string[];
    extra?: {
      scopes: string[];
      grip: string[];
    };
  };
};

// Screen Props

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

type OperatorsSpecificScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "OperatorsSpecific"
>;
type WeaponsListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "WeaponsList"
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
            onPress={() => props.navigation.push("WeaponsList")}
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

const sledgeImage = require("./assets/json/images/operators/attack/sledge.png");
const thatcherImage = require("./assets/json/images/operators/attack/thatcher.png");
const ashImage = require("./assets/json/images/operators/attack/ash.png");
const thermiteImage = require("./assets/json/images/operators/attack/thermite.png");
const twitchImage = require("./assets/json/images/operators/attack/twitch.png");
const montagneImage = require("./assets/json/images/operators/attack/montagne.png");

const imageMapping: { [key: string]: any } = {
  "sledge.png": sledgeImage,
  "thatcher.png": thatcherImage,
  "ash.png": ashImage,
  "thermite.png": thermiteImage,
  "twitch.png": twitchImage,
  "montagne.png": montagneImage,
};

const OperatorsListAttack: React.FC<OperatorsListAttackScreenProps> = (
  props
) => {
  const [searchText, setSearchText] = useState("");
  const filteredOperators = operatorsJson.filter((item: any) =>
    item.nickname.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Home")}
        activeOpacity={0.8}
        style={styles.logoBtn}
      >
        <Image source={require("./assets/logo.png")} style={styles.logo} />
      </TouchableOpacity>

      <TextInput
        placeholder="Wyszukaj operatora"
        placeholderTextColor={"#fff"}
        style={styles.searchInput}
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      <View style={styles.containerList}>
        <FlatList
          data={filteredOperators}
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

// Specific Operator

const OperatorsSpecific: React.FC<
  OperatorsSpecificScreenProps & { operatorName: string }
> = ({ route }) => {
  const operator: Operator | undefined = operatorsJson.find(
    (op: any) => op.nickname === route.params.operatorName
  );

  if (!operator) {
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={require("./assets/logo.png")} />
        <View>
          <Text style={styles.textColor}>Operator nieznaleziony</Text>
        </View>
      </SafeAreaView>
    );
  }

  const weaponsAssignedPrimary: WeaponPrimary[] = weaponsJson.filter(
    (weapon: any) => weapon.operators.includes(operator.nickname)
  );

  const weaponsAssignedSecondary: WeaponSecondary[] =
    weaponsSecondaryJson.filter((weaponSec: any) =>
      weaponSec.operators.includes(operator.nickname)
    );

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentInsetAdjustmentBehavior="automatic"
    >
      <SafeAreaView style={styles.container}>
        <Image style={styles.logoOp} source={require("./assets/logo.png")} />
        <View style={styles.personalContainer}>
          <Text style={styles.textColorHeaderBold}>{operator.role}</Text>
          <Image
            source={imageMapping[`${route.params.imageUri}`]}
            style={styles.imageOp}
          />
          <Text style={styles.textColor}>
            {operator.name} "
            <Text style={styles.textColorBold}>{operator.nickname}</Text>"{" "}
            {operator.surname}
          </Text>
          <Text style={styles.textColorHeaderBold}>Broń główna</Text>
          <View>
            {weaponsAssignedPrimary.map((weapon) => (
              <View key={weapon.id}>
                <Text style={styles.textColor}>
                  {weapon.name} | {weapon.type}
                </Text>
              </View>
            ))}
          </View>
          <Text style={styles.textColorHeaderBold}>Broń Boczna</Text>
          <View>
            {weaponsAssignedSecondary.map((weaponSec) => (
              <View key={weaponSec.id}>
                <Text style={styles.textColor}>
                  {weaponSec.name} | {weaponSec.type}
                </Text>
              </View>
            ))}
          </View>
          <Text style={styles.textColorHeaderBold}>Gadżety</Text>
          <View>
            {Object.entries(operator.uniGadget).map(([weapon, stats]) => (
              <Text
                onPress={() => {
                  Alert.alert("Ilość", `${stats.quantity}`, [
                    {
                      text: "za mało",
                    },
                  ]);
                }}
                style={styles.textColor}
                key={weapon}
              >
                {weapon} | {stats.type}
              </Text>
            ))}
          </View>
          <Text style={styles.textColorHeaderBold}>
            {operator.nickname} kontruje
          </Text>
          <View>
            <Text style={styles.textColor}>{operator.counters.join(", ")}</Text>
          </View>
          <Text style={styles.textColorHeaderBold}>
            {operator.nickname} jest kontrowany/a przez
          </Text>
          <View>
            <Text style={styles.textColor}>
              {operator.counteredBy.join(", ")}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const WeaponsList: React.FC<WeaponsListScreenProps> = (props) => {
  const [searchText, setSearchText] = useState("");
  const filteredWeapons = weaponsJson.filter((item: any) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Home")}
        activeOpacity={0.8}
        style={styles.logoBtn}
      >
        <Image source={require("./assets/logo.png")} style={styles.logo} />
      </TouchableOpacity>

      <TextInput
        placeholder="Wyszukaj broń"
        placeholderTextColor={"#fff"}
        style={styles.searchInput}
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      <View style={styles.containerList}>
        <FlatList
          data={filteredWeapons}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.textColor}>{item.name}</Text>
            </View>
          )}
        />
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
          component={OperatorsSpecific}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WeaponsList"
          component={WeaponsList}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "#000",
  },
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
  logoOp: {
    position: "absolute",
    width: 100,
    height: 100,
    top: -10,
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
    margin: 8,
  },
  textColorBold: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    margin: 8,
  },
  textColorHeaderBold: {
    color: "#fff",
    textAlign: "center",
    fontSize: 21,
    fontWeight: "bold",
    margin: 8,
  },
  containerList: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 110,
  },
  personalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    top: 100,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
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
    width: 60,
    height: 60,
  },
  searchInput: {
    height: 40,
    width: 152,
    top: 100,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    color: "#fff",
    margin: 10,
    padding: 10,
  },
});
