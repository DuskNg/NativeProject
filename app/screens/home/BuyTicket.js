import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import slides from "../../fakeData";
import Divider from "../common/Divider";
import FontAweSome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function BuyTicket({ id }) {
  const place = slides.find((slide) => slide.id === id.toString());
  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Buy Ticket</Text>
      <Divider />
      <View style={styles.body}>
        <View style={styles.group}>
          <MaterialIcons name="place" style={{ fontSize: 25 }} color="red" />
          <Text style={styles.bodyText}>{place.title}</Text>
        </View>

        <View style={styles.group}>
          <FontAweSome name="ticket" style={{ fontSize: 30 }} color="yellow" />
          <Text style={styles.bodyText}>{place.price}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 10,
          width: 100,
          alignItems: "center",
          backgroundColor: "#AD40AF",
          borderRadius: 10,
          alignSelf: "center",
        }}
      >
        <Text style={styles.buyButton}>Buy</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 10,
  },
  header: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bodyText: {
    fontSize: 20,
    marginLeft: 5,
    fontWeight: "bold",
  },
  group: {
    flexDirection: "row",
  },
  buyButton: {
    fontSize: 20,
    color: "yellow",
    lineHeight: 45,
  },
});
