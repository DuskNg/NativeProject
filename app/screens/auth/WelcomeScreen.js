import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Image,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function WelcomeScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const translateYAnimated = useRef(new Animated.Value(height / 2)).current;
  const buttonAnimated = useRef(new Animated.Value(50)).current;
  const imageAnimated = useRef(new Animated.Value(0)).current;

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
    <View>
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
            { width, height: height / 2, translateY: translateYAnimated },
          ]}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "#AD40AF",
            }}
          >
            Everything you need about vacation!
          </Text>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            Join with us
          </Text>
          <Animated.View style={[styles.button, { right: buttonAnimated }]}>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "yellow",
                }}
              >
                Get started
              </Text>
            </TouchableOpacity>
            <AntDesign
              name="caretright"
              style={{ marginLeft: 5, color: "yellow" }}
            />
          </Animated.View>
        </Animated.View>
      </ImageBackground>
    </View>
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
    paddingVertical: 50,
  },
  image: {
    resizeMode: "contain",
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "yellow",
    alignSelf: "center",
    marginTop: 50,
  },
  button: {
    marginTop: 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#AD40AF",
    width: 150,
    position: "absolute",
    bottom: 90,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "yellow",
    borderRadius: 20,
  },
});
