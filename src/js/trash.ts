import { Payload } from './type';
import { $ } from './utils';

/**
 * 삭제된 아이템 항목을 관리하는 클래스
 */
export class Trash {
  /**
   * @type {{ id: number, text: string, completed: boolean }[]}
   */
  trashItems: Payload[] = [];
  button: HTMLButtonElement;

  constructor() {
    this.button = $(
      '.button__component[data-type="garbage"]'
    ) as HTMLButtonElement;
    this.#loadItemsFromStorage();
  }

  #loadItemsFromStorage() {
    const storedTrashItems =
      JSON.parse(localStorage.getItem('trashItems')!) || [];

    this.trashItems = storedTrashItems;
  }

  #saveItemsToStorage() {
    localStorage.setItem('trashItems', JSON.stringify(this.trashItems));
  }

  moveItemToTrash(item: Payload) {
    if (item) {
      this.trashItems.unshift(item);
      this.#saveItemsToStorage();
    }
  }

  rollbackItem(id: number) {
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
