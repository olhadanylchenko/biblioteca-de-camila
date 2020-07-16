import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function Login({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("user-test2@gmail.com");
  const [password, setPassword] = useState("12345678");

  const onPressLogin = async () => {
    try {
      const res = await fetch(
        "https://cami-api.herokuapp.com/users/authenticate",
        {
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
          width: 300,
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
          width: 300,
          padding: 10,

          borderColor: "white",
          color: "white",
          borderWidth: 1,
        }}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <Button
        onPress={onPressLogin}
        title="Login"
        color="#841584"
        accessibilityLabel="Login"
      />
      <Button
        onPress={goToSignup}
        title="Go to Signup"
        color="#841584"
        accessibilityLabel="Go to Signup"
      />
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
