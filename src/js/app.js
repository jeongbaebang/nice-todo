import { FormHandler } from './form';
import { $ } from './utils';

class TodoApp {
  constructor() {
    this.todoItems = [];
    this.container = $('.item-list__container');
  }

  addItem(value) {
    if (typeof value !== 'string' || value === '') {
      throw new Error('Make sure you pass the correct string.');
    }

    const item = {
      id: Date.now(),
      text: value,
      completed: false,
    };

    this.todoItems.unshift(item);
    this.#renderItem(item);
  }

  #renderItem(item) {
    const itemHTML = this.#generateItem(item);
    const template = document.createElement('template');
    template.innerHTML = itemHTML.trim();
    const newItem = template.content.firstChild;

    this.container.insertAdjacentElement('afterbegin', newItem);
  }

  /**
   * @param {Object} item
   * @param {number} item.id
   * @param {number} item.text
   * @param {number} item.completed
   * @returns
   */
  #generateItem(item) {
    if (!item?.id || !item?.text) {
      throw new Error('You must provide valid attributes.');
    }

    const { id, text, completed } = item;

    return `
      <div class="task__component" data-key="${id}">
        <div class="checkbox__component">
          <label>
            <input type="checkbox" ${completed ? 'checked' : ''}/>
          </label>
        </div>
        <div class="input__component">
          <input type="text" disabled placeholder="텍스트를 입력하세요" value="${text}"/>
        </div>
        <button class="button__component" data-type="deletion">
          <span class="material-symbols-outlined"> delete </span>
        </button>
      </div>
    `;
  }
}

const todo = new TodoApp();
const form = new FormHandler({ onSubmit: todo.addItem.bind(todo) });

document.addEventListener('submit', form.handler.bind(form));
