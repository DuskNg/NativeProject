import { useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  useWindowDimensions,
  Animated,
  TouchableOpacity,
  ScrollView,
  Easing,
} from "react-native";
import slides from "../fakeData";
import FontAweSome from "react-native-vector-icons/FontAwesome";

const DetailScreen = ({ route }) => {
  const { width, height } = useWindowDimensions();
  const titleValue = useRef(new Animated.Value(0)).current;
  const imageValue = useRef(new Animated.Value(width)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const buttonAnimated = useRef(new Animated.Value(50)).current;
  const { id } = route.params;
  const scrollViewRef = useRef();
  const place = slides.find((slide) => slide.id === id);

  // show title of place
  useEffect(() => {
    const waiting = setTimeout(() => {
      Animated.timing(titleValue, {
        toValue: width - 200,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    }, 700);

    return () => {
      clearTimeout(waiting);
    };
  }, [titleValue]);

  // show place image
  useEffect(() => {
    const waiting = setTimeout(() => {
      Animated.timing(imageValue, {
        toValue: width - (width - 50),
        duration: 1500,
        useNativeDriver: false,
      }).start();
    }, 700);

    return () => {
      clearTimeout(waiting);
    };
  }, [imageValue]);

  // show introduce text
  useEffect(() => {
    const waiting = setTimeout(() => {
      Animated.timing(opacityValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    }, 2700);

    return () => {
      clearTimeout(waiting);
    };
  }, [opacityValue]);

  // button animated
  useEffect(() => {
    const waiting = setTimeout(() => {
      Animated.timing(buttonAnimated, {
        toValue: 70,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.ease,
      }).start();
    }, 3500);

    return () => {
      clearTimeout(waiting);
    };
  }, [buttonAnimated]);

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={require("../assets/backgroundImage.jpg")}
        resizeMode="cover"
      >
        <ScrollView
          style={{ width, height }}
          ref={scrollViewRef}
          // onLayout={(e) =>
          //   console.log("📢 [DetailScreen.js:97]", e.nativeEvent.layout)
          // }
        >
          <Animated.View
            style={{
              backgroundColor: "#fff",
              marginTop: 20,
              width: titleValue,
              height: 45,
              borderBottomRightRadius: 20,
              borderTopRightRadius: 20,
              borderColor: "yellow",
              borderWidth: 1,
            }}
          >
            <Text style={styles.title}>{place.title}</Text>
          </Animated.View>
          <Animated.Image
            source={place.image}
            style={[
              {
                width: width - 100,
                height: height / 3,
                marginTop: 50,
                borderRadius: 10,
                translateX: imageValue,
              },
            ]}
          />
          <Animated.View
            style={{
              flex: 1,
              alignItems: "center",
              marginTop: 10,
              opacity: opacityValue,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>Welcome!</Text>
            <Text style={{ fontSize: 20 }}>
              Let me introduce you something!
            </Text>
          </Animated.View>
          <TouchableOpacity
            onPress={() =>
              scrollViewRef.current.scrollTo({
                x: 0,
                y: height - 50,
                animated: true,
              })
            }
          >
            <Animated.View style={{ marginTop: buttonAnimated }}>
              <FontAweSome
                name="arrow-circle-o-down"
                style={{
                  fontSize: 75,
                  alignSelf: "center",
                  marginBottom: 75,
                }}
                color="#AD40AF"
              />
            </Animated.View>
          </TouchableOpacity>
          <View
            style={{ height, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontSize: 40 }}>Detail Content</Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    alignSelf: "center",
  },
});

export default DetailScreen;
