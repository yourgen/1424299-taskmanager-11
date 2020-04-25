import {TASKS_COUNT_START, TASKS_COUNT_LOAD} from '../data/task-data';

import Sorting, {SortingType} from '../components/sorting';
import TaskList from '../components/task-list';
import NoTasks from "../components/no-tasks.js";
import LoadMoreBtn from '../components/loadmore-btn';

import TaskController from "./task.js";

import {render, remove} from "../utils/render.js";

const renderTasks = (taskListElement, tasks) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskListElement);

    taskController.render(task);

    return taskController;
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

    this._tasks = [];
    this._shownTaskControllers = [];
    this._showingTasksCount = TASKS_COUNT_START;
    this._sortingComponent = new Sorting();
    this._taskListComponent = new TaskList();
    this._noTasksComponent = new NoTasks();
    this._loadMoreBtnComponent = new LoadMoreBtn();

    this._onSortingTypeChange = this._onSortingTypeChange.bind(this);
    this._sortingComponent.setSortingTypeChangeHandler(this._onSortingTypeChange);
  }

  render(tasks) {
    this._tasks = tasks;
    const container = this._container.getElement();

    const isAllTasksArchived = this._tasks.every((task) => task.isArchive);
    if (isAllTasksArchived) {
      render(container, this._noTasksComponent);
      return;
    }

    render(container, this._sortingComponent);
    render(container, this._taskListComponent);

    const taskListElement = this._taskListComponent.getElement();
    const newTasks = renderTasks(taskListElement, this._tasks.slice(0, this._showingTasksCount));
    this._shownTaskControllers = this._shownTaskControllers.concat(newTasks);

    this._renderLoadMoreBtn();
  }

  _renderLoadMoreBtn() {
    if (this._showingTasksCount >= this._tasks.length) {
      return;
    }

    const container = this._container.getElement();
    render(container, this._loadMoreBtnComponent);

    this._loadMoreBtnComponent.setClickHandler(() => {
      const prevTasksCount = this._showingTasksCount;
      const taskListElement = this._taskListComponent.getElement();

      this._showingTasksCount = this._showingTasksCount + TASKS_COUNT_LOAD;
      const sortedTasks = getSortedTasks(this._tasks, this._sortingComponent.getSortingType(), prevTasksCount, this._showingTasksCount);
      const newTasks = renderTasks(taskListElement, sortedTasks);
      this._shownTaskControllers = this._shownTaskControllers.concat(newTasks);

      if (this._showingTasksCount >= this._tasks.length) {
        remove(this._loadMoreBtnComponent);
      }
    });
  }

  _onSortingTypeChange(sortingType) {
    this._showingTasksCount = TASKS_COUNT_START;
    const sortedTasks = getSortedTasks(this._tasks, sortingType, 0, this._showingTasksCount);

    const taskListElement = this._taskListComponent.getElement();
    taskListElement.innerHTML = ``;

    const newTasks = renderTasks(taskListElement, sortedTasks);
    this._shownTaskControllers = newTasks;
    this._renderLoadMoreBtn();
  }
}
