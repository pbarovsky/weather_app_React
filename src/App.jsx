import React, { useState, useEffect } from "react";
import { Header } from "./ui/organisms/Header";
import { WeatherSection } from "./ui/organisms/WeatherSection";
import { DetailsSection } from "./ui/organisms/DetailsSection";
import { SavedCitiesSection } from "./ui/organisms/SavedCitiesSection";
import { useActions } from "./hooks/useActions";

const App = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { fetchWeatherByCoords } = useActions();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetchWeatherByCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);

  const toggleSettings = () => setIsSettingsOpen((prev) => !prev);

  return (
    <>
      <Header isSettingsOpen={isSettingsOpen} toggleSettings={toggleSettings} />
      <div className="flex flex-col justify-center items-center gap-[30px] my-[50px] mx-auto flex-wrap lg:flex-row xl:flex-row">
        <main className="flex flex-col gap-[30px] self-start flex-wrap md:flex-row lg:flex-col">
          <WeatherSection />
          <DetailsSection />
        </main>
        <SavedCitiesSection />
      </div>
    </>
  );
};

export default App;
