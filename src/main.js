import {TASK_COUNT, TASK_COUNT_START, TASK_COUNT_LOAD} from './data/task-data';
import {generateTasks} from './data/task-data';
import {generateFilters} from './data/filter-data';

import {menuTemplate} from './components/menu';
import {filterTemplate} from './components/filter';
import {boardTemplate} from './components/board';
import {sortTemplate} from './components/sort';
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

render(boardElement, sortTemplate(), `afterbegin`);
render(taskListElement, taskEditTemplate(tasks[0]));

let showingTasksCount = TASK_COUNT_START;

tasks
  .slice(1, showingTasksCount)
  .forEach((task) => render(taskListElement, taskTemplate(task)));

render(boardElement, loadMoreBtnTemplate());

const loadMoreBtn = boardElement.querySelector(`.load-more`);

loadMoreBtn.addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + TASK_COUNT_LOAD;

  tasks
    .slice(prevTasksCount, showingTasksCount)
    .forEach((task) => render(taskListElement, taskTemplate(task)));

  if (showingTasksCount >= tasks.length) {
    loadMoreBtn.remove();
  }
});
