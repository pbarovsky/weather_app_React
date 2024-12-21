import React from 'react';

const LoadingErrorState = ({ loading, error, weatherData }) => {
  const styles = {
    maxWidth: '325px',
    maxHeight: '300px',
    padding: '10px 20px',
  };

  if (loading) return <p style={styles}>Загрузка...</p>;
  if (error) return <p style={styles}>{error}</p>;
  if (!weatherData) return <p style={styles}>Введите город или координаты для поиска</p>;
  
  return null;
};

export default LoadingErrorState;
