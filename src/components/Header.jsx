import React, { useState, useContext } from "react";
import Button from "./Button";
import SettingsModal from "./SettingsModal";
import SearchInput from "./SearchInput";
import { WeatherContext } from "../context/WeatherContext";
import { formatSearch } from "../helpers/formatSearch";
import sc from "./Header.module.css";

import SEARCH_ICON from "../assets/icons/regular/search.svg";
import SETTINGS_ICON from "../assets/icons/regular/settings.svg";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { getWeatherByCity, getWeatherByCoords } = useContext(WeatherContext);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleSearch = (e) => {
    e.preventDefault();
    formatSearch(searchTerm, getWeatherByCity, getWeatherByCoords);
    setSearchTerm("");
  };

  return (
    <header className={sc.header}>
      <h1>МояПогода</h1>
      <div className={sc.actions}>
        <div className={sc.input__actions}>
          <SearchInput
            onSubmit={handleSearch}
            value={searchTerm}
            onChange={setSearchTerm}
            className={sc.header__input}
            placeholder="Введите город или координаты..."
          />
          <Button onClick={handleSearch}>
            <img src={SEARCH_ICON} alt="Search" />
          </Button>
        </div>
        <Button onClick={toggleModal}>
          <img src={SETTINGS_ICON} alt="settings" />
        </Button>
        {isModalOpen && <SettingsModal onClose={toggleModal} />}
      </div>
    </header>
  );
};

export default Header;