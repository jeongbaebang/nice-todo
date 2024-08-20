import { Trash } from './trash';
import { $ } from './utils';

export class TodoApp {
  /**
   * @type {"todo" | "trash"}
   */
  todoStatus = 'todo';

  /**
   * @type {{ id: number, text: string, completed: boolean }[]}
   */
  todoItems = [];

  constructor() {
    this.trash = new Trash();
    this.container = $('.item-list__container');
    this.#loadItemsFromStorage();
    this.#renderItemList();
    this.#initTrashButtonListeners();
  }

  #initTrashButtonListeners() {
    if (!this.trash.button) {
      throw new Error('Invalid trash button');
    }

    this.trash.button.addEventListener(
      'click',
      this.changeTodoStatus.bind(this)
    );
  }

  changeTodoStatus() {
    const statuses = ['todo', 'trash'];
    const status = statuses.find((status) => status !== this.todoStatus);
    const iconType = status === 'todo' ? ' auto_delete ' : ' edit_note ';

    this.todoStatus = status;
    // 삭제 상태일 경우 폼 입력 불가
    const isDisabled = status === 'todo' ? false : true;
    $('.input__component[data-type="creation"] input').disabled = isDisabled;
    $('.button__component[data-type="creation"]').disabled = isDisabled;
    // 아이콘 변경
    $('.button__component[data-type="garbage"] > span').textContent = iconType;
    // 텍스트 변경
    const textType =
      status === 'todo'
        ? { total: '나의 할 일 목록', done: '완료된 목록' }
        : { total: '삭제된 할 일 목록', done: '삭제처리된 완료 목록' };
    $('.item-count__total .text').textContent = textType.total;
    $('.item-count__done .text').textContent = textType.done;
    // 아이템 리스트 보여주기
    this.#renderItemList();
    this.#updateItemLength();
  }

  #clearItemList() {
    const todoListContainer = $('.item-list__container');

    if (todoListContainer) {
      todoListContainer.innerHTML = '';
    }
  }

  #renderItemList() {
    this.#clearItemList();

    const items = this.#getCurrentItems();

    if (items.length > 0) {
      this.#toggleEmptyListState(false);
      items.forEach((item) =>
        this.#renderItem(item, 'beforeend', this.todoStatus)
      );
    }

    this.#updateItemLength();
  }

  #loadItemsFromStorage() {
    const storedTodoItems = JSON.parse(localStorage.getItem('todoItems')) || [];

    this.todoItems = storedTodoItems;
  }

  #saveItemsToStorage() {
    localStorage.setItem('todoItems', JSON.stringify(this.todoItems));
  }

  #updateItemLength() {
    const container = $('.item-count__container');
    const todoLengthText = container.querySelector(
      '.item-count__total > .count'
    );
    const doneLengthText = container.querySelector(
      '.item-count__done > .count'
    );

    const list = this.#getCurrentItems();
    const totalLength = list.length;
    const todoLength = list.filter((item) => !item.completed).length;
    const doneLength = list.filter((item) => item.completed).length;

    todoLengthText.textContent = todoLength;
    doneLengthText.textContent = `${doneLength}/${totalLength}`;

    this.#toggleEmptyListState(totalLength <= 0);
  }

  removeItem(id) {
    if (!id) {
      throw new Error('You must provide a valid ID.');
    }

    const index = this.todoItems.findIndex((item) => item.id === id);

    if (index !== -1) {
      this.trash.moveItemToTrash(this.todoItems[index]);
      this.todoItems.splice(index, 1);
    }

    const target = $(`.task__component[data-key="${id}"]`);

    if (target) {
      target.remove();
      this.#updateItemLength();
      this.#saveItemsToStorage();
    }
  }

  toggleComplete(id) {
    if (!id) {
      throw new Error('You must provide a valid ID.');
    }
    const items = this.#getCurrentItems();
    const item = items.find((item) => item.id === id);

    if (item) {
      item.completed = !item.completed;
      const target = document.querySelector(
        `.task__component[data-key="${id}"]`
      );

      target.classList.toggle('done', item.completed);
      this.#updateItemLength();
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
    this.#updateItemLength();
    this.#saveItemsToStorage();
  }

  #getCurrentItems() {
    return this.todoStatus === 'todo' ? this.todoItems : this.trash.trashItems;
  }

  /**
   * @param {Object} item
   * @param {number} item.id
   * @param {number} item.text
   * @param {number} item.completed
   * @param {"afterbegin" | "afterend" | "beforebegin" | "beforeend"} position
   * @param {"todo" | "trash"} type
   */
  #renderItem(item, position = 'afterbegin', type = 'todo') {
    const itemHTML = this.#generateItem(item, type);
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
        if (this.todoStatus === 'todo') {
          this.removeItem(item.id);
        } else {
          this.todoItems.unshift(this.trash.rollbackItem(item.id));
          this.#saveItemsToStorage();
          this.#renderItemList();
        }
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
   * @param {"todo" | "trash"} type
   */
  #generateItem(item, type = 'todo') {
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
          <span class="material-symbols-outlined">${
            type === 'todo' ? ' delete ' : 'redo'
          }</span>
        </button>
      </div>
    `;
  }
}
