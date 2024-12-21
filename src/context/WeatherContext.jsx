import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "aae5541070e86f4526a7113a1f6692c2"; // Вставьте ваш API-ключ OpenWeatherMap

  // Функция для выполнения запроса с таймаутом
  const fetchWithTimeout = async (url, params, timeout = 8000) => {
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

  // Получение погоды по названию города
  const getWeatherByCity = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWithTimeout(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          q: city,
          units: "metric",
          lang: "ru",
          appid: API_KEY,
        }
      );
      setWeatherData(data);
    } catch (err) {
      setError(err.message || "Ошибка при получении данных о погоде");
    } finally {
      setLoading(false);
    }
  };

  // Получение погоды по координатам
  const getWeatherByCoords = useCallback(
    async (lat, lon) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithTimeout(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            lat,
            lon,
            units: "metric",
            lang: "ru",
            appid: API_KEY,
          }
        );
        setWeatherData(data);
      } catch (err) {
        setError(err.message || "Ошибка при получении данных о погоде");
      } finally {
        setLoading(false);
      }
    },
    [API_KEY]
  );

  // Автоматическое получение погоды по геолокации
  useEffect(() => {
    const fetchInitialWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async ({ coords }) => {
            try {
              await getWeatherByCoords(coords.latitude, coords.longitude);
            } catch (err) {
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
    };

    fetchInitialWeather();
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
