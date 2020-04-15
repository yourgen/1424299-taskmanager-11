const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const formatDate = (date, months) => {
  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month}`;
};

export const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const arrPicker = (arr) => {
  return arr[getRandomNumber(0, arr.length)];
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
