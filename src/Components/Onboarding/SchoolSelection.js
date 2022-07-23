import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  TouchableHighlight,
  FlatList,
} from "react-native";
import { connect } from "react-redux";

import schools from "../../../data/schools.json";

const useSetState = (initial) => {
  const [set, setSet] = useState(new Set(...initial));
  return {
    add: (el) =>
      setSet((set) => {
        if (set.has(el)) return set;
        set.add(el);
        return new Set(set);
      }),
    delete: (el) => {
      setSet((set) => {
        if (!set.has(el)) return set;
        set.delete(el);
        return new Set(set);
      });
    },
    has: (el) => set.has(el),
    clear: () => setSet(new Set()),
    [Symbol.iterator]: () => set.values(),
    forEach: (fn) => set.forEach(fn),
    keys: () => set.keys(),
    values: () => set.values(),
    get size() {
      return set.size;
    },
  };
};

const Item = ({ title, onPress, isSelected }) => (
  <TouchableHighlight
    onPress={onPress}
    style={styles.touchableItem}
    activeOpacity={0.6}
    underlayColor="#DDDDDD"
  >
    <View style={styles.item} onPress>
      {isSelected ? (
        <FontAwesomeIcon size={16} icon="circle-check" style={styles.icon} />
      ) : null}
      <Text style={styles.title}>{title}</Text>
    </View>
  </TouchableHighlight>
);

const SchoolSelection = ({ navigation }) => {
  const [filter, setFilter] = useState("");
  const set = useSetState([]);

  const renderItem = ({ item }) => (
    <Item
      title={item.name}
      onPress={(evt) => {
        if (set.has(item.id)) {
          set.delete(item.id);
        } else {
          set.add(item.id);
        }
      }}
      isSelected={set.has(item.id)}
    />
  );

  const filteredData = useMemo(
    () => schools.filter((s) => s.name.includes(filter)),
    [schools, filter]
  );

  return (
    <View style={styles.container}>
      <View style={styles.topText}>
        <Text>Please select some schools so Bosun can help you </Text>
      </View>

      <View style={styles.filterContainer}>
        <View style={styles.filterIconView}>
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </View>
        <View style={styles.filterTextInputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a name to filter by"
            placeholderTextColor="#333a"
            keyboardType="ascii-capable"
            autoComplete="name"
            autoCapitalize="words"
            onChangeText={setFilter}
            value={filter}
          />
        </View>
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.bottomView}>
        <View View style={styles.bottomTextView}>
          <Text>{set.size} Selected</Text>
        </View>
        <View View style={styles.bottomButtonView}>
          <Button title="Continue" disabled={set.size === 0} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 0,
  },
  topText: {
    justifyContent: "center",
    alignItems: "center",
  },
  bottomView: {
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomTextView: {
    flex: 1,
  },
  bottomButtonView: {
    flex: 1,
  },
  filterContainer: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 5,
    margin: 20,
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: "thistle",
    // borderColor: "thistle",
    // borderRadius: 50,
  },
  filterIconView: {
    flex: 0,
    marginRight: 8,
  },
  filterTextInputView: {
    flex: 1,
  },
  textInput: {
    width: "100%",
    height: 40,
    flex: 1,
    color: "black",
  },
  touchableItem: {
    marginVertical: 8,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
});

const mapState = () => ({});
const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(SchoolSelection);
