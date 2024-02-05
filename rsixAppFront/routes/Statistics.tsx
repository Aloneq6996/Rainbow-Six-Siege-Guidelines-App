import {
  SafeAreaView,
  View,
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
import { loadUserData } from "../assets/storage/Storage";

export const Statistics: React.FC<StatysticsScreenProps> = (props) => {
  const [user, setUser] = useState<any>();
  const [rank, setRank] = useState<any>();
  const [userStats, setUsersStats] = useState<any>();

  useEffect(() => {
    statistics();
  }, []);

  const statistics = async () => {
    try {
      const userData = await loadUserData();

      if (
        !userData?.savedEmail ||
        !userData.savedPassword ||
        !userData.savedUsername ||
        !userData.savedPlatform
      ) {
        Alert.alert(
          "Proszę podać mail, hasło, nazwę użytkownika i platfrome konta Ubisoft",
          "Nie martw się te dane są zapisywane tylko na twoim urządzeniu"
        );
        props.navigation.replace("Settings");
        return;
      }

      const response = await axios.get(
        "http://172.20.10.2:6996/api/statistics",
        {
          params: {
            email: userData.savedEmail as string,
            password: userData.savedPassword as string,
            username: userData.savedUsername as string,
            platform: userData.savedPlatform as string,
          },
        }
      );

      // console.log(response.data);

      if (!response.data) {
        Alert.alert("Error", `Wystąpił błąd podczas ładowania statystyk`);
        return;
      }

      const user = response.data.user;
      // const rank = response.data.rank;

      console.log(user);
      // console.log(JSON.stringify(rank));

      // const userStats = rank.seasons["27"];
      // const setUser = userStats?.regions?.emea?.boards?.pvp_ranked?.current;

      // console.log(Object.keys(rank[0]));
      // console.log(rank[0].seasons["27"]);

      const username = user[0].username;

      console.log(username);

      setUser(username);
      // setRank(userRank);
    } catch (error) {
      Alert.alert("ERROR", `${error}`);
      return;
    }
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
