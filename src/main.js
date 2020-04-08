import {TASK_COUNT} from './data/task-data';
import {generateTasks} from './data/task-data';
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
const tasks = generateTasks(TASK_COUNT);

render(siteHeaderElement, menuTemplate());
render(siteMainElement, filterTemplate(filters));
render(siteMainElement, boardTemplate());

const taskListElement = siteMainElement.querySelector(`.board__tasks`);
const boardElement = siteMainElement.querySelector(`.board`);

render(taskListElement, taskEditTemplate(tasks[0]));

tasks.slice(1, tasks.length).forEach((task) => {
  render(taskListElement, taskTemplate(task));
});

render(boardElement, loadMoreBtnTemplate());
