// import React, { useState, useContext } from "react";
// import { SearchBar } from "../molecules/SearchBar";
// import { Button } from "../atoms/Button";
// import { SettingsModal } from "./SettingsModal";
// import { WeatherContext } from "../../context/WeatherContext";
// import { formatSearch } from "../../helpers/formatSearch";
// import sc from "./Header.module.css";
// import SEARCH_ICON from "../../assets/icons/regular/search.svg";
// import SETTINGS_ICON from "../../assets/icons/regular/settings.svg";

// export const Header = ({ isSettingsOpen, toggleSettings }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const { getWeatherByCity, getWeatherByCoords } = useContext(WeatherContext);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     formatSearch(searchTerm, getWeatherByCity, getWeatherByCoords);
//     setSearchTerm("");
//   };

//   return (
//     <header className={sc.header}>
//       <h1 className={sc.header__title}>
//         <b>Моя</b>Погода
//       </h1>
//       <div className={sc.actions}>
//         <div className={sc.input__actions}>
//           <SearchBar
//             value={searchTerm}
//             onChange={setSearchTerm}
//             onSubmit={handleSearch}
//             placeholder="Введите город или координаты..."
//             className={sc.search_input_button_wrapper}
//             classNameInput={sc.header__input}
//           >
//             <Button onClick={handleSearch}>
//               <img src={SEARCH_ICON} alt="Search" />
//             </Button>
//           </SearchBar>
//         </div>
//         <Button onClick={toggleSettings}>
//           <img src={SETTINGS_ICON} alt="Settings" />
//         </Button>
//         {isSettingsOpen && <SettingsModal onClose={toggleSettings} />}
//       </div>
//     </header>
//   );
// };












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
    mb-0 w-[300px] mt-[30px] ml-auto border border-solid border-ccc gap-[5px] flex flex-col items-center justify-between rounded-[15px] px-[15px] py-[20px]
    sl:w-[500px]
    md:w-[690px] md:flex-row
    lg:w-[1024px]
    xl:w-[1200px] xl:gap-[30px]
    ">
      <h1 className="font-normal text-[32px]">
        <b>Моя</b>Погода
      </h1>
      <div className="
        flex flex-row items-center justify-between gap-[5px] w-full
        sl:max-w-[700px] sl:justify-between
        md:justify-end
        lg:gap-[10px] lg:max-w-[700px] lg:justify-end
        xl:gap-[30px] xl:max-w-[700px] xl:justify-end
      ">
        <div className="flex gap-[5px] flex-row items-center justify-between">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onSubmit={handleSearch}
            placeholder="Введите город или координаты..."
            className="flex flex-row items-center justify-between gap-[5px]"
            classNameInput="w-[200px] sl:w-[260px] lg:w-[360px] xl:w-[460px]"
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
