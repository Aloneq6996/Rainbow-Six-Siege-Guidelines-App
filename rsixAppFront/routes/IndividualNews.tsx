// external imports
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import axios from "axios";
import Video from "react-native-video";
import { RenderHTML } from "react-native-render-html";
import { useEffect, useState } from "react";

// internal imports
import { styles } from "../assets/styles";
import { IndividualNewsScreenProps } from "../assets/types/ScreenProps";
import { IndividualNewsType } from "../assets/types/Types";

type CustomRenderers = {
  img?: (
    htmlAttribs: any,
    children: any,
    convertedCSSStyles: any,
    passProps: any
  ) => JSX.Element;
  video?: (
    htmlAttribs: any,
    children: any,
    convertedCSSStyles: any,
    passProps: any
  ) => JSX.Element;
  a?: (
    htmlAttribs: any,
    children: any,
    convertedCSSStyles: any,
    passProps: any
  ) => JSX.Element;
  h1?: (
    htmlAttribs: any,
    children: any,
    convertedCSSStyles: any,
    passProps: any
  ) => JSX.Element;
  h2?: (
    htmlAttribs: any,
    children: any,
    convertedCSSStyles: any,
    passProps: any
  ) => null;
  h3?: (
    htmlAttribs: any,
    children: any,
    convertedCSSStyles: any,
    passProps: any
  ) => null;
};

export const IndividualNews: React.FC<IndividualNewsScreenProps> = (props) => {
  const { route } = props;
  const [newsData, setNewsData] = useState<IndividualNewsType>();

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

      setNewsData(response.data.item[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const customRenderers: CustomRenderers = {
    img: (htmlAttribs, children, convertedCSSStyles, passProps) => (
      <Image
        source={{ uri: htmlAttribs.src }}
        style={{ width: useWindowDimensions().width, height: 200 }}
      />
    ),
    video: (htmlAttribs, children, convertedCSSStyles, passProps) => (
      <Video
        source={{ uri: htmlAttribs.src }}
        style={{ width: useWindowDimensions().width, height: 200 }}
        controls
      />
    ),
  };

  const { width } = useWindowDimensions();

  console.log(newsData?.content);
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../assets/png/logo.png")} />
      <View>
        <Text style={styles.textColorHeaderBold}>{newsData?.title}</Text>
        <Text style={styles.textColorBold}>{newsData?.abstract}</Text>
        <ScrollView
          style={styles.scrollContainer}
          contentInsetAdjustmentBehavior="automatic"
        >
          {newsData && (
            <RenderHTML
              source={{ html: newsData.content }}
              contentWidth={width}
              renderers={customRenderers}
              baseStyle={{ color: "white" }}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
