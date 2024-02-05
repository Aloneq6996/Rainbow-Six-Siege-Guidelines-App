import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { styles } from "../assets/styles";
import { NewsScreenProps } from "../assets/types/ScreenProps";
import { NewsItemType } from "../assets/types/Types";

export const News: React.FC<NewsScreenProps> = (props) => {
  const [newsData, setNewsData] = useState<NewsItemType[] | undefined>();
  let [limit, setLimit] = useState<number>(5);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      const response = await axios.get("http://192.168.88.89:6996/api/news", {
        params: {
          limit: limit,
        },
      });

      setNewsData(response.data.news.items);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", `Wystąpił błąd podczas ładowania nowości: ${error}`);
    }
  };

  const renderButtons = () => {
    if (!newsData || typeof newsData !== "object") {
      return <Text style={styles.textColor}>Ładowanie danych...</Text>;
    }
    return newsData.map((item) => (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.8}
        onPress={() => handleButtonPress(item.id)}
        style={{
          marginVertical: 10,
          padding: 10,
          borderColor: "white",
          borderWidth: 2,
          borderRadius: 8,
        }}
      >
        <Text style={styles.textColorHeader}>{item.title}</Text>
        <Text style={styles.textColor}>{item.abstract}</Text>
      </TouchableOpacity>
    ));
  };

  const handleButtonPress = (id: string) => {
    props.navigation.push("IndividualNews", { newsId: id });
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
      <View style={styles.containerList}>
        <Text style={styles.textColorHeaderBold2}>Nowości</Text>
        <ScrollView
          style={{ flex: 1, margin: 10 }}
          contentInsetAdjustmentBehavior={"automatic"}
        >
          <View>{renderButtons()}</View>
        </ScrollView>
      </View>
      <TouchableHighlight style={styles.moreBtn}>
        <Text
          style={styles.textColor}
          onPress={() => {
            let newLimit = limit + 5;
            setLimit(newLimit);
            getNews();
          }}
        >
          Wczytaj więcej
        </Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
};
