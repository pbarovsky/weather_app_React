import { useContext } from 'react';
import { WeatherContext } from '../../context/WeatherContext';
import { AppContext } from '../../context/AppContext';
import { formatTime } from '../../helpers/formatTime';
import sc from './DetailsSection.module.css';

const DetailsSection = () => {
  const { weatherData, loading, error } = useContext(WeatherContext);
  const { settings } = useContext(AppContext);

  const { main, wind, visibility, clouds, sys } = weatherData || {};

  if (loading) return <p>Загрузка...</p>;
  if (error) return <div>{error}</div>;
  if (!weatherData) return <div>Введите город или координаты для поиска</div>;

  return (
    <section className={sc.detail_card}>
      <p>Ощущается как: {Math.round(main.feels_like)} °C</p>
      <p>Минимальная температура: {Math.round(main.temp_min)} °C</p>
      <p>Максимальная температура: {Math.round(main.temp_max)} °C</p>
      <p>Влажность: {main.humidity} %</p>
      <p>Скорость ветра: {wind.speed} м/с</p>
      {settings.visibility && <p>Видимость: {visibility / 1000} км</p>}
      {settings.clouds && <p>Облачность: {clouds.all} %</p>}
      {settings.sunset && <p>Закат: {formatTime(sys.sunset)}</p>}
      {settings.sunrise && <p>Восход: {formatTime(sys.sunrise)}</p>}
    </section>
  );
};

export default DetailsSection
