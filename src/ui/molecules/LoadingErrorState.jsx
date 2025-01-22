export const LoadingErrorState = ({ loading, error, weatherData }) => {
  if (loading)
    return (
      <p className="max-w-[325px] max-h-[300px] p-[10px] px-[20px]">
        Загрузка...
      </p>
    );
  if (error)
    return (
      <p className="max-w-[325px] max-h-[300px] p-[10px] px-[20px]">{error}</p>
    );
  if (!weatherData)
    return (
      <p className="max-w-[325px] max-h-[300px] p-[10px] px-[20px]">
        Введите город или координаты для поиска
      </p>
    );

  return null;
};
