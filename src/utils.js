const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const randomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const arrPicker = (arr) => {
  return arr[randomNumber(0, arr.length)];
};
