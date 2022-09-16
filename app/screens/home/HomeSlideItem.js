import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import React from "react";
import { container } from "./homeStyle";
import { useNavigation } from "@react-navigation/native";

export default function HomeSlideItem({ item, translateY }) {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetailScreen", { id: item.id })}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          container,
          {
            width: width - 100,
            height: height / 2,
            resizeMode: "contain",
            marginTop: 10,
            transform: [{ translateY }],
          },
        ]}
      >
        <Image
          source={item.image}
          style={[
            styles.image,
            { width: width - 100, height: height / 2, flex: 0.7 },
          ]}
        />
        <View style={{ flex: 0.3 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: "yellow",
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginVertical: 10,
    textAlign: "center",
  },
  description: {
    fontWeight: "500",
    fontSize: 15,
    textAlign: "center",
  },
});
