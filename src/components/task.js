import {months} from "../data/common-data.js";
import {formatTime, formatDate} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";

const getTaskTemplate = (task) => {
  const {description, dueDate, repeatingDays, color, isFavorite, isArchive} = task;

  const date = dueDate ? formatDate(dueDate, months) : ``;
  const time = dueDate ? formatTime(dueDate) : ``;

  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;
  const deadlineClass = dueDate instanceof Date && dueDate < Date.now() ? `card--deadline` : ``;
  const checkArchived = isArchive ? `` : `card__btn--disabled`;
  const checkFavorite = isFavorite ? `` : `card__btn--disabled`;

  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
                edit
            </button>
            <button type="button" class="card__btn card__btn--archive ${checkArchived}">
                archive
            </button>
            <button type="button" class="card__btn card__btn--favorites ${checkFavorite}">
                favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                    <span class="card__time">${time}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

export default class Task extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  getTemplate() {
    return getTaskTemplate(this._task);
  }
  setEditBtnClickHandler(handler) {
    this.getElement().querySelector(`.card__btn--edit`)
      .addEventListener(`click`, handler);
  }
}
