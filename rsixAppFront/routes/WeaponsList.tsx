import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableHighlight,
} from "react-native";
import { Image } from "expo-image";
import { useState } from "react";

import { styles } from "../assets/styles";
import { WeaponsListScreenProps } from "../assets/types/ScreenProps";
import * as Type from "../assets/types/Types";

const weaponsJson = require("../assets/json/weapons/weaponsPrimary.json");
const weaponsSecondaryJson = require("../assets/json/weapons/weaponsSecondary.json");

export const WeaponsList: React.FC<WeaponsListScreenProps> = (props) => {
  const [searchText, setSearchText] = useState("");

  const weapons: (Type.WeaponPrimary | Type.WeaponSecondary)[] = [
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
        <Image source={require("../assets/png/logo.png")} style={styles.logo} />
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
