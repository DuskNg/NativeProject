import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Image,
  Animated,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Divider from "../common/Divider";
import { useContext } from "react";
import { AuthContext } from "../../src/context/AuthContext";

export default function WelcomeScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const translateYAnimated = useRef(new Animated.Value(height / 1.3)).current;
  const buttonAnimated = useRef(new Animated.Value(50)).current;
  const imageAnimated = useRef(new Animated.Value(0)).current;

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  //auth context
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const waiting = setTimeout(() => {
      Animated.timing(translateYAnimated, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    }, 700);

    return () => {
      clearTimeout(waiting);
    };
  }, [translateYAnimated]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(buttonAnimated, {
          toValue: 35,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(buttonAnimated, {
          toValue: 50,
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    const waiting = setTimeout(() => {
      Animated.timing(imageAnimated, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    }, 1500);

    return () => {
      clearTimeout(waiting);
    };
  }, [imageAnimated]);
  return (
    <ScrollView>
      <ImageBackground
        source={require("../../assets/backgroundImagee.jpg")}
        style={{ width, height }}
      >
        <Animated.Image
          source={require("../../assets/banner.jpg")}
          style={[styles.image, { opacity: imageAnimated }]}
          resizeMode="contain"
        />
        <Animated.View
          style={[
            styles.body,
            { width, height: height / 1.3, translateY: translateYAnimated },
          ]}
        >
          <Divider />
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={{ alignSelf: "center", fontSize: 30, color: "#AD40AF" }}
            >
              Login
            </Text>
            <View>
              <View>
                <Text style={styles.label}>User:</Text>
                <TextInput
                  placeholder="Enter user name"
                  style={styles.input}
                  value={user}
                  onChangeText={(text) => setUser(text)}
                />
              </View>
              <View>
                <Text style={styles.label}>Password:</Text>
                <TextInput
                  placeholder="Enter password"
                  style={styles.input}
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => login(user, password)}
              style={styles.button}
            >
              <Text
                style={{ color: "yellow", fontSize: 20, alignSelf: "center" }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <Divider />
            <View>
              <Text style={{ fontSize: 15, color: "#AD40AF" }}>
                If you don't have an account, click register!
              </Text>
              <TouchableOpacity style={styles.button}>
                <Text
                  style={{ color: "yellow", fontSize: 20, alignSelf: "center" }}
                >
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 30,
    paddingTop: 100,
  },
  image: {
    zIndex: 1,
    resizeMode: "contain",
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "yellow",
    alignSelf: "center",
    top: 50,
    position: "absolute",
  },
  button: {
    backgroundColor: "#AD40AF",
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "yellow",
    borderRadius: 15,
    marginVertical: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "yellow",
    padding: 10,
    margin: 5,
    borderRadius: 10,
    fontSize: 15,
  },
  label: {
    fontSize: 15,
    color: "#AD40AF",
    marginTop: 5,
  },
});
