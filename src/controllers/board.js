import {TASKS_COUNT_START, TASKS_COUNT_LOAD} from '../data/task-data';

import Sorting from '../components/sorting';
import Task from '../components/task';
import TaskEdit from '../components/task-edit';
import TaskList from '../components/task-list';
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

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._sortingComponent = new Sorting();
    this._taskListComponent = new TaskList();
    this._noTasksComponent = new NoTasks();
    this._loadMoreBtnComponent = new LoadMoreBtn();
  }

  render(tasks) {
    const container = this._container.getElement();

    const isAllTasksArchived = tasks.every((task) => task.isArchive);
    if (isAllTasksArchived) {
      render(container, this._noTasksComponent);
      return;
    }

    render(container, this._sortingComponent);
    render(container, this._taskListComponent);

    const taskListElement = this._taskListComponent.getElement();

    let showingTasksCount = TASKS_COUNT_START;
    tasks
      .slice(0, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    render(container, this._loadMoreBtnComponent);

    this._loadMoreBtnComponent.setClickHandler(() => {
      const prevTasksCount = showingTasksCount;
      showingTasksCount = showingTasksCount + TASKS_COUNT_LOAD;

      tasks
        .slice(prevTasksCount, showingTasksCount)
        .forEach((task) => renderTask(taskListElement, task));

      if (showingTasksCount >= tasks.length) {
        remove(this._loadMoreBtnComponent);
      }
    });
  }
}
