import AbstractComponent from "./abstract-component.js";

const getLoadMoreBtnTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class LoadMoreBtn extends AbstractComponent {
  getTemplate() {
    return getLoadMoreBtnTemplate();
  }
  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
