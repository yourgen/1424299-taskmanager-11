import AbstractComponent from "./abstract-component.js";

export const SortingType = {
  DATE_DOWN: `date-down`,
  DATE_UP: `date-up`,
  DEFAULT: `default`,
};

const getSortingTemplate = () => {
  return (
    `<div class="board__filter-list">
      <a href="#" data-sorting-type="${SortingType.DEFAULT}" class="board__filter">SORT BY DEFAULT</a>
      <a href="#" data-sorting-type="${SortingType.DATE_UP}" class="board__filter">SORT BY DATE up</a>
      <a href="#" data-sorting-type="${SortingType.DATE_DOWN}" class="board__filter">SORT BY DATE down</a>
    </div>`
  );
};

export default class Sorting extends AbstractComponent {
  constructor() {
    super();

    this._currenSortingType = SortingType.DEFAULT;
  }

  getTemplate() {
    return getSortingTemplate();
  }
  getSortingType() {
    return this._currenSortingType;
  }

  setSortingTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortingType = evt.target.dataset.sortingType;

      if (this._currentSortingType === sortingType) {
        return;
      }

      this._currentSortingType = sortingType;

      handler(this._currentSortingType);
    });
  }
}
