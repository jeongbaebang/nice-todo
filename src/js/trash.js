import { $ } from './utils';

export class Trash {
  /**
   * @type {{ id: number, text: string, completed: boolean }[]}
   */
  trashItems = [];

  constructor() {
    this.button = $('.button__component[data-type="garbage"]');
    this.#loadItemsFromStorage();
  }

  #loadItemsFromStorage() {
    const storedTrashItems =
      JSON.parse(localStorage.getItem('trashItems')) || [];

    this.trashItems = storedTrashItems;
  }

  #saveItemsToStorage() {
    localStorage.setItem('trashItems', JSON.stringify(this.trashItems));
  }

  moveItemToTrash(item) {
    if (item) {
      this.trashItems.unshift(item);
      this.#saveItemsToStorage('trashItems');
    }
  }
}

// #changeTodoStatus() {
//   const target = $('.button__component[data-type="garbage"');

//   const statuses = ['todo', 'trash'];
//   this.todoStatus = statuses.find((status) => status !== this.todoStatus);

//   console.log(this.todoStatus);
// }
