const TASK_COUNT = 3;

const DAYS = {
  "mo": false,
  "tu": false,
  "we": false,
  "th": false,
  "fr": false,
  "sa": false,
  "su": false,
};

const generateTask = () => {
  return {
    description: `lorem ipsum`,
    dueDate: new Date(),
    repeatingDays: Object.assign({}, DAYS, {"mo": Math.random() > 0.5}),
    color: `pink`,
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
