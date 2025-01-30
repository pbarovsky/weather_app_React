import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as favoriteReducer } from "./favorites/favoriteSlice";
import { reducer as settingsReducer } from "./settings/settignsSlice"
import { reducer as weatherReducer } from "./weather/weatherSlice";

const rootReducer = combineReducers({
  favorites: favoriteReducer,
  settings: settingsReducer,
  weather: weatherReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
