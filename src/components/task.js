export const taskTemplate = (task) => {
  const {description, dueDate, repeatingDays, color, isFavorite, isArchive} = task;
  const date = `23 September`;
  const time = `16:15`;

  const repeatClass = `card--repeat`;
  const deadlineClass = `card--deadline`;
  const checkArchivedBtn = isArchive ? `` : `card__btn--disabled`;
  const checkFavoriteBtn = isFavorite ? `` : `card__btn--disabled`;

  return (
    `<article class="card card--${color} ${repeatClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
                edit
            </button>
            <button type="button" class="card__btn card__btn--archive ${checkArchivedBtn}">
                archive
            </button>
            <button type="button" 
            class="card__btn card__btn--favorites card__btn--disabled ${checkFavoriteBtn}">
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
