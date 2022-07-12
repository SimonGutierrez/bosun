import { Picker } from "@react-native-picker/picker";
import { useState, useEffect, useCallback } from "react";
import { TextInput, StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";

import { SelectPicker } from "./SelectPicker";

const AGE_RANGES = [
  {
    low: 0,
    high: 25,
    label: "25 and under",
  },
  {
    low: 26,
    high: 30,
    label: "26-30",
  },
  {
    low: 31,
    high: 35,
    label: "31-35",
  },
  {
    low: 36,
    high: 40,
    label: "36-40",
  },
  {
    low: 41,
    high: 45,
    label: "41-45",
  },
  {
    low: 46,
    high: 50,
    label: "46-50",
  },
];

const EXPERIENCE_RANGES = [
  {
    low: 0,
    high: 3,
    label: "0 - 3",
  },
  {
    low: 4,
    high: 6,
    label: "4 - 6",
  },
  {
    low: 7,
    high: 9,
    label: "7 - 9",
  },
  {
    low: 10,
    label: "10+",
  },
];

const RegMain = ({ navigation, login }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ageBrkIdx, setAgeBrkIdx] = useState(-1);
  const [expAgeIdx, setExpAgeIdx] = useState(-1);

  const everythingFilledOut =
    name.length > 0 &&
    email.length > 0 &&
    password.length > 0 &&
    ageBrkIdx > -1 &&
    expAgeIdx > -1;

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          placeholder="name (what do we call you?)"
          keyboardType="ascii-capable"
          autoComplete="name"
          autoCapitalize="words"
          onChangeText={setName}
          style={styles.textInput}
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

      <SelectPicker
        PickerStyle={styles.inputView}
        TextStyle={styles.textInput}
        data={AGE_RANGES.map((el, idx) => ({ ...el, key: idx }))}
        placeholder="Age Bracket"
        text={
          ageBrkIdx < 0 ? "" : `Age Bracket: ${AGE_RANGES[ageBrkIdx].label}`
        }
        onChangeText={setAgeBrkIdx}
      />

      <SelectPicker
        PickerStyle={styles.inputView}
        TextStyle={styles.textInput}
        data={EXPERIENCE_RANGES.map((el, idx) => ({ ...el, key: idx }))}
        placeholder="Experience (Years)"
        text={
          expAgeIdx < 0
            ? ""
            : `Experience (Years): ${EXPERIENCE_RANGES[expAgeIdx].label}`
        }
        onChangeText={setExpAgeIdx}
      />

      <View style={styles.submitButton}>
        <Button
          disabled={!everythingFilledOut}
          title="Register"
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
    alignItems: "flex-start",
    justifyContent: "center",
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
const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(RegMain);
