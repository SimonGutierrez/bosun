import { useState, useEffect, useCallback } from "react";
import { TextInput, StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";

import { attemptLogin } from "../store";

const Login = ({ navigation, login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View>
        <Button
          title="Create an Account"
          onPress={() => navigation.navigate("RegMain")}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="email"
          keyboardType="email-address"
          autoComplete="email"
          autoCapitalize="none"
          onChangeText={setEmail}
          style={styles.textInput}
          autoFocus
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="password"
          autoComplete="password"
          autoCapitalize="none"
          secureTextEntry
          onChangeText={setPassword}
          style={styles.textInput}
        />
      </View>
      <View style={styles.submitButton}>
        <Button
          disabled={email.length === 0 || password.length === 0}
          title="Login"
          onPress={() => login({ email, password })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  textInput: {
    width: "100%",
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  submitButton: {
    padding: 8,
    // backgroundColor: "#33d",
  },
});

const mapState = () => ({});
const mapDispatch = (dispatch) => ({
  login: ({ email, password }) => dispatch(attemptLogin({ email, password })),
});

export default connect(mapState, mapDispatch)(Login);
