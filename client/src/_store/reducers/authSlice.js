import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    error: "",
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
    fetchMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const {
  authenticate,
  unauthenticate,
  authError,
  fetchMessage,
} = authSlice.actions;

// thunks that allows us to perform async logic
export const signInAction = (history, { email, password }) => (dispatch) => {
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
      throw err;
      dispatch(authError("Bad Login Info"));
    });
};

export const signUpAction = (history, { email, password }) => (dispatch) => {
  //same process as signInAction
  axios
    .post("/users/register", { email, password })
    .then((res) => {
      if (res.data.success) {
        dispatch(authenticate());
        localStorage.setItem("token", res.data.token);
        history.push("/feature");
      } else {
        dispatch(authError(res.data.message));
      }
    })
    .catch(() => {
      dispatch(authError("Email already registered."));
    });
};

// App.js:14 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyMSIsImlhdCI6MTYwMjczMDI1OCwiZXhwIjoxNjAyOTAzMDU4fQ._uG_qHD0Vd3aDbCxiDMF2CHWujS02ayVF51nJNrJrl4
export const signOutAction = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(unauthenticate());
};

// this function is for fetching info from the express server that requires authentication header
//TODO: revise later with user profile info
export const getProfile = () => (dispatch) => {
  axios
    .get("/users/profile", {
      headers: { authorization: localStorage.getItem("token") },
    })
    .then((res) => {
      dispatch(fetchMessage(res.data.user.email));
    });
};

// Selector that lets the rest of the app get read access to authSlice state
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
