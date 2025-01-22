export const formatTime = (unixTime) => {
  const date = new Date(unixTime * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};