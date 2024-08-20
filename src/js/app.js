import { FormHandler } from './form';
import { $ } from './utils';

class TodoApp {
  /**
   * @type {{ id: number, text: string, completed: boolean }[]}
   */
  todoItems;

  constructor() {
    this.container = $('.item-list__container');
    this.#loadItemsFromStorage();
    this.#initRenderItem();
  }

  #initRenderItem() {
    if (this.todoItems.length > 0) {
      this.#toggleEmptyListState(false);
      this.todoItems.forEach((item) => this.#renderItem(item, 'beforeend'));
    }
  }

  #loadItemsFromStorage() {
    const storedItems = JSON.parse(localStorage.getItem('todoItems')) || [];
    this.todoItems = storedItems;
  }

  #saveItemsToStorage() {
    localStorage.setItem('todoItems', JSON.stringify(this.todoItems));
  }

  updateItemLength() {
    const container = $('.item-count__container');
    const todoLengthText = container.querySelector(
      '.item-count__total > .count'
    );
    const doneLengthText = container.querySelector(
      '.item-count__done > .count'
    );

    const totalLength = this.todoItems.length;
    const todoLength = this.todoItems.filter((item) => !item.completed).length;
    const doneLength = this.todoItems.filter((item) => item.completed).length;

    todoLengthText.textContent = todoLength;
    doneLengthText.textContent = `${doneLength}/${totalLength}`;

    this.#toggleEmptyListState(totalLength <= 0);
  }

  removeItem(id) {
    if (!id) {
      throw new Error('You must provide a valid ID.');
    }

    this.todoItems = this.todoItems.filter((item) => item.id !== id);
    const target = $(`.task__component[data-key="${id}"]`);

    if (target) {
      target.remove();
      this.updateItemLength();
      this.#saveItemsToStorage();
    }
  }

  toggleComplete(id) {
    if (!id) {
      throw new Error('You must provide a valid ID.');
    }

    const item = this.todoItems.find((item) => item.id === id);

    if (item) {
      item.completed = !item.completed;
      const target = document.querySelector(
        `.task__component[data-key="${id}"]`
      );

      target.classList.toggle('done', item.completed);
      this.updateItemLength();
      this.#saveItemsToStorage();
    }
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
    this.updateItemLength();
    this.#saveItemsToStorage();
  }

  /**
   * @param {Object} item
   * @param {number} item.id
   * @param {number} item.text
   * @param {number} item.completed
   * @param {"afterbegin" | "afterend" | "beforebegin" | "beforeend"} position
   */
  #renderItem(item, position = 'afterbegin') {
    const itemHTML = this.#generateItem(item);
    const template = document.createElement('template');
    template.innerHTML = itemHTML.trim();
    const newItem = template.content.firstChild;

    if (!newItem) {
      throw new Error('Item not found');
    }

    if (item.completed) {
      newItem.classList.add('done');
    }

    newItem
      .querySelector('input[type="checkbox"]')
      .addEventListener('change', () => {
        this.toggleComplete(item.id);
      });

    newItem
      .querySelector('.button__component[data-type="deletion"]')
      .addEventListener('click', () => {
        this.removeItem(item.id);
      });

    this.container.insertAdjacentElement(position, newItem);
  }

  #toggleEmptyListState(isEmpty) {
    const containerEmptyList = $('.item-list__empty__container');
    const containerList = $('.item-list__container');

    if (isEmpty) {
      containerEmptyList.style.display = 'flex';
      containerList.style.display = 'none';
    } else {
      containerEmptyList.style.display = 'none';
      containerList.style.display = 'flex';
    }
  }

  /**
   * @param {Object} item
   * @param {number} item.id
   * @param {number} item.text
   * @param {number} item.completed
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
