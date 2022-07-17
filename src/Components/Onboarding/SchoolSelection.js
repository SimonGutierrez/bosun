import { Picker } from "@react-native-picker/picker";
import { useState, useEffect, useCallback } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  FlatList,
} from "react-native";
import { connect } from "react-redux";

import schools from "../../../data/schools.json";

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const SchoolSelection = ({ navigation }) => {
  const renderItem = ({ item }) => <Item title={item.name} />;
  const [filter, setFilter] = useState("");
  console.log({ filter });

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <View style={styles.filterTextView}>
          <Text>Filter:</Text>
        </View>
        <View style={styles.filterTextInputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a name to filter by"
            keyboardType="ascii-capable"
            autoComplete="name"
            autoCapitalize="words"
            onChangeText={setFilter}
            value={filter}
          />
        </View>
      </View>
      <FlatList
        data={schools}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  filterContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 20,
    borderWidth: 1,
    borderColor: "thistle",
    borderRadius: 50,
  },
  filterTextView: {
    flex: 0,
  },
  filterTextInputView: {
    flex: 1,
  },
  textInput: {
    width: "100%",
    height: 50,
    flex: 1,
    padding: 10,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
});

const mapState = () => ({});
const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(SchoolSelection);
