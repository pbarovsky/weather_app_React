export const formatSearch = (input) => {
  const sanitizedInput = input.trim();
  const coordinatesRegex = /^-?\d+(\.\d+)?\s*[, ]\s*-?\d+(\.\d+)?$/;

  if (coordinatesRegex.test(sanitizedInput)) {
    const [lat, lon] = sanitizedInput.split(/[, ]+/).map(parseFloat);
    return { lat, lon };
  } else {
    return { city: sanitizedInput };
  }
};
