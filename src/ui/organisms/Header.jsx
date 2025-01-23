import React, { useState, useContext } from "react";
import { SearchBar } from "../molecules/SearchBar";
import { Button } from "../atoms/Button";
import { SettingsModal } from "./SettingsModal";
import { WeatherContext } from "../../context/WeatherContext";
import { formatSearch } from "../../helpers/formatSearch";
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
    <header 
      className="
      mb-0 w-[300px] mt-[30px] mx-auto border border-solid border-ccc gap-[5px] flex flex-col items-center justify-between rounded-[15px] px-[15px] py-[20px]
      sm:w-[400px] sl:w-[500px] md:w-[670px] md:flex-row lg:w-[820px] xl:w-[1180px]
      "
    >
      <h1 className="font-normal text-[32px]">
        <b>Моя</b>Погода
      </h1>
      <div 
        className="
        flex flex-row items-center justify-between gap-[5px] w-full
        md:justify-end
        "
      >
        <div className="flex gap-[5px] flex-row items-center justify-between">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onSubmit={handleSearch}
            placeholder="Введите город или координаты..."
            className="flex flex-row items-center justify-between gap-[5px]"
            classNameInput=" w-[200px] sl:w-[260px] lg:w-[360px] xl:w-[460px]"
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
