const TASK_COUNT = 3;




const generateTask = () => {
  return {
    description: `lorem ipsum`,
    dueDate: new Date(),
    repeatingDays: null,
    color: `pink`,
    isFavorite: true,
    isArchive: false,
    //add data keys
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

export {TASK_COUNT, generateTask, generateTasks};
