import {
  SafeAreaView,
  View,
  TouchableHighlight,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { styles } from "../assets/styles";
import { StatysticsScreenProps } from "../assets/types/ScreenProps";
import { SeasonData } from "../assets/types/Types";

export const Statistics: React.FC<StatysticsScreenProps> = (props) => {
  const [user, setUser] = useState<any>();
  const [rank, setRank] = useState<any>();
  const [userStats, setUsersStats] = useState<any>();

  useEffect(() => {
    loadSettings();
    statistics();
  }, []);
  const loadSettings = async () => {
    const response = await axios.get(
      "http://192.168.88.141:6969/api/loadSettings"
    );
    if (!response.data) {
      Alert.alert(
        "Proszę podać mail i hasło do konta Ubisoft",
        "Nie martw się te dane są zapisywane tylko na twoim urządzeniu"
      );
      props.navigation.replace("Settings");
      return;
    }
  };

  const statistics = async () => {
    const response = await axios.get(
      "http://192.168.88.141:6969/api/statistics"
    );

    if (!response.data) {
      Alert.alert("Error", `Wystąpił błąd podczas ładowania statystyk`);
      return;
    }

    const user = response.data.user;
    const rank = response.data.rank;

    const userStats = rank.seasons[-1];
    const userRank = userStats?.regions?.emea?.boards?.pvp_ranked?.current;

    setUser(user);
    setRank(userRank);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Home")}
        activeOpacity={0.8}
        style={styles.logoBtn}
      >
        <Image source={require("../assets/png/logo.png")} style={styles.logo} />
      </TouchableOpacity>
      <View>
        {user && (
          <View>
            <Text style={styles.textColor}>Użytkownik: {user}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
