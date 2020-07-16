import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function Signup({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("user-test2@gmail.com");
  const [password, setPassword] = useState("12345678");

  const onPressSignup = async () => {
    try {
      const res = await fetch("https://cami-api.herokuapp.com/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const user = await res.json();
      setUser(user);
      navigation.navigate("Home");
    } catch (err) {
      console.error(err);
    }
  };

  const goToLogin = () => {
    navigation.navigate("Login");
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
        onPress={onPressSignup}
        title="Signup"
        color="#841584"
        accessibilityLabel="Signup"
      />
      <Button
        onPress={goToLogin}
        title="Go to Login"
        color="#841584"
        accessibilityLabel="Login"
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
