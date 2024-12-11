import React, { useState, useEffect, useContext } from "react";
import Button from "./Button";
import SearchInput from "./SearchInput";
import { AppContext } from "../context/AppContext";
import { WeatherContext } from "../context/WeatherContext";
import sc from "./SavedCitiesBlock.module.css";

import DELETE_ICON from '../assets/icons/regular/delete.svg'

const SavedCitiesBlock = () => {
  const { favorites, removeFromFavorites } = useContext(AppContext);
  const { getWeatherByCity } = useContext(WeatherContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSavedCitiesBlock, setFilteredSavedCitiesBlock] =
    useState(favorites);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = favorites.filter((city) =>
        city.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSavedCitiesBlock(filtered);
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, favorites]);

  return (
    <section className={sc.SavedCitiesBlock_card}>
      <SearchInput
        onSubmit={(e) => e.preventDefault()}
        value={searchTerm}
        onChange={setSearchTerm}
        className={sc.city_input}
        placeholder="Поиск в сохранённых..."
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
            <Button onClick={() => removeFromFavorites(city.name)}>
              <img src={DELETE_ICON} alt="delete" />
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SavedCitiesBlock;
