import {createElement} from "../utils.js";

const loadMoreBtnTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class LoadMoreBtn {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return loadMoreBtnTemplate();
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
