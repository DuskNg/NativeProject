import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
const CartScreen = ({ navigation }) => {
  return (
    <View style={styles.center}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        This is the cart screen
      </Text>
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

export default CartScreen;
