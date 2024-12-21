import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Состояния для избранных городов
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Состояния для настроек чекбоксов
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("settings");
    return saved
      ? JSON.parse(saved)
      : { visibility: true, clouds: true, sunset: true, sunrise: true };
  });

  // Синхронизация избранных городов с localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Синхронизация настроек с localStorage
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  // добавление и удаление из избранного
  const toggleFavorite = (city) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.name === city.name)
        ? prev.filter((fav) => fav.name !== city.name)
        : [...prev, city]
    );
  };

  // Избранное или нет?
  const isFavorite = (cityName) => {
    return favorites.some((fav) => fav.name === cityName);
  }

  // Обновление настроек чекбоксов
  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <AppContext.Provider
      value={{ 
        favorites, 
        toggleFavorite, 
        isFavorite, 
        settings, 
        updateSetting 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;