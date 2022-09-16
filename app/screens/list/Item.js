import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Divider from "../common/Divider";

export default function Item({ items }) {
  const { item } = items;
  return (
    <View>
      <View style={styles.wrapper}>
        <Text style={styles.text}>{item.id}</Text>
        <Image
          source={require("../../assets/place2.jpg")}
          resizeMode="contain"
          style={{ width: 150, height: 100, borderRadius: 1 }}
        />
      </View>
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 25,
  },
});
