import storage from "../util/storage";
const SUCCESSFUL_LOGIN = "SUCCESSFUL_LOGIN";

const initialState = {
  authenticated: false,
  name: null,
};

const successfulLogin = ({ name }) => ({
  type: SUCCESSFUL_LOGIN,
  auth: {
    name,
    authenticated: true,
  },
});

const login = async ({ email, password }) => {
  if (email.includes("@gmail") && password.includes("good")) {
    return { name: email.split("@")[0] };
  }
  throw new Error("UNAUTHED");
};

export const attemptLogin =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const result = await login({ email, password });
      dispatch(successfulLogin({ name: result.name }));
    } catch (err) {
      console.error(err);
    }
  };

export const attemptRegister =
  ({ name, email, password, ageBrk, expAge }) =>
  async (dispatch) => {
    try {
      await storage.save({
        key: "user",
        data: {
          name,
          email,
          password,
          ageBrk,
          expAge,
        },
      });
      dispatch(successfulLogin({ name }));
    } catch (err) {
      console.error(err);
    }
  };
export default (state = initialState, action) => {
  switch (action.type) {
    case SUCCESSFUL_LOGIN:
      return action.auth;
    default:
      return state;
  }
};
