import { LoadingErrorState } from "../molecules/LoadingErrorState";
import { getWeatherAssets } from "../../shared/getWeatherAssets";
import { useSelectors } from "../../hooks/useSelectors";
import { useActions } from "../../hooks/useActions";
import FAVORITE_ICON from "../../assets/icons/regular/favorite.svg";
import FAVORITE_ICON_ACTIVE from "../../assets/icons/regular/favorite_active.svg";

export const WeatherSection = () => {
  const { weatherData, weatherLoading, weatherError, favorites } = useSelectors();
  const {toggleFavorite} = useActions();

  if (weatherLoading || weatherError || !weatherData) {
    return (
      <LoadingErrorState
        loading={weatherLoading}
        error={weatherError}
        weatherData={weatherData}
      />
    );
  }

  const { icon, cardColor } = getWeatherAssets(weatherData);
  const { name, sys, coord, main } = weatherData;
  const isFavorite = favorites.some((fav) => fav.name === weatherData.name);

  return (
    <section
      className="
      flex flex-col items-center gap-[20px] w-[300px] h-[400px] justify-start rounded-[15px] relative
      sm:w-[400px] sm:h-[300px] sl:w-[500px] sl:h-[300px] sl:gap-[30px] md:w-[340px] md:gap-[0px] md:h-[500px]
      lg:w-[490px] lg:h-[300px] lg:gap-[10px] xl:w-[845px] xl:flex-row xl:justify-between xl:px-[50px]
      "
      style={{ backgroundColor: cardColor }}
    >
      <img
        className="absolute top-[2%] right-[2%] cursor-pointer"
        src={isFavorite ? FAVORITE_ICON_ACTIVE : FAVORITE_ICON}
        alt="Favorite"
        onClick={() => toggleFavorite(weatherData)}
      />
      <div
        className="
        flex flex-col items-center
        sm:flex-row sm:gap-[20px] sl:flex-row sl:gap-[30px] md:flex-col md:gap-[10px] md:mt-[30px] lg:flex-row lg:gap-[30px] lg:mt-0
        "
      >
        <img
          src={icon}
          alt="Weather"
          className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px]"
        />
        <div className="flex items-center justify-center text-center gap-0 flex-col">
          <p className="text-[80px] text-white font-bold">
            {Math.round(main.temp)} <span>°C</span>
          </p>
          <p className="text-black font-light text-[18px]">
            {weatherData.weather[0].description}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center order-[-1] xl:order-[1]">
        <p className="font-bold text-[24px]">{name}</p>
        <p className="text-[16px]">{sys.country}</p>
        <p className="text-[16px]">
          {coord.lat.toFixed(3)}, {coord.lon.toFixed(3)}
        </p>
      </div>
    </section>
  );
};
