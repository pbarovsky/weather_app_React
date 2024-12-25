import React, { useContext, useRef, useState, useEffect } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { AppContext } from "../../context/AppContext";
import { DetailsIcons as icon } from "../../constants/DetailsIcons";
import LoadingErrorState from "../molecules/LoadingErrorState";
import { formatTime } from '../../helpers/formatTime'
import Button from "../atoms/Button";
import DetailItem from "../atoms/DetailItem";
import sc from "./DetailsSection.module.css";

const DetailsSection = () => {
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
      <LoadingErrorState loading={loading} error={error} weatherData={weatherData} />
    );
  }

  const { main, wind, visibility, clouds, sys } = weatherData;

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(vertical ? e.pageY - containerRef.current.offsetTop : e.pageX - containerRef.current.offsetLeft);
    setScrollStart(vertical ? containerRef.current.scrollTop : containerRef.current.scrollLeft);
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
    const pos = vertical ? e.pageY - containerRef.current.offsetTop : e.pageX - containerRef.current.offsetLeft;
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
        containerRef.current.scrollBy({ top: -230, behavior: 'smooth' });
      } else {
        containerRef.current.scrollBy({ left: -230, behavior: 'smooth' });
      }
    }
  };

  const scrollRightFunc = () => {
    if (containerRef.current) {
      if (vertical) {
        containerRef.current.scrollBy({ top: 230, behavior: 'smooth' });
      } else {
        containerRef.current.scrollBy({ left: 230, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={sc.details_wrapper}>
      <Button className={`${sc.scroll_button} ${sc['scroll_button']}`} onClick={scrollLeftFunc}><i className={`bi bi-chevron-compact-left ${sc.rotate_bot}`}></i></Button>
      <section
        className={sc.details_card}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
      >
        <DetailItem label="Ощущается как" value={`${Math.round(main.feels_like)} °C`} icon={icon.thermometer} />
        <DetailItem label="MIN температура" value={`${Math.round(main.temp_min)} °C`} icon={icon.thermometerLow} />
        <DetailItem label="MAX температура" value={`${Math.round(main.temp_max)} °C`} icon={icon.thermometerHigh} />
        <DetailItem label="Влажность" value={`${main.humidity} %`} icon={icon.moisture} />
        <DetailItem label="Скорость ветра" value={`${wind.speed} м/с`} icon={icon.wind} />
        {settings.visibility && <DetailItem label="Видимость" value={`${visibility / 1000} км`} icon={icon.eye} />}
        {settings.clouds && <DetailItem label="Облачность" value={`${clouds.all} %`} icon={icon.cloudy} />}
        {settings.sunset && <DetailItem label="Закат" value={formatTime(sys.sunset)} icon={icon.sunset} />}
        {settings.sunrise && <DetailItem label="Восход" value={formatTime(sys.sunrise)} icon={icon.sunrise} />}
      </section>
      <Button className={`${sc.scroll_button} ${sc['scroll_button']}`} onClick={scrollRightFunc}><i className={`bi bi-chevron-compact-right ${sc.rotate_bot}`}></i></Button>
    </div>
  );
};

export default DetailsSection;
