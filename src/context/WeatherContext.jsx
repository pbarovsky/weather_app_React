import React, { createContext, useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

export const WeatherContext = createContext();

const API_KEY = "aae5541070e86f4526a7113a1f6692c2"; // Ваш API-ключ OpenWeatherMap
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const TIMEOUT = 8000; // Таймаут для запросов

const fetchWithTimeout = async (url, params, timeout = TIMEOUT) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await axios.get(url, {
      params,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response.data;
  } catch (err) {
    if (controller.signal.aborted) {
      throw new Error("Превышено время ожидания запроса");
    }
    throw err;
  }
};

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initialFetchDone = useRef(false); // Контролируем, был ли выполнен начальный запрос

  const fetchWeatherData = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithTimeout(BASE_URL, { ...params, appid: API_KEY });
      setWeatherData(data);
    } catch (err) {
      setError(err.message || "Ошибка при получении данных о погоде");
    } finally {
      setLoading(false);
    }
  }, []);

  const getWeatherByCity = useCallback(
    (city) => fetchWeatherData({ q: city, units: "metric", lang: "ru" }),
    [fetchWeatherData]
  );

  const getWeatherByCoords = useCallback(
    (lat, lon) => fetchWeatherData({ lat, lon, units: "metric", lang: "ru" }),
    [fetchWeatherData]
  );

  useEffect(() => {
    if (initialFetchDone.current) return; // Если запрос уже был выполнен, пропускаем
    initialFetchDone.current = true;

    if (navigator.geolocation) {
      console.log('render')
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            await getWeatherByCoords(coords.latitude, coords.longitude);
          } catch {
            setError("Не удалось получить погоду по текущей геолокации.");
          }
        },
        () => {
          setError("Не удалось получить геолокацию. Введите название города или координаты вручную.");
        }
      );
    } else {
      setError("Ваш браузер не поддерживает геолокацию.");
    }
  }, [getWeatherByCoords]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        loading,
        error,
        getWeatherByCity,
        getWeatherByCoords,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
