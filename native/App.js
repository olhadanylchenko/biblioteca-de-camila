import React, { useState, useEffect } from "react";
import { Image, Platform, View } from "react-native";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Button from "react-native-pure-button";

import { UserContext } from "./contexts/UserContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";

import { screen } from "./utils/screen";

const Stack = createStackNavigator();

const storageKeys = {
  USER: "USER_STORAGE",
  NAVIGATION: "NAVIGATION_STORAGE",
};

export function App() {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [splashComplete, setSplashComplete] = useState(false);
  const [initialState, setInitialState] = useState();

  // restore state
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

  useEffect(() => {
    setTimeout(() => {
      setSplashComplete(true);
    }, 3000);
  }, []);

  if (!isReady || !splashComplete) {
    return (
      <View style={{ flex: 1, backgroundColor: "#181b25" }}>
        <Image
          source={require("./assets/loading.gif")}
          style={{
            ...screen,
            resizeMode: "stretch",
          }}
        ></Image>
      </View>
    );
  }

  const onPressLogout = async () => {
    setUser(null);
  };

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
      <Button onPress={onPressLogout}>Logout</Button>
    </UserContext.Provider>
  );
}
