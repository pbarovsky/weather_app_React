import React, { useContext, useEffect, useState } from "react";
import LoadingErrorState from "../molecules/LoadingErrorState";
import { WeatherContext } from "../../context/WeatherContext";
import { AppContext } from "../../context/AppContext";
import { getWeatherAssets } from "../../helpers/getWeatherAssets";
import sc from "./WeatherSection.module.css";

import FAVORITE_ICON from "../../assets/icons/regular/favorite.svg";
import FAVORITE_ACTIVE_ICON from "../../assets/icons/regular/favorite_active.svg";

const WeatherSection = () => {
  const { weatherData, loading, error } = useContext(WeatherContext);
  const { toggleFavorite, isFavorite } = useContext(AppContext);

  if (loading || error || !weatherData) {
    return (
      <LoadingErrorState loading={loading} error={error} weatherData={weatherData}/>
    );
  }

  const { name, sys, coord, main } = weatherData;
  const { icon, cardColor } = getWeatherAssets(weatherData);

  return (
    <section className={sc.weather_card} style={{ backgroundColor: cardColor }}>
      <img
        className={sc.fav}
        src={isFavorite(name) ? FAVORITE_ACTIVE_ICON : FAVORITE_ICON}
        alt="Favorite"
        onClick={() => toggleFavorite(weatherData)}
      />
      <div className={sc.about}>
        <img src={icon} alt="Weather" className={sc.image_weather} />
        <div className={sc.temp_container}>
          <p className={sc.temp}>
            {Math.round(main.temp)} <span>°C</span>
          </p>
          <p className={sc.weather_type}>
            {weatherData.weather[0].description}
          </p>
        </div>
      </div>
      <div className={sc.desc}>
        <p className={sc.city}>{name}</p>
        <p className={sc.country}>{sys.country}</p>
        <p className={sc.coord}>
          {coord.lat.toFixed(3)}, {coord.lon.toFixed(3)}
        </p>
      </div>
    </section>
  );
};

export default WeatherSection;