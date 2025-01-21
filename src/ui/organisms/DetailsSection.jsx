import React, { useContext, useRef, useState, useEffect } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { AppContext } from "../../context/AppContext";
import { DetailsIcons as icon } from "../../constants/DetailsIcons";
import { LoadingErrorState } from "../molecules/LoadingErrorState";
import { formatTime } from "../../helpers/formatTime";
import { Button } from "../atoms/Button";
import { DetailItem } from "../atoms/DetailItem";
import sc from "./DetailsSection.module.css";

export const DetailsSection = () => {
  const { weatherData, loading, error } = useContext(WeatherContext);
  const { settings } = useContext(AppContext);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [vertical, setVertical] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setVertical(window.innerWidth <= 840);
    };

    handleResize(); // Проверка при монтировании
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(
      vertical
        ? e.pageY - containerRef.current.offsetTop
        : e.pageX - containerRef.current.offsetLeft
    );
    setScrollStart(
      vertical
        ? containerRef.current.scrollTop
        : containerRef.current.scrollLeft
    );
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const pos = vertical
      ? e.pageY - containerRef.current.offsetTop
      : e.pageX - containerRef.current.offsetLeft;
    const walk = (pos - startX) * 2; // Увеличиваем скорость прокрутки
    if (vertical) {
      containerRef.current.scrollTop = scrollStart - walk;
    } else {
      containerRef.current.scrollLeft = scrollStart - walk;
    }
  };

  const handleWheel = (e) => {
    if (containerRef.current) {
      if (vertical) {
        containerRef.current.scrollTop += e.deltaY * 2; // Увеличиваем скорость прокрутки колесиком мыши
      } else {
        containerRef.current.scrollLeft += e.deltaY * 2;
      }
    }
  };

  const scrollLeftFunc = () => {
    if (containerRef.current) {
      if (vertical) {
        containerRef.current.scrollBy({ top: -230, behavior: "smooth" });
      } else {
        containerRef.current.scrollBy({ left: -230, behavior: "smooth" });
      }
    }
  };

  const scrollRightFunc = () => {
    if (containerRef.current) {
      if (vertical) {
        containerRef.current.scrollBy({ top: 230, behavior: "smooth" });
      } else {
        containerRef.current.scrollBy({ left: 230, behavior: "smooth" });
      }
    }
  };



  return (
    <div className="
    flex flex-col items-center gap-[5px] border border-ccc border-solid py-[15px] px-[20px] rounded-[15px] w-[300px]
    xl:flex-row xl:border-none xl:w-[845px]
    ">
      <Button
        className="text-black text-[30px] border-none p-[10px] cursor-pointer z-[1] w-[50px] h-[50px]"
        onClick={scrollLeftFunc}
      >
        <i className={`bi bi-chevron-compact-left rotate-90 lg:rotate-0`}></i>
      </Button>
      <section
        className="
        w-[300px] h-[320px] flex flex-col gap-[20px] py-[10px] px-0 items-center overflow-hidden relative scroll-smooth
        xl:flex-row xl:h-[80px] xl:w-[725px]
        "
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
      >
        <DetailItem
          label="Ощущается как"
          value={`${Math.round(main.feels_like)} °C`}
          icon={icon.thermometer}
        />
        <DetailItem
          label="MIN температура"
          value={`${Math.round(main.temp_min)} °C`}
          icon={icon.thermometerLow}
        />
        <DetailItem
          label="MAX температура"
          value={`${Math.round(main.temp_max)} °C`}
          icon={icon.thermometerHigh}
        />
        <DetailItem
          label="Влажность"
          value={`${main.humidity} %`}
          icon={icon.moisture}
        />
        <DetailItem
          label="Скорость ветра"
          value={`${wind.speed} м/с`}
          icon={icon.wind}
        />
        {settings.visibility && (
          <DetailItem
            label="Видимость"
            value={`${visibility / 1000} км`}
            icon={icon.eye}
          />
        )}
        {settings.clouds && (
          <DetailItem
            label="Облачность"
            value={`${clouds.all} %`}
            icon={icon.cloudy}
          />
        )}
        {settings.sunset && (
          <DetailItem
            label="Закат"
            value={formatTime(sys.sunset)}
            icon={icon.sunset}
          />
        )}
        {settings.sunrise && (
          <DetailItem
            label="Восход"
            value={formatTime(sys.sunrise)}
            icon={icon.sunrise}
          />
        )}
      </section>
      <Button
        className="text-black text-[30px] border-none p-[10px] cursor-pointer z-[1] w-[50px] h-[50px]"
        onClick={scrollRightFunc}
      >
        <i className={`bi bi-chevron-compact-right rotate-90 lg:rotate-0`}></i>
      </Button>
    </div>
  );
};
