import {defaultColors, days} from "./common-data.js";
import {getRandomNumber} from "../utils.js";
import {arrPicker} from "../utils.js";

const TASKS_COUNT = 24;
const TASKS_COUNT_START = 8;
const TASKS_COUNT_LOAD = 8;

const taskNames = [
  `Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`
];

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffRange = [0, Object.keys(days).length + 1];
  const diffValue = sign * getRandomNumber(...diffRange);
  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateRepeatingDays = () => {
  return Object.assign({}, days, {
    "mo": Math.random() > 0.5,
  });
};

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();
  return {
    description: arrPicker(taskNames),
    dueDate,
    repeatingDays: dueDate ? days : generateRepeatingDays(),
    color: arrPicker(defaultColors),
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5,
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

export {TASKS_COUNT, TASKS_COUNT_START, TASKS_COUNT_LOAD, generateTasks};
