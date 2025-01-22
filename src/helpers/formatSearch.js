export const formatSearch = (input, getWeatherByCity, getWeatherByCoords) => {
  const sanitizedInput = input.trim();
  const coordinatesRegex = /^-?\d+(\.\d+)?\s*[, ]\s*-?\d+(\.\d+)?$/; // 2 числа разделнных проблем или запятой

  if (coordinatesRegex.test(sanitizedInput)) {
    const [lat, lon] = sanitizedInput.split(/[, ]+/);
    getWeatherByCoords(parseFloat(lat), parseFloat(lon));
  } else {
    getWeatherByCity(sanitizedInput);
  }
};
