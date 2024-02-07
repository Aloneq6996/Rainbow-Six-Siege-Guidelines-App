// external imports
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Linking,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { Image } from "expo-image";
import axios from "axios";
// import Video, { VideoProperties } from "react-native-video";
import markdownit from "markdown-it";
import { useEffect, useState } from "react";
import WebView from "react-native-webview";
import HTML from "react-native-render-html";

// internal imports
import { styles } from "../assets/styles";
import { IndividualNewsScreenProps } from "../assets/types/ScreenProps";

export const IndividualNews: React.FC<IndividualNewsScreenProps> = (props) => {
  const {route} = props;
  const [newsData, setNewsData] = useState<string>();

  useEffect(() => {
    getOneNews();
  }, []);

  const getOneNews = async () => {
    try {
      const response = await axios.get(
          "http://172.20.10.2:6996/api/individualNews",
          {
            params: {
              id: route.params.newsId,
            },
          }
      );

      if (!response.data) {
        return null;
      }

      const md = markdownit({html: true});
      const result = md.render(response.data.item[0].content);

      setNewsData(result);

    } catch (error) {
      console.error(error);
    }
  };

  const addStyleTag = (htmlContent: string, cssStyles: string): string => {
    const styleTag = `<style>${cssStyles}</style>`
    return `${styleTag}${htmlContent}`
  }

  const cssStyle = `
    *{
      background: black;
      color: white;
    }
    p{
      
    }
    `

  const htmlWithStyle = addStyleTag(newsData as string, cssStyle)

  const width = useWindowDimensions().width
  const height = useWindowDimensions().height

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../assets/png/logo.png")} />

      <View style={styles.containerList}>
          {newsData && (
            <View style={{width: width, height: height + 10, flex: 1}}>
              <WebView
                source={{ html: htmlWithStyle }}
                style={{width: width, flex: 1}}
              />
              {/*<HTML source={{html: newsData}} contentWidth={width}/>*/}
            </View>
          )}
      </View>
    </SafeAreaView>
  );
};
