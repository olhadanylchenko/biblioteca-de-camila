import React, { useState, useEffect } from "react";
import { Linking, Platform } from "react-native";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { UserContext } from "./contexts/UserContext";
import { AppLoading } from "expo";

const Stack = createStackNavigator();

const storageKeys = {
  USER: "USER_STORAGE",
  NAVIGATION: "NAVIGATION_STORAGE",
};

export function App() {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        if (Platform.OS !== "web") {
          // Only restore state if we're not on web
          const savedUserString = await AsyncStorage.getItem(storageKeys.USER);
          const savedNavigationString = await AsyncStorage.getItem(
            storageKeys.NAVIGATION
          );
          const user = savedUserString
            ? JSON.parse(savedUserString)
            : undefined;
          const navigation = savedNavigationString
            ? JSON.parse(savedNavigationString)
            : undefined;

          if (navigation !== undefined) {
            setInitialState(navigation);
          }
          if (user !== undefined) {
            setUser(user);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  useEffect(() => {
    AsyncStorage.setItem(storageKeys.USER, JSON.stringify(user));
  }, [user]);

  if (!isReady) {
    return AppLoading();
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <NavigationContainer
        initialState={initialState}
        onStateChange={(state) =>
          AsyncStorage.setItem(storageKeys.NAVIGATION, JSON.stringify(state))
        }
      >
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
