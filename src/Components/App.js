import Entypo from "@expo/vector-icons/Entypo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useCallback } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { connect } from "react-redux";

import { doneLoadingInitial } from "../store";
import Dashboard from "./Dashboard";
import ImageViewer from "./ImageViewer";
import Login from "./Login";
import RegSchool from "./Onboarding/SchoolSelection";
import RegMain from "./Registration/RegMain";

const Stack = createNativeStackNavigator();

const App = (props) => {
  console.log("LOADING");

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Arbitrary 2s delay");
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        props.hideSplash();
      }
    }

    prepare();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {props.authenticated ? (
          <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen
              name="RegSchool"
              component={RegSchool}
              options={{ headerShown: true, title: "School Interests" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
              name="RegMain"
              component={RegMain}
              options={{ headerShown: true, title: "" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapState = (state) => ({
  showSplash: state.splash,
  authenticated: state.auth.authenticated,
});

const mapDispatch = (dispatch) => ({
  hideSplash: () => dispatch(doneLoadingInitial()),
});

export default connect(mapState, mapDispatch)(App);
