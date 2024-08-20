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

  onClickButton(handler) {
    this.button.addEventListener('click', handler);
  }
}
