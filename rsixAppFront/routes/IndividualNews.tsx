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
// import HTML from "react-native-render-html";

// internal imports
import { styles } from "../assets/styles";
import { IndividualNewsScreenProps } from "../assets/types/ScreenProps";

export const IndividualNews: React.FC<IndividualNewsScreenProps> = (props) => {
  const { route } = props;
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

      const md = markdownit({ html: true });
      const result = md.render(response.data.item[0].content);

      setNewsData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const injectedStyle = `
  const style = document.createElement('style');
  style.innerHTML = \`
    body {
      color: white;
      font-size: 16px;
    }

    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    video {
      width: 100%;
      height: 200px;
    }

    img {
      width: 100%;
      height: auto;
    }

    hr {
      color: white;
    }
  \`;
  document.head.appendChild(style);
  `;

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../assets/png/logo.png")} />
      <View style={styles.containerList}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {newsData && (
            <View>
              <WebView
                source={{ html: newsData }}
                injectedJavaScript={injectedStyle}
                javaScriptEnabled={true}
                onError={(error) => console.error("WebView Error:", error)}
                style={styles.webview}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
