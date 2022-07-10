import * as SplashScreen from "expo-splash-screen";
const HIDE_SPLASH = "HIDE_SPLASH";

const hideSplash = () => ({
  type: HIDE_SPLASH,
});

export const doneLoadingInitial = () => async (dispatch) => {
  await SplashScreen.hideAsync();
  dispatch(hideSplash());
};

const initialState = true;

export default (state = initialState, action) => {
  switch (action.type) {
    case HIDE_SPLASH:
      return false;
    default:
      return state;
  }
};
