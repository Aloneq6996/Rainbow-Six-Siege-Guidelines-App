// external imports

import { SafeAreaView, View, TouchableHighlight, Text } from "react-native";
import { Image } from "expo-image";
import axios from "axios";
import { useEffect, useState } from "react";

// internal imports

import { styles } from "../assets/styles";
import { IndividualNewsScreenProps } from "../assets/types/ScreenProps";
import { NewsItemType } from "../assets/types/Types";

export const IndividualNews: React.FC<IndividualNewsScreenProps> = (props) => {
  const { route } = props;
  const [newsData, setNewsData] = useState<any>();

  console.log(newsData);
  useEffect(() => {
    getOneNews();
  }, []);

  const getOneNews = async () => {
    try {
      const response = await axios.get(
        "http://192.168.88.141:6996/api/individualNews",
        {
          params: {
            id: route.params.newsId,
          },
        }
      );

      if (!response.data) {
        return null;
      }

      setNewsData(response.data.item[0].abstract);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../assets/png/logo.png")} />
      <View>
        {/* {newsData &&
          newsData?.map((item) => (
            <View>
              <Text style={styles.textColor}>{item.abstract}</Text>
            </View>
          ))} */}
        <Text style={styles.textColor}>sd</Text>

        <Text style={styles.textColor}>{newsData}</Text>
      </View>
    </SafeAreaView>
  );
};
