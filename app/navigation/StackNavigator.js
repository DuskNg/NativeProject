import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/home/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import { screenOptions } from "./common/styles";
const Stack = createStackNavigator();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Group screenOptions={screenOptions}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{ title: "Detail" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
