import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { openSignInWindow } from "./utility/oauth_popup";

const { REACT_APP_SERVER_URL } = process.env;

// TODO: change isAuthenticated to status/authStatus or something more descriptive

const initialState = {
  isAuthenticated: false,
  userProfile: {
    name: "",
    email: "",
    _id: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state) => {
      state.isAuthenticated = true;
    },
    deauthenticate: (state) => {
      state.isAuthenticated = false;
      state.userProfile = {
        name: "",
        email: "",
        _id: null,
      };
    },
    updateProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        // TODO: if login successful, it should save the user data from the db into global context
        state.isAuthenticated = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        // TODO: if login successful, it should save the user data from the db into global context
        state.isAuthenticated = true;
      })
      .addCase(changeName.fulfilled, (state, action) => {
        const { name } = action.payload;
        state.userProfile.name = name;
      })
      .addCase(changeEmail.fulfilled, (state, action) => {
        const { email } = action.payload;
        state.userProfile.email = email;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.userProfile = {
          name: "",
          email: "",
          _id: null,
        };
      });
  },
});

export const { authenticate, deauthenticate, updateProfile } =
  authSlice.actions;

// TODO: it should save the user data from the db into global context
export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }) => {
    const res = await axios.post("/users/authenticate", { email, password });
    if (!res.data.success) {
      throw new Error(res?.data?.message || "Log in failed");
    }
    localStorage.setItem("token", res.data.token);
    return { success: true };
  }
);

// <----------------------  OAuth2.0 sign in  ------------------------->
export const googleSignInAction = () => () => {
  openSignInWindow(REACT_APP_SERVER_URL + "/users/google", "SignIn");
};

export const fbSignInAction = () => () => {
  openSignInWindow(REACT_APP_SERVER_URL + "/users/facebook", "SignIn");
};

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }) => {
    const res = await axios.post("/users/register", { email, password });
    if (!res.data.success) {
      throw new Error(res.data.message);
    }
    localStorage.setItem("token", res.data.token);
    return { success: true };
  }
);

// TODO: we should only be getting profile on login/signup
//   - Blocked: because we need to set up token validation on the server
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

export const changeName = createAsyncThunk(
  "auth/changeName",
  async ({ newName }) => {
    const res = await axios.put(
      "/users/profile/name",
      { newName },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    if (!res.data.success) {
      throw new Error(
        res?.data?.message || "Something went wrong, please try again later"
      );
    }
    return { name: res.data.name };
  }
);

export const changeEmail = createAsyncThunk(
  "auth/changeEmail",
  async ({ newEmail, password }) => {
    const res = await axios.put(
      "/users/profile/email",
      {
        newEmail,
        password,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    if (!res.data.success) {
      throw new Error(
        res?.data?.message || "Something went wrong, please try again later"
      );
    }
    return { email: res.data.email };
  }
);

export const changePassword = createAsyncThunk(
  "auth/changeEmail",
  async ({ oldPassword, newPassword }) => {
    const res = await axios.put(
      "/users/password",
      {
        password: oldPassword,
        newPassword,
      },
      { headers: { authorization: localStorage.getItem("token") } }
    );
    const { success, message } = res.data;
    if (!success) {
      throw new Error(
        message || "Something went wrong, please try again later"
      );
    }
    return { success: true };
  }
);

export const deleteAccount = createAsyncThunk(
  "auth/deleteAccount",
  async ({ password }) => {
    const res = await axios.delete("/users/delete", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        password: password,
      },
    });
    const { success, message } = res.data;
    if (!success) {
      throw new Error(
        message || "Something went wrong, please try again later"
      );
    }
    localStorage.removeItem("token");
    return { success: true, message };
  }
);

// Selector that lets the rest of the app get read access to authSlice state
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
