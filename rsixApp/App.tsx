// IMPORTS

import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableHighlight,
  Text,
  Alert,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

// requires

const operatorsAttackJson = require("./assets/json/operators/operatorsAttack.json");
const operatorsDefenseJson = require("./assets/json/operators/operatorsDefense.json");
const weaponsJson = require("./assets/json/weapons/weaponsPrimary.json");
const weaponsSecondaryJson = require("./assets/json/weapons/weaponsSecondary.json");
const uniGadgetsJson = require("./assets/json/weapons/gadgets.json");

// Types, interfaces

type RootStackParamList = {
  Home: undefined;
  Operators: undefined;
  OperatorsListAttack: undefined;
  OperatorsListDefense: undefined;
  OperatorsSpecific: { operatorName: string };
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
  counters: string[];
  counteredBy: string[];
  image: string;
};
type WeaponPrimary = {
  id: number;
  name: string;
  type: string;
  damage: number;
  operators: string[];
  attachments: Record<string, any>;
  image: string;
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
  image: string;
};

type uniGadget = {
  id: number;
  name: string;
  type: string;
  description: string;
  quantity: number;
  operators: string[];
  image: string;
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

type WeaponSpecificScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "WeaponSpecific"
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
            onPress={() => props.navigation.push("OperatorsListDefense")}
          >
            <Text style={styles.textColor}>Broniący</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Operators on Attack

const OperatorsListAttack: React.FC<OperatorsListAttackScreenProps> = (
  props
) => {
  const [searchText, setSearchText] = useState("");
  const filteredOperators = operatorsAttackJson.filter((item: any) =>
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
                });
              }}
            >
              <View style={styles.itemContainer}>
                <View style={styles.itemContent}>
                  <Image source={item.image} style={styles.image} />
                  <Text style={styles.itemText}>{item.nickname}</Text>
                </View>
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
  const [searchText, setSearchText] = useState("");
  const filteredOperators = operatorsDefenseJson.filter((item: any) =>
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
                });
              }}
            >
              <View style={styles.itemContainer}>
                <View style={styles.itemContent}>
                  <Image source={item.image} style={styles.image} />
                  <Text style={styles.itemText}>{item.nickname}</Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

// Specific Operator

const OperatorsSpecific: React.FC<OperatorsSpecificScreenProps> = (props) => {
  const { route } = props;

  const operators: Operator[] = [
    ...operatorsAttackJson,
    ...operatorsDefenseJson,
  ];

  const operator: Operator | undefined = operators.find(
    (op: any) => op.nickname === route.params.operatorName
  );

  if (!operator) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Home")}
          activeOpacity={0.8}
          style={styles.logoBtn}
        >
          <Image source={require("./assets/logo.png")} style={styles.logo} />
        </TouchableOpacity>
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

  const uniGadgetAssigned: uniGadget[] = uniGadgetsJson.filter((gadget: any) =>
    gadget.operators.includes(operator.nickname)
  );

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
            source={require("./assets/logo.png")}
            style={styles.logoSpecific}
          />
        </TouchableOpacity>
        <View style={styles.personalContainer}>
          <Text style={styles.textColorHeaderBold}>{operator.role}</Text>
          <Image source={operator.image} style={styles.imageOp} />
          <Text style={styles.textColor}>
            {operator.name} "
            <Text style={styles.textColorBold}>{operator.nickname}</Text>"{" "}
            {operator.surname}
          </Text>
          <Text style={styles.textColorHeaderBold}>Broń główna</Text>
          <View>
            {weaponsAssignedPrimary.map((weapon) => (
              <TouchableHighlight
                key={weapon.id}
                onPress={() => {
                  props.navigation.navigate("WeaponSpecific", {
                    weaponName: weapon.name,
                  });
                }}
              >
                <View>
                  <Text style={styles.textColor}>
                    {weapon.name} | {weapon.type}
                  </Text>
                </View>
              </TouchableHighlight>
            ))}
          </View>
          <Text style={styles.textColorHeaderBold}>Broń Boczna</Text>
          <View>
            {weaponsAssignedSecondary.map((weaponSec) => (
              <TouchableHighlight
                key={weaponSec.id}
                onPress={() => {
                  props.navigation.navigate("WeaponSpecific", {
                    weaponName: weaponSec.name,
                  });
                }}
              >
                <View>
                  <Text style={styles.textColor}>
                    {weaponSec.name} | {weaponSec.type}
                  </Text>
                </View>
              </TouchableHighlight>
            ))}
          </View>
          <Text style={styles.textColorHeaderBold}>Gadżety</Text>
          <View>
            {uniGadgetAssigned.map((gadget) => (
              <View key={gadget.id}>
                <TouchableHighlight
                  onPress={() => {
                    Alert.alert(
                      `Ilość: ${gadget.quantity}`,
                      `${gadget.description}`,
                      [
                        {
                          text: "Okej",
                        },
                      ]
                    );
                  }}
                >
                  <Text style={styles.textColor}>{gadget.name}</Text>
                </TouchableHighlight>
              </View>
            ))}
          </View>
          <Text style={styles.textColorHeaderBold}>
            {operator.nickname} kontruje
          </Text>
          <View style={styles.rowContent}>
            {operator.counters.map((op) =>
              op === "-" ? (
                <Text key={op} style={styles.textColor}>
                  {op}
                </Text>
              ) : (
                <TouchableHighlight
                  key={op}
                  onPress={() => {
                    props.navigation.push("OperatorsSpecific", {
                      operatorName: op,
                    });
                  }}
                >
                  <View>
                    <Text style={styles.textColor}>{op}</Text>
                  </View>
                </TouchableHighlight>
              )
            )}
          </View>
          <Text style={styles.textColorHeaderBold}>
            {operator.nickname} jest kontrowany/a przez
          </Text>
          <View style={styles.rowContent}>
            {operator.counteredBy.map((op) =>
              op === "-" ? (
                <Text key={op} style={styles.textColor}>
                  {op}
                </Text>
              ) : (
                <TouchableHighlight
                  key={op}
                  onPress={() => {
                    props.navigation.push("OperatorsSpecific", {
                      operatorName: op,
                    });
                  }}
                >
                  <View style={styles.rowContent}>
                    <Text style={styles.textColor}>{op}</Text>
                  </View>
                </TouchableHighlight>
              )
            )}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const WeaponsList: React.FC<WeaponsListScreenProps> = (props) => {
  const [searchText, setSearchText] = useState("");

  const weapons: (WeaponPrimary | WeaponSecondary)[] = [
    ...weaponsJson,
    ...weaponsSecondaryJson,
  ];

  const filteredWeapons = weapons.filter((item: any) =>
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
              <TouchableHighlight
                onPress={() => {
                  props.navigation.navigate("WeaponSpecific", {
                    weaponName: item.name,
                  });
                }}
              >
                <View style={styles.itemContainer}>
                  <View style={styles.itemContent}>
                    <Text style={styles.itemText}>{item.name}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const WeaponSpecific: React.FC<WeaponSpecificScreenProps> = (props) => {
  const { route } = props;
  const weapons: (WeaponPrimary | WeaponSecondary)[] = [
    ...weaponsJson,
    ...weaponsSecondaryJson,
  ];
  const weapon = weapons.find((wp: any) => wp.name === route.params.weaponName);

  if (!weapon) {
    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={require("./assets/logo.png")} />
        <View>
          <Text style={styles.textColor}>Broń nieznaleziona</Text>
        </View>
      </SafeAreaView>
    );
  }

  {
    Object.entries(weapon.attachments).map(([category, items]) => {
      if (
        (category === "scopes" ||
          category === "barrels" ||
          category === "grips" ||
          category === "underbarrel") &&
        (!Array.isArray(items) || items.length === 0)
      )
        return null;
    });
  }

  return (
    <ScrollView
      style={styles.scrollContainer}
      contentInsetAdjustmentBehavior="automatic"
    >
      <SafeAreaView style={styles.container}>
        <Image style={styles.logoOp} source={require("./assets/logo.png")} />
        <View style={styles.personalContainer}>
          <Image
            style={styles.imageWeapon}
            source={weapon.image}
            placeholder="nie ma fotki"
          />
          <Text style={styles.textColorHeader}>{weapon.name}</Text>
          <View style={styles.attachmentsContainer}>
            {Object.entries(weapon.attachments).map(([category, items]) => {
              if (
                (category === "scopes" ||
                  category === "barrels" ||
                  category === "grips" ||
                  category === "underbarrel") &&
                (!Array.isArray(items) || items.length === 0)
              ) {
                return null;
              }

              let categoryLabel = category;

              if (category === "scopes") {
                categoryLabel = "Lunety";
              } else if (category === "barrels") {
                categoryLabel = "Lufy";
              } else if (category === "grips") {
                categoryLabel = "Uchwyt";
              } else if (category === "underbarrel") {
                categoryLabel = "Dodatki";
              } else if (category === "extra") {
                categoryLabel = "Dodatkowe";
              }

              return (
                <View key={category}>
                  <Text style={styles.attachmentsCategory}>
                    {categoryLabel}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {Array.isArray(items)
                      ? items.map((item) => (
                          <Text key={item} style={styles.attachmentText}>
                            {item}
                          </Text>
                        ))
                      : Object.entries(items).map(([subCategory, subItems]) => {
                          let subCategoryLabel = subCategory;

                          if (subCategory === "grip") {
                            subCategoryLabel = "Uchwyt";
                          } else if (subCategory === "scopes") {
                            subCategoryLabel = "Lunety";
                          }
                          return (
                            <View
                              key={subCategory}
                              style={{
                                flex: 1,
                                flexDirection: "column",
                              }}
                            >
                              <Text style={styles.attachmentsCategory}>
                                {subCategoryLabel}
                              </Text>
                              {(subItems as string[]).map((item) => (
                                <View
                                  key={item}
                                  style={{
                                    flexDirection: "row",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Text style={styles.attachmentText}>
                                    {item}
                                  </Text>
                                </View>
                              ))}
                            </View>
                          );
                        })}
                  </View>
                </View>
              );
            })}
            <Text style={styles.textColorHeaderBold}>Operatorzy</Text>
            {weapon.operators.map((operator) => (
              <View key={operator}>
                <TouchableHighlight
                  onPress={() => {
                    props.navigation.navigate("OperatorsSpecific", {
                      operatorName: operator,
                    });
                  }}
                >
                  <View>
                    <Text style={styles.textColor}>{operator}</Text>
                  </View>
                </TouchableHighlight>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
          name="OperatorsListDefense"
          component={OperatorsListDefense}
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
        <Stack.Screen
          name="WeaponSpecific"
          component={WeaponSpecific}
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
  logoSpecific: {
    position: "absolute",
    width: 100,
    height: 100,
    top: -12,
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
  textColorHeader: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
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
    marginTop: 110,
  },
  personalContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 100,
    width: 390,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  itemText: {
    color: "#fff",
    flex: 1,
    fontSize: 17,
    marginLeft: 10,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#212020",
    borderRadius: 8,
  },
  rowContent: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    resizeMode: "contain",
  },
  imageOp: {
    width: 60,
    height: 60,
  },
  imageWeapon: {
    margin: 20,
    width: 300,
    height: 100,
    resizeMode: "contain",
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
  attachmentsContainer: {
    padding: 10,
    flex: 1,
  },
  attachmentsCategory: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
  },
  attachmentsSubCategory: {
    fontSize: 16,
    fontWeight: "bold",
  },
  attachmentText: {
    color: "#fff",
    fontSize: 17,
    margin: 8,
    flexDirection: "row",
    textAlign: "center",
  },
});
