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
      const modifiedResult = result.replace(
          /<video[^>]*>\s*<source[^>]*src="\/\/([^"]+)"/g,
          '<video controls loop preload="auto"><source src="https://$1"'
      ).replace(
          /<img[^>]*src="\/\/([^"]+)"/g,
          '<img src="https://$1"'
      );

      setNewsData(modifiedResult);
    } catch (error) {
      console.error(error);
    }
  };

  const addStyleTag = (htmlContent: string, cssStyles: string): string => {
    const styleTag = `<style>${cssStyles}</style>`
    return `${styleTag}${htmlContent}`
  }

  const width = useWindowDimensions().width
  const height = useWindowDimensions().height

  const cssStyle = `
    *{
      background: black;
      color: white;
    }
    p, li{
      font-size: 34px;
      margin: 8px;
      padding-left: 10px;
    }
    h2, h3{
      font-size: 45px;
      font-weight: 600;
      margin: 8px;
      padding: 10px;
    }
    h1{
      font-size: 60px;
      font-weight: 700;
      margin: 8px;
      padding:25px;
    }
    h4, h5{
      font-size: 40px;
      font-weight: 600;
      margin: 8px;
      padding: 10px;
    }
    ul{
      font-size:40px;
      margin: 8px;
    }
    video{
      width: ${width};
      height: auto;
      justify-content: center;
      align-items: center;
      padding: 2.5%;
    }
    `

  const htmlWithStyle = addStyleTag(newsData as string, cssStyle)

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
