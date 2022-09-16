import { StyleSheet, View, Animated, useWindowDimensions } from "react-native";
import React from "react";

export default function PaginationSlide({ data, scrollX }) {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.wrapper}>
      {data.map((_, i) => {
        const inputRange = [
          (i - 1) * (width - 100),
          i * (width - 100),
          (i + 1) * (width - 100),
        ];
        const dotWidth = scrollX.interpolate({
          inputRange, //
          outputRange: [10, 30, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={i}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#AD40AF",
    marginHorizontal: 8,
  },
});
