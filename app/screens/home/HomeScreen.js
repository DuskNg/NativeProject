import * as React from "react";
import { View, StyleSheet } from "react-native";
import HomeSlide from "./HomeSlide";

const HomeScreen = () => {
  return (
    <View style={styles.center}>
      <HomeSlide />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});

export default HomeScreen;
