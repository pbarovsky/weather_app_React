import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actions as favoriteActions } from "../store/favorites/favoriteSlice";
import { actions as weatherActions, fetchWeatherByCity, fetchWeatherByCoords } from "../store/weather/weatherSlice";
import { actions as settingsActions } from "../store/settings/settignsSlice";

const rootActions = {
  ...favoriteActions,
  ...weatherActions,
  ...settingsActions,
  ...settingsActions,
  fetchWeatherByCity,
  fetchWeatherByCoords,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
