import { StyleSheet, SafeAreaView, Image, View } from "react-native";

function Screen() {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("./assets/logo.png")} />
      <View></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#000",
    alignItems: "center",
  },
  logo: {
    position: "absolute",
    width: 100,
    height: 100,
    top: 0,
  },
});
