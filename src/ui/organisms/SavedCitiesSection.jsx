import { useState, useEffect } from "react";
import { SavedCityItem } from "../atoms/SavedCityItem";
import { SearchBar } from "../molecules/SearchBar";
import { useSelectors } from "../../hooks/useSelectors";
import { useActions } from "../../hooks/useActions";

export const SavedCitiesSection = () => {
  const {favorites} = useSelectors();
  const {toggleFavorite, fetchWeatherByCity} = useActions();
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

  const handleCityClick = (city) => {
    fetchWeatherByCity(city.name);
    setSearchTerm("");
  };

  return (
    <section
      className="
      flex flex-col border border-solid border-ccc rounded-[15px] py-[10px] px-[20px] items-start self-start gap-[15px] min-h-[200px] w-[300px]
      sm:w-[400px] sl:w-[500px] md:w-[340px] lg:w-[300px] lg:min-h-[410px]
      "
    >
      <SearchBar
        value={searchTerm}
        onChange={(value) => setSearchTerm(value)}
        onSubmit={(e) => e.preventDefault()}
        placeholder="Поиск в сохранённых..."
        className="w-full"
      />
      <ul className="list-none flex flex-col justify-between items-center gap-[15px] w-full">
        {filteredSavedCities.map((city) => (
          <SavedCityItem
            key={city.id}
            city={city}
            onCityClick={() => {
              fetchWeatherByCity(city.name);
              setSearchTerm("");
            }}
            onCityDelete={() => toggleFavorite(city)}
          />
        ))}
      </ul>
    </section>
  );
};
