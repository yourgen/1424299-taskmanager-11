import {TASK_COUNT, TASK_COUNT_START, TASK_COUNT_LOAD} from './data/task-data';
import {generateTasks} from './data/task-data';
import {generateFilters} from './data/filter-data';

import Menu from './components/menu';
import Filter from './components/filter';
import Board from './components/board';
import Sort from './components/sort';
import Task from './components/task';
import Tasks from './components/tasks';
import TaskEdit from './components/task-edit';
import LoadMoreBtn from './components/loadmore-btn';

import {render, renderPosition} from "./utils.js";

const renderTask = (taskListElement, task) => {
  const onEditBtnClick = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const onEditFormSubmit = (evt) => {
    evt.preventDefault();
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  const taskComponent = new Task(task);
  const editBtn = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editBtn.addEventListener(`click`, onEditBtnClick);

  const taskEditComponent = new TaskEdit(task);
  const editForm = taskEditComponent.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, onEditFormSubmit);

  render(taskListElement, taskComponent.getElement(), renderPosition.BEFOREEND);
};

const renderBoard = (boardComponent, tasks) => {
  render(boardComponent.getElement(), new Sort().getElement(), renderPosition.BEFOREEND);
  render(boardComponent.getElement(), new Tasks().getElement(), renderPosition.BEFOREEND);

  const taskListElement = boardComponent.getElement().querySelector(`.board__tasks`);

  let showingTasksCount = TASK_COUNT_START;
  tasks
    .slice(0, showingTasksCount)
    .forEach((task) => renderTask(taskListElement, task));

  const loadMoreBtnComponent = new LoadMoreBtn();
  render(boardComponent.getElement(), loadMoreBtnComponent.getElement(), renderPosition.BEFOREEND);

  loadMoreBtnComponent.getElement().addEventListener(`click`, () => {
    const prevTasksCount = showingTasksCount;
    showingTasksCount = showingTasksCount + TASK_COUNT_LOAD;

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
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, new Menu().getElement(), renderPosition.BEFOREEND);
render(siteMainElement, new Filter(filters).getElement(), renderPosition.BEFOREEND);

const boardComponent = new Board();
render(siteMainElement, boardComponent.getElement(), renderPosition.BEFOREEND);
renderBoard(boardComponent, tasks);
