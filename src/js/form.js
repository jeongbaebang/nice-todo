import { $ } from './utils';

export class FormHandler {
  /**
   * @type {?string}
   */
  #value = null;

  constructor() {
    this.form = $('#todo-form');
  }

  #checkValue(value) {
    if (value === '') {
      window.alert('빈 문자열은 아이템 생성이 불가능합니다.');

      return null;
    }

    return value;
  }

  /**
   * @param {Event} event
   */
  handler(event) {
    event.preventDefault();

    const input = $('.input__component[data-type="creation"] > input');

    if (!input) {
      throw new Error('Invalid input');
    }

    this.#value = this.#checkValue(input.value);
  }

  getValue() {
    return this.#value;
  }
}
