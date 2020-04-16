import {TASKS_COUNT, TASKS_COUNT_START, TASKS_COUNT_LOAD} from './data/task-data';
import {generateTasks} from './data/task-data';
import {generateFilters} from './data/filter-data';

import Menu from './components/menu';
import Filter from './components/filter';
import Board from './components/board';
import Sorting from './components/sorting';
import Task from './components/task';
import TaskList from './components/task-list';
import TaskEdit from './components/task-edit';
import NoTasks from "./components/no-tasks.js";
import LoadMoreBtn from './components/loadmore-btn';

import {render, renderPosition} from "./utils.js";

const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceEditToTask = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new Task(task);
  const editBtn = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editBtn.addEventListener(`click`, () => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const taskEditComponent = new TaskEdit(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent.getElement(), renderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, tasks) => {

  const isAllTasksArchived = tasks.every((task) => task.isArchive);
  if (isAllTasksArchived) {
    render(boardComponent.getElement(), new NoTasks().getElement(), renderPosition.BEFOREEND);
    return;
  }

  render(boardComponent.getElement(), new Sorting().getElement(), renderPosition.BEFOREEND);
  render(boardComponent.getElement(), new TaskList().getElement(), renderPosition.BEFOREEND);

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = TASKS_COUNT_START;
  tasks
    .slice(0, showingTasksCount)
    .forEach((task) => renderTask(taskListElement, task));

  const loadMoreBtnComponent = new LoadMoreBtn();
  render(boardComponent.getElement(), loadMoreBtnComponent.getElement(), renderPosition.BEFOREEND);

  loadMoreBtnComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + TASKS_COUNT_LOAD;

    tasks
      .slice(prevTasksCount, showingTasksCount)
      .forEach((task) => renderTask(taskListElement, task));

    if (showingTasksCount >= tasks.length) {
      loadMoreBtnComponent.getElement().remove();
      loadMoreBtnComponent.removeElement();
    }
  });
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASKS_COUNT);

render(siteHeaderElement, new Menu().getElement(), renderPosition.BEFOREEND);
render(siteMainElement, new Filter(filters).getElement(), renderPosition.BEFOREEND);

const boardComponent = new Board();
render(siteMainElement, boardComponent.getElement(), renderPosition.BEFOREEND);
renderBoard(boardComponent, tasks);
