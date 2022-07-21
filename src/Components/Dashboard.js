import luxon, { DateTime } from "luxon";
import { useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Button,
  SectionList,
} from "react-native";
import { connect } from "react-redux";

import { loadDashboard, updateStepStatus } from "../store/dashboard";
import { SelectPicker } from "./util/SelectPicker";

const capitalize = (s) => s[0].toUpperCase() + s.slice(1);

const STATUSES = [
  {
    label: "Not Yet Started",
    key: "notStarted",
  },
  {
    label: "In Progress",
    key: "inProgress",
  },
  {
    label: "Completed",
    key: "completed",
  },
];

const Item = ({
  name,
  suggestedDate,
  status,
  stepIdx,
  schoolId,
  updateStepStatus,
}) => {
  const isCompleted = status === "completed";
  let subText = `All done!`;
  console.log({
    isCompleted,
    status,
  });
  if (!isCompleted) {
    subText = `${DateTime.fromISO(
      suggestedDate
    ).toRelativeCalendar()} - ${suggestedDate}`;
  }

  return (
    <View style={styles.item}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text style={styles.title}>{name}</Text>
        <SelectPicker
          PickerStyle={styles.pickerStyle}
          TextStyle={styles.pickerTextStyle}
          data={STATUSES}
          text={STATUSES.find((s) => s.key === status).label}
          onChangeText={(newStatus) => {
            updateStepStatus({ newStatus, stepIdx, schoolId });
          }}
        />
        {/* <Text style={styles.status}>{status}</Text> */}
      </View>
      <View>
        <Text style={styles.subtitle}>{capitalize(subText)}</Text>
      </View>
    </View>
  );
};

const Dashboard = ({ navigation, getData, schools, updateStepStatus }) => {
  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={schools}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index, section }) => (
          <Item
            {...item}
            stepIdx={index}
            schoolId={section.id}
            updateStepStatus={updateStepStatus}
          />
        )}
        renderSectionHeader={({ section: { name, data } }) => (
          <Text style={styles.header}>
            {name} - {data.filter((s) => s.status === "completed").length}/{" "}
            {data.length}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#9B5DE5",
  },
  item: {
    backgroundColor: "#F15BB5",
    padding: 20,
    marginVertical: 8,
    marginLeft: 32,
    marginRight: 8,
    borderRadius: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#9B5DE5",
    marginHorizontal: 16,
    width: "100%",
  },
  title: {
    fontSize: 24,
    flex: 1,
  },
  status: {
    paddingRight: 8,
  },
  pickerStyle: {
    backgroundColor: "#00F5D4",
    borderRadius: 8,
    alignSelf: "center",
  },
  pickerTextStyle: {
    padding: 8,
  },
});

const mapState = (state) => ({
  schools: state.dashboard.schools.map((s) => ({
    name: s.name,
    data: s.steps,
    id: s.id,
  })),
  isRefreshing: state.dashboard.refreshing,
});
const mapDispatch = (dispatch) => ({
  getData: () => dispatch(loadDashboard()),
  updateStepStatus: ({ newStatus, stepIdx, schoolId }) =>
    dispatch(updateStepStatus({ newStatus, stepIdx, schoolId })),
});

export default connect(mapState, mapDispatch)(Dashboard);
