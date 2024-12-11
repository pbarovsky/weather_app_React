// App.jsx
import React from "react";
import Header from "./components/Header";
import WeatherBlock from "./components/WeatherBlock";
import DetailsBlock from "./components/DetailsBlock";
import SavedCitiesBlock from "./components/SavedCitiesBlock";
import { WeatherProvider } from "./context/WeatherContext";
import AppProvider from "./context/AppContext";
import "./App.css";

function App() {
  return (
    <AppProvider>
      <WeatherProvider>
        <div className="App">
          <Header />
          <div className="flexer-container">
            <main className="main">
              <WeatherBlock />
              <DetailsBlock />
            </main>
            <SavedCitiesBlock className="SavedCitiesBlock" />
          </div>
        </div>
      </WeatherProvider>
    </AppProvider>
  );
}

export default App;