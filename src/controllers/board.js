import {TASKS_COUNT_START, TASKS_COUNT_LOAD} from '../data/task-data';

import Sorting, {SortingType} from '../components/sorting';
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

const renderTasks = (taskListElement, tasks) => {
  tasks.forEach((task) => {
    renderTask(taskListElement, task);
  });
};

const getSortedTasks = (tasks, sortingType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();

  switch (sortingType) {
    case SortingType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortingType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case SortingType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }

  return sortedTasks.slice(from, to);
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
    const renderLoadMoreBtn = () => {
      if (showingTasksCount >= tasks.length) {
        return;
      }

      render(container, this._loadMoreBtnComponent);

      this._loadMoreBtnComponent.setClickHandler(() => {
        const prevTasksCount = showingTasksCount;
        showingTasksCount = showingTasksCount + TASKS_COUNT_LOAD;

        const sortedTasks = getSortedTasks(tasks, this._sortingComponent.getSortingType(), prevTasksCount, showingTasksCount);
        renderTasks(taskListElement, sortedTasks);

        if (showingTasksCount >= tasks.length) {
          remove(this._loadMoreBtnComponent);
        }
      });
    };

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
    renderTasks(taskListElement, tasks.slice(0, showingTasksCount));

    renderLoadMoreBtn();

    this._sortingComponent.setSortingTypeChangeHandler((sortingType) => {
      showingTasksCount = TASKS_COUNT_START;

      taskListElement.innerHTML = ``;

      const sortedTasks = getSortedTasks(tasks, sortingType, 0, showingTasksCount);
      renderTasks(taskListElement, sortedTasks);

      renderLoadMoreBtn();
    });
  }
}
