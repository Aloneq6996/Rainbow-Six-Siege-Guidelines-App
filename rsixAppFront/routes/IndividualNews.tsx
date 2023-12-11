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
import Video from "react-native-video";
import Markdown from "@ronradtke/react-native-markdown-display";
import { useEffect, useState } from "react";
// import WebView from "react-native-webview";
import HTML from "react-native-render-html";

// internal imports
import { styles } from "../assets/styles";
import { IndividualNewsScreenProps } from "../assets/types/ScreenProps";
import { IndividualNewsType } from "../assets/types/Types";

export const IndividualNews: React.FC<IndividualNewsScreenProps> = (props) => {
  const { route } = props;
  const [newsData, setNewsData] = useState<IndividualNewsType>();
  const width = useWindowDimensions().width;

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

  const markdownRenderer = {
    heading1: (node: any, children: any, parent: any, styles: any) => (
      <Text key={node.key} style={{ color: "white", marginBottom: 10 }}>
        {children}
      </Text>
    ),
    heading2: (node: any, children: any, parent: any, styles: any) => (
      <Text key={node.key} style={{ color: "white", margin: 5 }}>
        {children}
      </Text>
    ),
    heading3: (node: any, children: any, parent: any, styles: any) => (
      <Text key={node.key} style={{ color: "white", margin: 5 }}>
        {children}
      </Text>
    ),
    heading4: (node: any, children: any, parent: any, styles: any) => (
      <Text key={node.key} style={{ color: "white", margin: 5 }}>
        {children}
      </Text>
    ),
    heading5: (node: any, children: any, parent: any, styles: any) => (
      <Text key={node.key} style={{ color: "white", margin: 5 }}>
        {children}
      </Text>
    ),
    link: (node: any, children: any, parent: any, styles: any) => (
      <Text
        key={node.key}
        style={{ color: "white", margin: 10 }}
        onPress={() => renderLinks(node.attributes.href)}
      >
        {children}
      </Text>
    ),
    image: (node: any, children: any, parent: any, styles: any) => {
      const cleanedSrc = node.attributes.src.replace(/^\/\//, "https://");
      return (
        <Image
          key={node.key}
          style={{ width: 5000, height: 200, maxWidth: width }}
          source={{ uri: cleanedSrc }}
          onError={(error) => console.error(`Image load error:`, error)}
        />
      );
    },
    list_item: (node: any, children: any, parent: any, styles: any) => {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginRight: 8, fontSize: 16, color: "white" }}>
            •
          </Text>
          <View style={{ flex: 1 }}>
            {React.Children.map(children, (child, index) => {
              if (React.isValidElement(child)) {
                const uniqueKey =
                  (child as React.ReactElement).props.id ||
                  (child as React.ReactElement).key ||
                  index.toString();
                return React.cloneElement(child as React.ReactElement, {
                  style: [
                    { color: "white" },
                    (child as React.ReactElement).props.style,
                  ],
                  key: uniqueKey,
                });
              }
              return child;
            })}
          </View>
        </View>
      );
    },
    hr: (node: any, children: any, parent: any, styles: any) => (
      <View style={{ height: 1, width: "100%", backgroundColor: "white" }} />
    ),
    paragraph: (node: any, children: any, parent: any, styles: any) => (
      <Text key={node.key} style={{ color: "white", marginBottom: 5 }}>
        {children}
      </Text>
    ),
  };

  const renderLinks = (url: any) => {
    if (!url) {
      return false;
    }

    Linking.openURL(url);
  };

  const customHTMLElementModels = {
    video: {
      contentModel: "block", // Set the content model to "block"
    },
  };

  const htmlRenderer = {
    video: (
      htmlAttribs: any,
      children: any,
      convertedCSSStyles: any,
      passProps: any
    ) => {
      const videoSource = htmlAttribs.src;

      if (videoSource) {
        return (
          <Video
            source={{ uri: videoSource }}
            style={{ width: 300, height: 200 }}
            controls
          />
        );
      }

      return null;
    },
  };

  // console.log(newsData?.content);
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../assets/png/logo.png")} />
      <View style={styles.containerList}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {newsData && (
            <View>
              <Markdown rules={markdownRenderer}>{newsData.content}</Markdown>
              <HTML
                source={{ html: newsData.content }}
                renderers={htmlRenderer}
                contentWidth={width}
                ignoredDomTags={["center"]}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
