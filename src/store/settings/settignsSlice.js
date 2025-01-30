import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "../../shared/loadFromLocalStorage";

export const settingsSlice = createSlice({
  name: "settings",
  initialState: loadFromLocalStorage("settings", {
    visibility: true,
    clouds: true,
    sunset: true,
    sunrise: true,
  }),
  reducers: {
    updateSettings: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
      localStorage.setItem("settings", JSON.stringify(state));
    },
  },
});

export const selectSettings = (state) => state.settings;
export const { actions, reducer } = settingsSlice;
