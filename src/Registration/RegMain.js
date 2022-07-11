import { Picker } from "@react-native-picker/picker";
import { useState, useEffect, useCallback } from "react";
import { TextInput, StyleSheet, Text, View, Button } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { connect } from "react-redux";

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

const RegMain = ({ navigation, login }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ageBrkIdx, setAgeBrkIdx] = useState(-1);
  const [selectedLanguage, setSelectedLanguage] = useState();

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

      <ModalSelector
        data={AGE_RANGES.map((el, idx) => ({ ...el, key: idx }))}
        initValue="Age Bracket"
        onModalClose={(option) => {
          console.log({ setting: option.key });
          if (option.key === undefined) {
            return;
          }
          setAgeBrkIdx(option.key);
          console.log(
            option.key >= 0
              ? `Age Bracket: ${AGE_RANGES[option.key].label}`
              : ""
          );
        }}
      >
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            height: 30,
          }}
          editable={false}
          placeholder="Age Bracket"
          value={
            ageBrkIdx < 0 ? "" : `Age Bracket: ${AGE_RANGES[ageBrkIdx].label}`
          }
        />
      </ModalSelector>

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
const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(RegMain);
