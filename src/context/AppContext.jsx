import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("settings");
    return saved
      ? JSON.parse(saved)
      : { visibility: true, clouds: true, sunset: true, sunrise: true };
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  const toggleFavorite = (city) => {
    setFavorites((prev) =>
      prev.some((fav) => fav.name === city.name)
        ? prev.filter((fav) => fav.name !== city.name)
        : [...prev, city]
    );
  };

  const isFavorite = (cityName) => {
    return favorites.some((fav) => fav.name === cityName);
  };

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        settings,
        updateSetting,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
