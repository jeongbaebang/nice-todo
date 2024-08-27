import { $ } from './utils';

type CallBack = (arg: string) => void;

export class FormHandler {
  form: Element;
  input: HTMLInputElement;
  callback: CallBack;
  /**
   * @typedef {function(string): void} OnSubmit
   * @param {Object} params
   * @param {OnSubmit} params.onSubmit - 아이템이 제출될 때 호출되는 콜백 함수
   */
  constructor({ onSubmit }: { onSubmit: CallBack }) {
    this.form = $('#todo-form');
    this.input = $(
      '.input__component[data-type="creation"] > input'
    ) as HTMLInputElement;
    this.callback = onSubmit;

    // 폼 제출 이벤트 리스너 등록
    this.#initEventListeners();
  }

  #initEventListeners() {
    if (!this.form) {
      throw new Error('Invalid form');
    }

    this.form.addEventListener('submit', this.handler.bind(this));
  }

  /**
   * @param {string} value
   */
  #checkValue(value: string) {
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
  handler(event: Event) {
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
