import React, { useState } from "react";
import { WeatherProvider } from "./context/WeatherContext";
import { AppProvider } from "./context/AppContext";
import { Header } from "./ui/organisms/Header";
import { WeatherSection } from "./ui/organisms/WeatherSection";
import { DetailsSection } from "./ui/organisms/DetailsSection";
import { SavedCitiesSection } from "./ui/organisms/SavedCitiesSection";

const App = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => setIsSettingsOpen((prev) => !prev);

  return (
    <AppProvider>
      <WeatherProvider>
        <Header
          isSettingsOpen={isSettingsOpen}
          toggleSettings={toggleSettings}
        />
        <div className="flex flex-col justify-center items-center gap-[30px] my-[50px] mx-auto flex-wrap lg:flex-row xl:flex-row">
          <main className="flex flex-col gap-[30px] self-start flex-wrap md:flex-row lg:flex-col">
            <WeatherSection />
            <DetailsSection />
          </main>
          <SavedCitiesSection />
        </div>
      </WeatherProvider>
    </AppProvider>
  );
};

export default App;
