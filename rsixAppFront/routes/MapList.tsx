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
import { MapListScreenProps } from "../assets/types/ScreenProps";

const mapsJson = require("../assets/json/maps/maps.json");

export const MapList: React.FC<MapListScreenProps> = (props) => {
  const [searchText, setSearchText] = useState("");
  const filteredMaps = mapsJson.filter((item: any) =>
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
        placeholder="Wyszukaj mape"
        placeholderTextColor={"#fff"}
        style={styles.searchInput}
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />

      <View style={styles.containerList}>
        <FlatList
          data={filteredMaps}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => {
                console.log(item.name);
              }}
            >
              <View style={styles.itemContainer}>
                <View style={styles.mapContent}>
                  <Text style={styles.textColorBold}>{item.name}</Text>
                  {item.playlists.map((playlist: string) => (
                    <Text key={playlist} style={styles.itemText}>
                      {playlist}
                    </Text>
                  ))}
                  <Text style={styles.itemText}>
                    Data wydania: {item.released}
                  </Text>
                  {item?.reworked ? (
                    <Text style={styles.itemText}>Rework: {item.reworked}</Text>
                  ) : null}
                  <Image source={item.image} style={styles.imageMap} />
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    </SafeAreaView>
  );
};
