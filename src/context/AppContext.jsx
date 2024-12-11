import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Состояния для избранных городов
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Состояния для настроек чекбоксов
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('settings');
    return savedSettings ? JSON.parse(savedSettings) : {
      visibility: true,
      clouds: true,
      sunset: true,
      sunrise: true,
    };
  });

  // Синхронизация избранных городов с localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Синхронизация настроек с localStorage
  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  // Добавление города в избранное
  const addToFavorites = (city) => {
    if (!favorites.some(fav => fav.name === city.name)) {
      setFavorites([...favorites, city]);
    }
  };

  // Удаление города из избранного
  const removeFromFavorites = (cityName) => {
    setFavorites(favorites.filter(city => city.name !== cityName));
  };

  // Обновление настроек чекбоксов
  const updateSettings = (name, value) => {
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        settings,
        updateSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
