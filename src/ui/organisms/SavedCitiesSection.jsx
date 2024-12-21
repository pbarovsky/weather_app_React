import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { WeatherContext } from "../../context/WeatherContext";

import SearchBar from '../molecules/SearchBar';
import Button from "../atoms/Button";
import sc from './SavedCitiesSection.module.css';

import DELETE_ICON from '../../assets/icons/regular/delete.svg';

const SavedCitiesSection = () => {
  const { favorites, toggleFavorite } = useContext(AppContext);
  const { getWeatherByCity } = useContext(WeatherContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSavedCitiesBlock, setFilteredSavedCitiesBlock] = useState(favorites);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = favorites.filter((city) =>
        city.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      setFilteredSavedCitiesBlock(filtered);
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
      <ul>
        {filteredSavedCitiesBlock.map((city) => (
          <li key={city.id}>
            <p
              onClick={() => {
                getWeatherByCity(city.name);
                setSearchTerm("");
              }}
            >
              {city.name}, {city.sys.country}
            </p>
            <Button onClick={() => toggleFavorite(city)}>
              <img src={DELETE_ICON} alt="delete" />
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SavedCitiesSection;