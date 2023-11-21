import { useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  View,
  FlatList,
  TouchableHighlight,
  Text,
} from "react-native";

import { Image } from "expo-image";

import { styles } from "../assets/styles";
import { OperatorsListDefenseScreenProps } from "../assets/types/ScreenProps";

const operatorsDefenseJson = require("../assets/json/operators/operatorsDefense.json");

export const OperatorsListDefense: React.FC<OperatorsListDefenseScreenProps> = (
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
        <Image source={require("../assets/png/logo.png")} style={styles.logo} />
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
