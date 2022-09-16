import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ImageBackground,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import slides from "../../fakeData";
import HomeSlideItem from "./HomeSlideItem";
import PaginationSlide from "./PaginationSlide";
import { container } from "./homeStyle";
import { useState, useRef } from "react";
import BuyTicket from "./BuyTicket";
import Divider from "../common/Divider";
import Feather from "react-native-vector-icons/Feather";
import HomeModal from "./HomeModal";

export default function HomeSlide() {
  const { width, height } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showShadow, setShowShadow] = useState("none");
  const scrollX = useRef(new Animated.Value(0)).current;
  const modalIconAnimated = useRef(new Animated.Value(1.2)).current;
  const showModalAnimated = useRef(new Animated.Value(100 - width)).current;

  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const pressModalHandler = () => {
    modalIconAnimated.setValue(1);
    Animated.spring(modalIconAnimated, {
      toValue: 1.2,
      bounciness: 24,
      speed: 20,
      useNativeDriver: true,
    }).start();

    if (showShadow === "none") {
      Animated.timing(showModalAnimated, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
      setShowShadow("flex");
    } else if (showShadow === "flex") {
      Animated.timing(showModalAnimated, {
        toValue: 100 - width,
        duration: 1000,
        useNativeDriver: false,
      }).start();
      setShowShadow("none");
    }
  };
  return (
    <View>
      <ImageBackground
        source={require("../../assets/backgroundImage.jpg")}
        resizeMode="cover"
      >
        <TouchableOpacity
          style={{
            zIndex: 2,
          }}
          activeOpacity={0.6}
          onPress={pressModalHandler}
        >
          <Animated.View
            style={[styles.icon, { transform: [{ scale: modalIconAnimated }] }]}
          >
            <Feather name="list" style={{ fontSize: 30, color: "yellow" }} />
          </Animated.View>
        </TouchableOpacity>

        <ScrollView>
          <View style={{ marginTop: 110, marginLeft: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Recommend</Text>
          </View>
          <Animated.FlatList
            data={slides}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * (width - 100),
                index * (width - 100),
                (index + 1) * (width - 100),
              ];
              const translateY = scrollX.interpolate({
                inputRange,
                outputRange: [0, -30, 0],
              });
              return <HomeSlideItem item={item} translateY={translateY} />;
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled
            scrollEventThrottle={16}
            bounces={false}
            style={{
              flex: 1,
              height: height - 250,
            }}
            contentContainerStyle={{ alignItems: "center" }}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              }
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidesRef}
          />
          <PaginationSlide data={slides} scrollX={scrollX} />
          <Divider />

          <View
            style={[
              container,
              {
                flex: 0.2,
                width: width - 20,
                height: height / 4.5,
                resizeMode: "contain",
                marginTop: 30,
              },
            ]}
          >
            <BuyTicket id={currentIndex + 1} />
          </View>
          <View style={{ marginTop: 100 }}></View>
        </ScrollView>
      </ImageBackground>

      <HomeModal
        showModalAnimated={showModalAnimated}
        showShadow={showShadow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    top: 40,
    padding: 8,
    position: "absolute",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#AD40AF",
  },
});
