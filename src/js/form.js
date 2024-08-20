import { $ } from './utils';

export class FormHandler {
  /**
   * @typedef {function(string): void} OnSubmit
   * @param {Object} params
   * @param {OnSubmit} params.onSubmit - 아이템이 제출될 때 호출되는 콜백 함수
   */
  constructor({ onSubmit }) {
    this.form = $('#todo-form');
    this.input = $('.input__component[data-type="creation"] > input');
    this.callback = onSubmit;
  }

  /**
   * @param {string} value
   */
  #checkValue(value) {
    if (value === '') {
      window.alert('빈 문자열은 아이템 생성이 불가능합니다.');

      return null;
    }

    return value;
  }

  #clearValue() {
    this.input.value = '';
  }

  /**
   * @param {Event} event
   */
  handler(event) {
    event.preventDefault();

    if (!this.input) {
      throw new Error('Invalid input');
    }

    const value = this.#checkValue(this.input.value);

    if (value) {
      this.callback(value);
      this.#clearValue();
    }
  }
}
