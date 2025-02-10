import { useRef, useState, useEffect, useCallback } from "react";
import { DetailsIcons as icon } from "../../constants/DetailsIcons";
import { ButtonScroll } from "../molecules/ButtonScroll";
import { formatTime } from "../../shared/formatTime";
import { DetailItem } from "../atoms/DetailItem";
import { LoadingErrorState } from "../molecules/LoadingErrorState";
import { useSelectors } from "../../hooks/useSelectors";

export const DetailsSection = () => {
  const { weatherData, weatherLoading, weatherError, settings } = useSelectors();
  const containerRef = useRef(null);
  const [isVertical, setIsVertical] = useState(false);

  const handleResize = useCallback(() => {
    setIsVertical(window.innerWidth <= 1023);
  }, []);

  const handleScroll = useCallback((amount) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        [isVertical ? "top" : "left"]: amount,
        behavior: "smooth",
      });
    }
  }, [isVertical]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  if (weatherLoading || weatherError || !weatherData) {
    return (
      <LoadingErrorState
        loading={weatherLoading}
        error={weatherError}
        weatherData={weatherData}
      />
    );
  }

  const handleWheel = (e) => handleScroll(e.deltaY);

  const { main, wind, visibility, clouds, sys } = weatherData;

  const details = [
    main && { label: "Ощущается как", value: `${Math.round(main.feels_like)} °C`, icon: icon.thermometer },
    main && { label: "MIN температура", value: `${Math.round(main.temp_min)} °C`, icon: icon.thermometerLow },
    main && { label: "MAX температура", value: `${Math.round(main.temp_max)} °C`, icon: icon.thermometerHigh },
    main && { label: "Влажность", value: `${main.humidity} %`, icon: icon.moisture },
    wind && { label: "Скорость ветра", value: `${wind.speed} м/с`, icon: icon.wind },
    settings.visibility && visibility && { label: "Видимость", value: `${visibility / 1000} км`, icon: icon.eye, },
    settings.clouds && clouds && { label: "Облачность", value: `${clouds.all} %`, icon: icon.cloudy },
    settings.sunset && sys && { label: "Закат", value: formatTime(sys.sunset), icon: icon.sunset },
    settings.sunrise && sys && { label: "Восход", value: formatTime(sys.sunrise), icon: icon.sunrise },
  ].filter(Boolean);

  return (
    <div
      className="flex flex-col justify-center items-center gap-[5px] border border-ccc border-solid py-[15px] px-[20px] rounded-[15px] w-[300px] md:w-[300px] sl:w-[500px] sm:w-[400px] xl:flex-row xl:border-none xl:w-[845px] lg:flex-row lg:h-[80px] lg:w-[490px] lg:border-none">
      <ButtonScroll onClick={() => handleScroll(-230)} direction="left" />
      <section
        className="w-full h-[320px] md:h-[360px] flex flex-col gap-[20px] py-[10px] px-0 items-center overflow-hidden relative scroll-smooth xl:flex-row xl:h-[80px] xl:w-[725px] lg:flex-row lg:h-[80px] lg:w-[470px]"
        ref={containerRef}
        onWheel={handleWheel}
      >
        {details.map(({ label, value, icon }, index) => (
          <DetailItem key={index} label={label} value={value} icon={icon} />
        ))}
      </section>
      <ButtonScroll onClick={() => handleScroll(230)} direction="right" />
    </div>
  );
};
