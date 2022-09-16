import { Text, useWindowDimensions, View } from "react-native";
import React from "react";

export default function Divider() {
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        width: width - 120,
        height: 1,
        backgroundColor: "#AD40AF",
        marginHorizontal: 40,
        marginVertical: 10,
        alignSelf: "center",
      }}
    ></View>
  );
}
