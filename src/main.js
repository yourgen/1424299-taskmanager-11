import {TASKS} from './components/task-data';
import {generateFilters} from './data/filter-data';

import {menuTemplate} from './components/menu';
import {filterTemplate} from './components/filter';
import {boardTemplate} from './components/board';
import {taskEditTemplate} from './components/task-edit';
import {taskTemplate} from './components/task';
import {loadMoreBtnTemplate} from './components/loadmore-btn';

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();

render(siteHeaderElement, menuTemplate());
render(siteMainElement, filterTemplate(filters));
render(siteMainElement, boardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const boardElement = siteMainElement.querySelector(`.board`);

render(taskListElement, taskEditTemplate());

TASKS.forEach(() => {
  render(taskListElement, taskTemplate());
});

render(boardElement, loadMoreBtnTemplate());
