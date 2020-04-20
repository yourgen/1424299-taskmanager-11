import {TASKS_COUNT} from './data/task-data';
import {generateTasks} from './data/task-data';
import {generateFilters} from './data/filter-data';

import Menu from './components/menu';
import Filter from './components/filter';
import Board from './components/board';

import BoardController from "./controllers/board.js";

import {render} from "./utils/render.js";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

const filters = generateFilters();
const tasks = generateTasks(TASKS_COUNT);

render(siteHeaderElement, new Menu());
render(siteMainElement, new Filter(filters));

const boardComponent = new Board();
const boardController = new BoardController(boardComponent);
render(siteMainElement, boardComponent);
boardController.render(tasks);
