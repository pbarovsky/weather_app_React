import React, { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { AppContext } from "../../context/AppContext";
import { DetailsIcons as icon } from "../../constants/DetailsIcons";
import LoadingErrorState from "../molecules/LoadingErrorState";
import sc from "./DetailsSection.module.css";

const DetailItem = ({ label, value, icon }) => (
  <p>{icon} {label}: {value}</p>
);

const DetailsSection = () => {
  const { weatherData, loading, error } = useContext(WeatherContext);
  const { settings } = useContext(AppContext);

  if (loading || error || !weatherData) {
    return (
      <LoadingErrorState loading={loading} error={error} weatherData={weatherData}/>
    );
  }

  const { main, wind, visibility, clouds, sys } = weatherData;

  return (
    <section className={sc.details_card}>
      <DetailItem label="Ощущается как" value={`${Math.round(main.feels_like)} °C`} icon={icon.thermometer} />
      <DetailItem label="MIN температура" value={`${Math.round(main.temp_min)} °C`} icon={icon.thermometerLow} />
      <DetailItem label="MAX температура" value={`${Math.round(main.temp_max)} °C`} icon={icon.thermometerHigh} />
      <DetailItem label="Влажность" value={`${main.humidity} %`} icon={icon.moisture} />
      <DetailItem label="Скорость ветра" value={`${wind.speed} м/с`} icon={icon.wind} />
      {settings.visibility && <DetailItem label="Видимость" value={`${visibility / 1000} км`} icon={icon.eye} />}
      {settings.clouds && <DetailItem label="Облачность" value={`${clouds.all} %`} icon={icon.cloudy} />}
      {settings.sunset && <DetailItem label="Закат" value={sys.sunset} icon={icon.sunset} />}
      {settings.sunrise && <DetailItem label="Восход" value={sys.sunrise} icon={icon.sunrise} />}
    </section>
  );
};

export default DetailsSection;
