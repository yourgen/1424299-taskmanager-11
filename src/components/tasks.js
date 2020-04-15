import {createElement} from "../utils.js";

const tasksTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};


export default class Tasks {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return tasksTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}