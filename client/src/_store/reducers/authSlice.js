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
    changeEmailAlert: (state, action) => {
      state.emailAlert = action.payload;
    },
    changepwAlert: (state, action) => {
      state.pwAlert = action.payload;
    },
    deleteAccountAlert: (state, action) => {
      state.daAlert = action.payload;
    },
  },
});

export const {
  authenticate,
  unauthenticate,
  authError,
  updateProfile,
  changeEmailAlert,
  changepwAlert,
  deleteAccountAlert,
} = authSlice.actions;

// thunks that allows us to perform async logic
export const signInAction =
  (navigate, { email, password }) =>
  (dispatch) => {
    axios
      .post("/users/authenticate", { email, password })
      .then((res) => {
        if (res.data.success) {
          dispatch(authenticate());
          localStorage.setItem("token", res.data.token);
          navigate("/feature");
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
  (navigate, { email, password }) =>
  (dispatch) => {
    //same process as signInAction
    axios
      .post("/users/register", { email, password })
      .then((res) => {
        if (res.data.success) {
          dispatch(authenticate());
          localStorage.setItem("token", res.data.token);
          navigate("/feature");
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
export const changeEmailAction = (newEmail, password) => (dispatch) => {
  axios
    .put(
      "/users/profile/email",
      {
        newEmail: newEmail,
        password: password,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => {
      if (res.data.success) {
        dispatch(getProfile());
      } else {
        dispatch(changeEmailAlert(res.data.message));
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

//action for changing the user's password
export const changePasswordAction =
  (oldPassword, newPassword) => (dispatch) => {
    axios
      .put(
        "/users/password",
        {
          password: oldPassword,
          newPassword: newPassword,
        },
        { headers: { authorization: localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.data.success) {
          dispatch(changepwAlert(res.data.message));
        } else {
          dispatch(changepwAlert(res.data.message));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(changepwAlert("Something went wrong, please try again later"));
        throw err;
      });
  };

// action for deleting the user's account
export const deleteAccountAction = (password) => (dispatch) => {
  axios
    .delete("/users/delete", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        password: password,
      },
    })
    .then((res) => {
      if (res.data.success) {
        dispatch(signOutAction);
        dispatch(authError(res.data.message));
      } else {
        dispatch(deleteAccountAlert(res.data.message));
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(
        deleteAccountAlert("Something went wrong, please try again later")
      );
      throw err;
    });
};

// Selector that lets the rest of the app get read access to authSlice state
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
