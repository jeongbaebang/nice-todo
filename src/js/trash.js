import { Theme } from './theme';
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

  rollbackItem(id) {
    if (!id) {
      throw new Error('You must provide a valid ID.');
    }

    const index = this.trashItems.findIndex((item) => item.id === id);

    if (index !== -1) {
      const payload = this.trashItems[index];

      this.trashItems.splice(index, 1);
      this.#saveItemsToStorage();

      return payload;
    } else {
      throw new Error('The specified item element was not found.');
    }
  }
}
