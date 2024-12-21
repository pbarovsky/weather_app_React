import { useContext } from 'react';
import { WeatherContext } from '../../context/WeatherContext';
import { AppContext } from '../../context/AppContext';
import { formatTime } from '../../helpers/formatTime';
import { DetailsIcons as icon } from '../../constants/DetailsIcons';
import LoadingErrorState from "../molecules/LoadingErrorState";
import sc from './DetailsSection.module.css';

const DetailsSection = () => {
  const { weatherData, loading, error } = useContext(WeatherContext);
  const { settings } = useContext(AppContext);

  const { main, wind, visibility, clouds, sys } = weatherData || {};

  if (loading || error || !weatherData) {
    return (
      <LoadingErrorState
        loading={loading}
        error={error}
        weatherData={weatherData}
      />
    );
  }

  return (
    <section className={sc.details_card}>
      <p>{icon.thermometer} Ощущается как: {Math.round(main.feels_like)} °C</p>
      <p>{icon.thermometerLow} Минимальная температура: {Math.round(main.temp_min)} °C</p>
      <p>{icon.thermometerHigh} Максимальная температура: {Math.round(main.temp_max)} °C</p>
      <p>{icon.moisture} Влажность: {main.humidity} %</p>
      <p>{icon.wind} Скорость ветра: {wind.speed} м/с</p>
      {settings.visibility && <p>{icon.eye} Видимость: {visibility / 1000} км</p>}
      {settings.clouds && <p>{icon.cloudy} Облачность: {clouds.all} %</p>}
      {settings.sunset && <p>{icon.sunset} Закат: {formatTime(sys.sunset)}</p>}
      {settings.sunrise && <p>{icon.sunrise} Восход: {formatTime(sys.sunrise)}</p>}
    </section>
  );
};

export default DetailsSection;
