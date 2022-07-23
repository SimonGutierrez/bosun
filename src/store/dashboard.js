import { cloneDeep, set } from "lodash";

// import fakeDashboard from "../../data/fakeDashboard.json";
import storage from "../util/storage";

const initialState = {
  schools: [],
  refreshing: false,
};

const SET_DASHBOARD_DATA = "SET_DASHBOARD_DATA";
const SET_DASHBOARD_REFRESHING = "SET_DASHBOARD_REFRESHING";

const setDashboardRefresh = () => ({ type: SET_DASHBOARD_REFRESHING });
const setDashboardData = (data) => ({ type: SET_DASHBOARD_DATA, data });

storage.sync.dashboard = async (params) => {
  return initialState;
};

export const loadInitialDashboard = (schools) => async (dispatch) => {
  const data = {
    schools,
    refreshing: false,
  };
  await storage.save({
    key: "dashboard",
    data,
  });
  dispatch(setDashboardData(data));
};

export const updateStepStatus =
  ({ newStatus, stepIdx, schoolId }) =>
  async (dispatch, getState) => {
    const { dashboard: oldDashboard } = getState();
    const newDashboard = cloneDeep(oldDashboard);
    const school = newDashboard.schools.find(({ id }) => id === schoolId);
    if (!school) return;

    school.steps[stepIdx].status = newStatus;
    await storage.save({
      key: "dashboard",
      data: newDashboard,
    });

    dispatch(setDashboardData(newDashboard));
  };

export const loadDashboard = () => async (dispatch) => {
  dispatch(setDashboardRefresh());
  const data = await storage.load({
    key: "dashboard",
    syncInBackground: false,
    syncParams: {
      bearer: "BEARER FROM STATE HERE?",
    },
  });
  dispatch(setDashboardData(data));
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DASHBOARD_REFRESHING:
      return {
        ...state,
        refreshing: true,
      };
    case SET_DASHBOARD_DATA:
      return {
        ...action.data,
        refreshing: false,
      };
    default:
      return state;
  }
};
