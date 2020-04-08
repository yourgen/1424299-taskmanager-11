import {COLORS, DAYS} from "../const.js";
import {randomNumber} from "../utils.js";
import {arrPicker} from "../utils.js";

const TASK_COUNT = 3;

const TASK_NAMES = [
  `Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`
];

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * randomNumber(0, 8);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const generateRepeatingDays = () => {
  return Object.assign({}, DAYS, {
    "mo": Math.random() > 0.5,
  });
};

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : getRandomDate();
  return {
    description: arrPicker(TASK_NAMES),
    dueDate,
    repeatingDays: dueDate ? DAYS : generateRepeatingDays(),
    color: arrPicker(COLORS),
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5,
    //add data keys
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

export {TASK_COUNT, generateTask, generateTasks};
