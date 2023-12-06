import { createSlice } from "@reduxjs/toolkit";
import { isDarkModeEnabled } from "../../lib/darkmode";

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    isDark: isDarkModeEnabled(),
  },
  reducers: {
    setIsDark: (state, action) => {
      state.isDark = action.payload;
    },
  },
});

export const { setIsDark } = darkModeSlice.actions;

export const selectDarkMode = (state) => state.darkMode;

export default darkModeSlice.reducer;
