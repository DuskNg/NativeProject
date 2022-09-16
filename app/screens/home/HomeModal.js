import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import Divider from "../common/Divider";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useContext } from "react";
import { AuthContext } from "../../src/context/AuthContext";

export default function HomeModal({ showModalAnimated, showShadow }) {
  const { width, height } = useWindowDimensions();

  const { logout } = useContext(AuthContext);
  return (
    <View
      style={{
        position: "absolute",
        zIndex: 1,
        flex: 1,
      }}
    >
      <Animated.View
        style={{
          backgroundColor: "#000",
          width,
          height,
          opacity: 0.4,
          display: showShadow,
        }}
      />

      <Animated.View
        style={{
          width: width - 120,
          height: height - 65,
          backgroundColor: "#fff",
          position: "absolute",
          top: 65,
          borderBottomRightRadius: 20,
          borderTopRightRadius: 20,
          paddingVertical: 40,
          paddingHorizontal: 15,
          translateX: showModalAnimated,
        }}
      >
        <Text style={styles.option}>Option1</Text>
        <Divider />
        <Text style={styles.option}>Option2</Text>
        <Divider />
        <Text style={styles.option}>Option3</Text>
        <Divider />

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            logout();
          }}
        >
          <View style={{ flexDirection: "row", left: 50 }}>
            <Text style={{ fontSize: 20, color: "#AD40AF" }}>Logout</Text>
            <MaterialIcons name="logout" style={styles.logoutIcon} />
          </View>
          <Divider />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
    margin: 5,
    color: "yellow",
    backgroundColor: "#AD40AF",
    alignSelf: "flex-start",
    borderRadius: 10,
  },
  logoutIcon: {
    fontSize: 20,
    alignSelf: "center",
    color: "#AD40AF",
    marginLeft: 15,
  },
});
