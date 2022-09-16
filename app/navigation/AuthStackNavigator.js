import { createStackNavigator } from "@react-navigation/stack";
import { screenOptions } from "./common/styles";
import BottomTabNavigator from "./TabNavigator";
import LoginScreen from "../screens/auth/LoginScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

const Stack = createStackNavigator();

export const AuthStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="WelcomeScreen">
      <Stack.Group screenOptions={screenOptions}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
