import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { WeatherContext } from "../../context/WeatherContext";
import SavedCityItem from "../atoms/SavedCityItem";
import SearchBar from "../molecules/SearchBar";
import sc from "./SavedCitiesSection.module.css";

const SavedCitiesSection = () => {
  const { favorites, toggleFavorite } = useContext(AppContext);
  const { getWeatherByCity } = useContext(WeatherContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSavedCities, setFilteredSavedCities] = useState(favorites);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = favorites.filter((city) =>
        city.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredSavedCities(filtered);
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, favorites]);

  return (
    <section className={sc.SavedCities_card}>
      <SearchBar
        value={searchTerm}
        onChange={(value) => setSearchTerm(value)}
        onSubmit={(e) => e.preventDefault()}
        placeholder="Поиск в сохранённых..."
        className={sc.city_input}
      />
      <ul className={sc.saved_city__list}>
        {filteredSavedCities.map((city) => (
          <SavedCityItem
            key={city.id}
            city={city}
            onCityClick={() => {
              getWeatherByCity(city.name);
              setSearchTerm("");
            }}
            onCityDelete={() => toggleFavorite(city)}
          />
        ))}
      </ul>
    </section>
  );
};

export default SavedCitiesSection;
