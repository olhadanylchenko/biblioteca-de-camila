import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Button from "react-native-pure-button";
import { fetchFromApi } from "../utils/api";

import { screen } from "../utils/screen";

export default function Login({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("user-test2@gmail.com");
  const [password, setPassword] = useState("12345678");

  const onPressLogin = async () => {
    try {
      const res = await fetchFromApi("/users/authenticate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const user = await res.json();

      setUser(user);
      navigation.navigate("Home");
    } catch (err) {
      console.error(err);
    }
  };

  const goToSignup = () => {
    navigation.navigate("Signup");
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={{
          height: 40,
          width: Math.min(screen.width * 0.75, 300),
          padding: 10,
          borderColor: "white",
          color: "white",
          borderWidth: 1,
        }}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        secureTextEntry={true}
        style={{
          height: 40,
          width: Math.min(screen.width * 0.75, 300),
          padding: 10,

          borderColor: "white",
          color: "white",
          borderWidth: 1,
        }}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <View
        style={{ width: Math.min(screen.width * 0.75, 300), color: "black" }}
      >
        <Button
          style={{
            backgroundColor: "#808080",
            borderColor: "white",
            alignItems: "center",
            padding: 5,
            marginTop: 5,
            border: "white 1px solid",
          }}
          textStyle={{ color: "white", textTransform: "uppercase" }}
          onPress={onPressLogin}
        >
          Login
        </Button>
        <Button
          style={{
            backgroundColor: "#808080",
            borderColor: "white",
            alignItems: "center",
            padding: 5,
            marginTop: 5,
            border: "white 1px solid",
          }}
          textStyle={{ color: "white" }}
          onPress={goToSignup}
        >
          Go to Signup
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181b25",
    fontFamily: "Roboto",
    color: "#acb3c8",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#acb3c8",
    fontSize: 50,
  },
});
