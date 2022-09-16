import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartScreen from "../screens/CartScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import IonIcons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import { MainStackNavigator } from "./StackNavigator";
import { bottomTabStyle } from "./common/styles";
import ListScreen from "../screens/list/ListScreen";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: bottomTabStyle,
        tabBarInactiveTintColor: "#fff",
        tabBarActiveTintColor: "yellow",
      }}
    >
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: "yellow" },
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-bag" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route),
            ...bottomTabStyle,
            position: "absolute",
          },
          tabBarIcon: ({ color, size }) => (
            <IonIcons name="home-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="List"
        component={ListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="profile" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  console.log(routeName);
  if (routeName === "DetailScreen") {
    return "none";
  }
  return "flex";
};

export default BottomTabNavigator;
