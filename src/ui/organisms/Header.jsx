import { useState } from "react";
import { SearchBar } from "../molecules/SearchBar";
import { Button } from "../atoms/Button";
import { Sidebar } from "./Sidebar";
import { formatSearch } from "../../shared/formatSearch";
import { useActions } from "../../hooks/useActions";
import SEARCH_ICON from "../../assets/icons/regular/search.svg";
import SETTINGS_ICON from "../../assets/icons/regular/settings.svg";

export const Header = ({ isSettingsOpen, toggleSettings }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const {fetchWeatherByCity, fetchWeatherByCoords} = useActions();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = formatSearch(searchTerm);

    if (searchParams.lat && searchParams.lon) {
      fetchWeatherByCoords(searchParams);
    } else if (searchParams.city) {
      fetchWeatherByCity(searchParams.city);
    }
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
        <Sidebar isOpen={isSettingsOpen} onClose={toggleSettings} />
      </div>
    </header>
  );
};
