import * as React from "react";
import {
  View,
  Text,
  FlatList,
  useWindowDimensions,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Animated,
  TouchableOpacity,
} from "react-native";
import Item from "./Item";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useRef } from "react";

const ListScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { width, height } = useWindowDimensions();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [limit, setLimit] = React.useState(10);
  const flatListRef = useRef();

  React.useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const apiUrl = `https://jsonplaceholder.typicode.com/comments?_limit=${limit}`;
      const response = await fetch(apiUrl);
      const resJson = await response.json();
      if (resJson) {
        setData(resJson);
        setLoading(false);
      }
    };
    getData();
  }, [limit]);

  const onEndReachedHandler = () => {
    console.log(data);
    setLimit(limit + 5);
    setLoading(true);
  };

  return (
    <View style={{ backgroundColor: "#fff", height: height - 40 }}>
      <Animated.View
        style={[
          styles.searchContainer,
          {
            width: width - 20,
            opacity: scrollY.interpolate({
              inputRange: [0, height / 2],
              outputRange: [0, 1],
            }),
          },
        ]}
      >
        <Text style={{ marginLeft: 20, fontSize: 18, color: "yellow" }}>
          Search:
        </Text>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TextInput
            placeholder="Search item"
            keyboardType="numeric"
            style={[styles.input, { width: width - 120, height: 45 }]}
          />
          <AntDesign
            name="search1"
            style={{
              fontSize: 25,
              marginLeft: 20,
              marginBottom: 10,
              color: "yellow",
            }}
          />
        </View>
      </Animated.View>
      <Text
        style={{
          marginTop: 40,
          alignSelf: "center",
          marginBottom: 20,
          fontSize: 30,
        }}
      >
        List Item
      </Text>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={(items) => <Item items={items} />}
        keyExtractor={(items, i) => i.toString()}
        onEndReached={onEndReachedHandler}
        onEndReachedThreshold={1}
        ListFooterComponent={() => {
          return (
            <View style={{ alignItems: "center", marginBottom: 50 }}>
              {loading && <ActivityIndicator size="large" />}
            </View>
          );
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: false,
          }
        )}
        scrollEventThrottle={16}
      />
      <Animated.View
        style={{
          position: "absolute",
          right: 30,
          bottom: 40,
          opacity: scrollY.interpolate({
            inputRange: [height * 3, height * 3.5],
            outputRange: [0, 1],
          }),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            flatListRef.current.scrollToIndex({
              index: 0,
              animated: true,
            });
          }}
        >
          <Text style={styles.goOnTopBtn}>Go on top</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    zIndex: 1,
    position: "absolute",
    marginHorizontal: 10,
    marginTop: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "yellow",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#AD40AF",
  },
  input: {
    borderWidth: 1,
    borderColor: "yellow",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  goOnTopBtn: {
    fontSize: 20,
    alignSelf: "flex-end",
    backgroundColor: "#AD40AF",
    padding: 10,
    borderRadius: 10,
    color: "yellow",
    borderWidth: 1,
    borderColor: "yellow",
  },
});

export default ListScreen;
