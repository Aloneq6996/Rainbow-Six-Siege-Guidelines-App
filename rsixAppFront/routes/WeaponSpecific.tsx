import {
  SafeAreaView,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableHighlight,
  Text,
} from "react-native";
import { Image } from "expo-image";

import { styles } from "../assets/styles";
import { WeaponSpecificScreenProps } from "../assets/types/ScreenProps";
import * as Type from "../assets/types/Types";

const weaponsJson = require("../assets/json/weapons/weaponsPrimary.json");
const weaponsSecondaryJson = require("../assets/json/weapons/weaponsSecondary.json");

export const WeaponSpecific: React.FC<WeaponSpecificScreenProps> = (props) => {
  const { route } = props;
  const weapons: (Type.WeaponPrimary | Type.WeaponSecondary)[] = [
    ...weaponsJson,
    ...weaponsSecondaryJson,
  ];
  const weapon = weapons.find((wp: any) => wp.name === route.params.weaponName);

  if (!weapon) {
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
                      ? items.map((item) => {
                          let itemText = item;
                          let itemStyle: {
                            color: string;
                            fontSize: number;
                            margin: number;
                            flexDirection: "row";
                            textAlign: "center";
                            textDecorationLine: "none" | "underline";
                          } = {
                            color: "#fff",
                            fontSize: 17,
                            margin: 8,
                            flexDirection: "row",
                            textAlign: "center",
                            textDecorationLine: "none",
                          };
                          if (itemText.endsWith("X")) {
                            itemText = item.slice(0, -1);
                            itemStyle.textDecorationLine =
                              "underline" as "underline";
                          }
                          return (
                            <Text key={item} style={itemStyle}>
                              {itemText}
                            </Text>
                          );
                        })
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
                              {(subItems as string[]).map((item) => {
                                let itemText = item;
                                let itemStyle: {
                                  color: string;
                                  fontSize: number;
                                  margin: number;
                                  flexDirection: "row";
                                  textAlign: "center";
                                  textDecorationLine: "none" | "underline";
                                } = {
                                  color: "#fff",
                                  fontSize: 17,
                                  margin: 8,
                                  flexDirection: "row",
                                  textAlign: "center",
                                  textDecorationLine: "none",
                                };
                                if (item.endsWith("X")) {
                                  itemText = item.slice(0, -1);
                                  itemStyle.textDecorationLine =
                                    "underline" as "underline";
                                }
                                return (
                                  <View
                                    key={item}
                                    style={{
                                      flexDirection: "row",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Text style={itemStyle}>{itemText}</Text>
                                  </View>
                                );
                              })}
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
