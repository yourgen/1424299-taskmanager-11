const filterMarkupTemplate = (filter, isChecked) => {
  const {name, count} = filter;

  return (
    `<input
      type="radio"
      id="filter__${name}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
    />
    <label for="filter__${name}" class="filter__label">
      ${name}&nbsp;<span class="filter__${name}-count">${count}</span>
    </label>`
  );
};

export const filterTemplate = (filters) => {
  const filtersMarkup = filters
    .map((item, i) => filterMarkupTemplate(item, i === 0))
    .join(`\n`);

  return (
    `<section class="main__filter filter container">
      ${filtersMarkup}
    </section>`
  );
};
