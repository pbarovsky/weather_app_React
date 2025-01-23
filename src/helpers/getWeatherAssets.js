import { weatherIcons } from "../constants/weatherIcons";
import { weatherColors } from "../constants/weatherColors";
import { formatTime } from "./formatTime";

export const getWeatherAssets = (weatherData) => {
  const weatherCondition = weatherData.weather[0].main;
  const isDay = formatTime(weatherData.dt) < formatTime(weatherData.sys.sunset);

  const conditionGroups = {
    Clear: {
      icon: isDay ? weatherIcons.Clear_day : weatherIcons.Clear_night,
      color: isDay ? weatherColors.Clear_day : weatherColors.Clear_night,
    },
    Clouds: {
      icon:
        weatherData.weather[0].description === "небольшая облачность"
          ? weatherIcons.FewClouds
          : weatherIcons.Clouds,
      color: weatherColors.Clouds,
    },
    Rain: { icon: weatherIcons.Rain, color: weatherColors.Rain },
    Drizzle: { icon: weatherIcons.Rain, color: weatherColors.Rain },
    Snow: { icon: weatherIcons.Snow, color: weatherColors.Snow },
    Thunderstorm: {
      icon: weatherIcons.Thunderstorm,
      color: weatherColors.Thunderstorm,
    },
    Mist: { icon: weatherIcons.Mist, color: weatherColors.Mist },
  };

  const mistConditions = [
    "Mist",
    "Smoke",
    "Haze",
    "Dust",
    "Fog",
    "Sand",
    "Ash",
    "Squall",
    "Tornado",
  ];

  if (mistConditions.includes(weatherCondition)) {
    return { icon: weatherIcons.Mist, cardColor: weatherColors.Mist };
  }

  const { icon = "", color: cardColor = "" } =
    conditionGroups[weatherCondition] || {};
  return { icon, cardColor };
};
