import AbstractComponent from "./abstract-component.js";

const getTaskListTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};


export default class TaskList extends AbstractComponent {
  getTemplate() {
    return getTaskListTemplate();
  }
}
