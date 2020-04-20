import {TASKS_COUNT_START, TASKS_COUNT_LOAD} from '../data/task-data';

import Sorting from '../components/sorting';
import Task from '../components/task';
import TaskList from '../components/task-list';
import TaskEdit from '../components/task-edit';
import NoTasks from "../components/no-tasks.js";
import LoadMoreBtn from '../components/loadmore-btn';

import {render, replace, remove} from "../utils/render.js";

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaceEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new Task(task);
  const taskEditComponent = new TaskEdit(task);

  taskComponent.setEditBtnClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent);
};

const renderBoard = (boardElement, tasks) => {

  const isAllTasksArchived = tasks.every((task) => task.isArchive);
  if (isAllTasksArchived) {
    render(boardElement, new NoTasks());
    return;
  }

  render(boardElement, new Sorting());
  render(boardElement, new TaskList());

  const taskListElement = boardElement.querySelector(`.board__tasks`);

  let showingTasksCount = TASKS_COUNT_START;
  tasks
    .slice(0, showingTasksCount)
    .forEach((task) => renderTask(taskListElement, task));

  const loadMoreBtnComponent = new LoadMoreBtn();
  render(boardElement, loadMoreBtnComponent);

  loadMoreBtnComponent.setClickHandler(() => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + TASKS_COUNT_LOAD;

    tasks
      .slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    if (showingTasksCount >= tasks.length) {
      remove(loadMoreBtnComponent);
    }
  });
};

export default class BoardController {
  constructor(container) {
    this._container = container;
  }

  render(tasks) {
    renderBoard(this._container, tasks);
  }
}
