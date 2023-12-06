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
// import Video from "react-native-video";
import Markdown from "@ronradtke/react-native-markdown-display";
import { useEffect, useState } from "react";

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
        "http://192.168.50.10:6996/api/individualNews",
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

  const renderRules = {
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
              if (React.isValidElement(child) && child.type === Text) {
                const uniqueKey =
                  (child as React.ReactElement).props.id || index;
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
    // video: (node: any, children: any, parent: any, styles: any) => {
    //   const videoSource = node.children[0]?.attributes?.src;
    //   console.log(videoSource);

    //   if (videoSource) {
    //     return (
    //       <Video
    //         key={node.key}
    //         source={{ uri: videoSource }}
    //         controls
    //         style={{ width: 300, height: 200 }}
    //       />
    //     );
    //   }

    //   return <Text key={node.key}>Video source not found</Text>;
    // },
    // source: () => null,
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

  // console.log(newsData?.content);
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../assets/png/logo.png")} />
      <View style={styles.containerList}>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {newsData && (
            <Markdown rules={renderRules}>{newsData.content}</Markdown>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
