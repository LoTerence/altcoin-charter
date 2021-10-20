import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { openSignInWindow } from "./utility/oauth_popup";
const { REACT_APP_SERVER_URL } = process.env;

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    error: "",
    userProfile: {
      name: "",
      email: "",
      _id: "",
    },
  },
  reducers: {
    authenticate: (state) => {
      state.error = "";
      state.authenticated = true;
    },
    unauthenticate: (state) => {
      state.authenticated = false;
    },
    authError: (state, action) => {
      state.authenticated = false;
      state.error = action.payload;
    },
    updateProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { authenticate, unauthenticate, authError, updateProfile } =
  authSlice.actions;

// thunks that allows us to perform async logic
export const signInAction =
  (history, { email, password }) =>
  (dispatch) => {
    axios
      .post("/users/authenticate", { email, password })
      .then((res) => {
        if (res.data.success) {
          dispatch(authenticate());
          localStorage.setItem("token", res.data.token);
          history.push("/feature");
        } else {
          dispatch(authError(res.data.message));
        }
      })
      .catch((err) => {
        dispatch(authError("Bad Login Info"));
      });
  };

// <----------------------  OAuth2.0 signin  ------------------------->
export const googleSignInAction = () => () => {
  openSignInWindow(REACT_APP_SERVER_URL + "/users/google", "SignIn");
};

export const fbSignInAction = () => () => {
  openSignInWindow(REACT_APP_SERVER_URL + "/users/facebook", "SignIn");
};

// Sign up thunk
export const signUpAction =
  (history, { email, password }) =>
  (dispatch) => {
    //same process as signInAction
    axios
      .post("/users/register", { email, password })
      .then((res) => {
        if (res.data.success) {
          dispatch(authenticate());
          localStorage.setItem("token", res.data.token);
          history.push("/feature");
        } else {
          console.log(res.data.message);
          dispatch(authError(res.data.message));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(authError("Error with signing up"));
      });
  };

// App.js:14
export const signOutAction = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(unauthenticate());
  dispatch(
    updateProfile({
      name: "",
      email: "",
      _id: "",
    })
  );
};

// this function is for fetching user info from the express server that requires authentication header
export const getProfile = () => (dispatch) => {
  axios
    .get("/users/profile", {
      headers: { authorization: localStorage.getItem("token") },
    })
    .then((res) => {
      dispatch(updateProfile(res.data.user));
    });
};

// action for changing the name of the user
export const changeNameAction = (newName) => (dispatch) => {
  axios
    .put(
      "/users/profile/name",
      {
        newName: newName,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      dispatch(getProfile());
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

//action for change the email of the user
export const changeEmailAction = (newEmail) => (dispatch) => {
  axios
    .put(
      "/users/profile/email",
      {
        newEmail: newEmail,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      dispatch(getProfile());
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

//action for changing the user's password
export const changePasswordAction = (newPassword) => (dispatch) => {
  axios
    .put(
      "/users/password",
      { newPassword: newPassword },
      { headers: { authorization: localStorage.getItem("token") } }
    )
    .then((res) => {
      console.log(res.data.msg);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

// Selector that lets the rest of the app get read access to authSlice state
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
