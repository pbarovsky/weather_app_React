import React, { useState } from "react";
import { WeatherProvider } from "./context/WeatherContext";
import { AppProvider } from "./context/AppContext";
import { Header } from "./ui/organisms/Header";
import { WeatherSection } from "./ui/organisms/WeatherSection";
import { DetailsSection } from "./ui/organisms/DetailsSection";
import { SavedCitiesSection } from "./ui/organisms/SavedCitiesSection";
import { Container } from "./ui/atoms/Container";
import "./App.css";

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
          <div className="flexer-container">
            <main className="main">
              <WeatherSection />
              <DetailsSection />
            </main>
            <SavedCitiesSection className="SavedCitiesBlock" />
          </div>
        
      </WeatherProvider>
    </AppProvider>
  );
};

export default App;
