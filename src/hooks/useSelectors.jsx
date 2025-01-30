import { useSelector } from "react-redux";
import { selectWeatherData, selectWeatherLoading, selectWeatherError } from "../store/weather/weatherSlice";
import { selectFavorites } from "../store/favorites/favoriteSlice";
import { selectSettings } from "../store/settings/settignsSlice";

export const useSelectors = () => {
  const weatherData = useSelector(selectWeatherData);
  const weatherLoading = useSelector(selectWeatherLoading);
  const weatherError = useSelector(selectWeatherError);
  const settings = useSelector(selectSettings);
  const favorites = useSelector(selectFavorites);

  return {
    weatherData,
    weatherLoading,
    weatherError,
    settings,
    favorites,
  };
};
