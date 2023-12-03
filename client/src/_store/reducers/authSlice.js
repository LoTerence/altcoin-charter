import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { openSignInWindow } from "./utility/oauth_popup";
const { REACT_APP_SERVER_URL } = process.env;

// TODO: move alerts (changeEmailAlert, changepwAlert, deleteAccountAlert) to setting page
// TODO: change isAuthenticated to status/authStatus or something more descriptive

const initialState = {
  error: null,
  isAuthenticated: false,
  userProfile: {
    name: "",
    email: "",
    _id: null,
  },
  emailAlert: null,
  pwAlert: null,
  daAlert: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state) => {
      state.error = null;
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
    authError: (state, action) => {
      state.isAuthenticated = false;
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
  extraReducers(builder) {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        // TODO: if login successful, it should save the user data from the db into global context
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        // TODO: if login successful, it should save the user data from the db into global context
        state.error = null;
        state.isAuthenticated = true;
      });
  },
});

export const {
  authenticate,
  authError,
  updateProfile,
  changeEmailAlert,
  changepwAlert,
  deleteAccountAlert,
  deauthenticate,
} = authSlice.actions;

// TODO: it should save the user data from the db into global context
export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }) => {
    const res = await axios.post("/users/authenticate", { email, password });
    if (!res.data.success) {
      // res.data.message is the fail reason message from the server (ie bad password, etc.)
      throw new Error(res.data.message);
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
      console.log(res.data);
      console.log(res.data.message);
      throw new Error(res.data.message);
    }
    localStorage.setItem("token", res.data.token);
    return { success: true };
  }
);

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
        localStorage.removeItem("token");
        dispatch(deauthenticate());
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
