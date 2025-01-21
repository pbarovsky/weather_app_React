import React, { useState, useContext } from "react";
import { SearchBar } from "../molecules/SearchBar";
import { Button } from "../atoms/Button";
import { SettingsModal } from "./SettingsModal";
import { WeatherContext } from "../../context/WeatherContext";
import { formatSearch } from "../../helpers/formatSearch";
import sc from "./Header.module.css";
import SEARCH_ICON from "../../assets/icons/regular/search.svg";
import SETTINGS_ICON from "../../assets/icons/regular/settings.svg";

export const Header = ({ isSettingsOpen, toggleSettings }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { getWeatherByCity, getWeatherByCoords } = useContext(WeatherContext);

  const handleSearch = (e) => {
    e.preventDefault();
    formatSearch(searchTerm, getWeatherByCity, getWeatherByCoords);
    setSearchTerm("");
  };

  return (
    <header className={sc.header}>
      <h1 className={sc.header__title}>
        <b>Моя</b>Погода
      </h1>
      <div className={sc.actions}>
        <div className={sc.input__actions}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onSubmit={handleSearch}
            placeholder="Введите город или координаты..."
            className={sc.search_input_button_wrapper}
            classNameInput={sc.header__input}
          >
            <Button onClick={handleSearch}>
              <img src={SEARCH_ICON} alt="Search" />
            </Button>
          </SearchBar>
        </div>
        <Button onClick={toggleSettings}>
          <img src={SETTINGS_ICON} alt="Settings" />
        </Button>
        {isSettingsOpen && <SettingsModal onClose={toggleSettings} />}
      </div>
    </header>
  );
};
