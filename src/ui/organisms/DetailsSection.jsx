import React, { useContext, useRef, useState, useEffect } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { AppContext } from "../../context/AppContext";
import { DetailsIcons as icon } from "../../constants/DetailsIcons";
import { ButtonScroll } from "../molecules/ButtonScroll";
import { LoadingErrorState } from "../molecules/LoadingErrorState";
import { formatTime } from "../../helpers/formatTime";
import { DetailItem } from "../atoms/DetailItem";

export const DetailsSection = () => {
  const { weatherData, loading, error } = useContext(WeatherContext);
  const { settings } = useContext(AppContext);
  const containerRef = useRef(null);
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth <= 1023);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollOptions = isVertical
        ? { top: direction === "left" ? -530 : 530, behavior: "smooth" }
        : { left: direction === "left" ? -530 : 530, behavior: "smooth" };

      containerRef.current.scrollBy(scrollOptions);
    }
  };

  if (loading || error || !weatherData) {
    return (
      <LoadingErrorState
        loading={loading}
        error={error}
        weatherData={weatherData}
      />
    );
  }

  const { main, wind, visibility, clouds, sys } = weatherData;

  const details = [
    { label: "Ощущается как", value: `${Math.round(main.feels_like)} °C`, icon: icon.thermometer },
    { label: "MIN температура", value: `${Math.round(main.temp_min)} °C`, icon: icon.thermometerLow },
    { label: "MAX температура", value: `${Math.round(main.temp_max)} °C`, icon: icon.thermometerHigh },
    { label: "Влажность", value: `${main.humidity} %`, icon: icon.moisture },
    { label: "Скорость ветра", value: `${wind.speed} м/с`, icon: icon.wind },
    settings.visibility && { label: "Видимость", value: `${visibility / 1000} км`, icon: icon.eye },
    settings.clouds && { label: "Облачность", value: `${clouds.all} %`, icon: icon.cloudy },
    settings.sunset && { label: "Закат", value: formatTime(sys.sunset), icon: icon.sunset },
    settings.sunrise && { label: "Восход", value: formatTime(sys.sunrise), icon: icon.sunrise },
  ].filter(Boolean);

  return (
    <div
      className="
    flex flex-col items-center gap-[5px] border border-ccc border-solid py-[15px] px-[20px] rounded-[15px] w-[300px]
    md:w-[300px]
    sl:w-[500px]
    sm:w-[400px]
    xl:flex-row xl:border-none xl:w-[845px]
    lg:flex-row lg:h-[80px] lg:w-[490px] lg:border-none
    "
    >
      <ButtonScroll onClick={() => scroll("left")} direction="left"/>
      <section
        className="
        w-full h-[320px] flex flex-col gap-[20px] py-[10px] px-0 items-center overflow-hidden relative scroll-smooth
        xl:flex-row xl:h-[80px] xl:w-[725px]
        lg:flex-row lg:h-[80px] lg:w-[470px]
        "
        ref={containerRef}
        onWheel={(e) => {
          const scrollOptions = isVertical
            ? { top: e.deltaY, behavior: "smooth" }
            : { left: e.deltaY, behavior: "smooth" };

          containerRef.current.scrollBy(scrollOptions);
        }}
      >
        {details.map(({ label, value, icon }, index) => (
          <DetailItem key={index} label={label} value={value} icon={icon} />
        ))}
      </section>
      <ButtonScroll onClick={() => scroll("right")} direction="right" />
    </div>
  );
};