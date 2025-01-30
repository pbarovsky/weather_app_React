import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "../../shared/loadFromLocalStorage";

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState: loadFromLocalStorage("favorites", []),
  reducers: {
    toggleFavorite: (state, action) => {
      const { payload: city } = action;
      const cityIndex = state.findIndex((fav) => fav.name === city.name);
      if (cityIndex === -1) {
        state.push(city);
      } else {
        state.splice(cityIndex, 1);
      }
      localStorage.setItem("favorites", JSON.stringify(state));
    },
  },
});

export const selectFavorites = (state) => state.favorites;
export const { actions, reducer } = favoriteSlice;
