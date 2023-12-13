import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// TODO: change isAuthenticated to status/authStatus or something more descriptive

const token = localStorage.getItem("token");
const initialState = {
  isAuthenticated: Boolean(token),
  userProfile: {
    _id: null,
    email: "",
    name: "",
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
        _id: null,
        name: "",
        email: "",
      };
    },
    updateProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userProfile = action.payload;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userProfile = action.payload;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userProfile = action.payload;
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

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }) => {
    const res = await axios.post("/api/users/register", { email, password });
    const { message, profile, success, token } = res.data;
    if (!success) throw new Error(message);
    localStorage.setItem("token", token);
    const { _id, email: userEmail, name } = profile;
    return { _id, email: userEmail, name };
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }) => {
    const res = await axios.post("/api/users/login", { email, password });
    const { profile, success, token } = res.data;
    if (!success) {
      throw new Error("Log in failed");
    }
    localStorage.setItem("token", token);
    const { _id, email: userEmail, name } = profile;
    return { _id, email: userEmail, name };
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  const res = await axios.get("/api/users/logout");
  const { success } = res.data;
  if (!success) {
    throw new Error();
  }
  return { success };
});

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("/api/users/profile", {
    headers: { authorization: token },
  });
  const { _id, email, name } = res.data.user;
  return { _id, email, name };
});

export const changeName = createAsyncThunk(
  "auth/changeName",
  async ({ newName }) => {
    const res = await axios.put(
      "/api/users/profile/name",
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
      "/api/users/profile/email",
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
      "/api/users/password",
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
    const res = await axios.delete("/api/users/delete", {
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
