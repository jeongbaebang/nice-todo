import { $ } from './utils';

export class FormHandler {
  /**
   * @type {?string}
   */
  #key = 0;

  constructor() {
    this.form = $('#todo-form');
    this.input = $('.input__component[data-type="creation"] > input');
    this.parentElement = $('.item-list__container');
  }

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
      this.renderItem(value);
    }
  }

  generateItem(value) {
    return `
      <div class="task__component" data-key="${this.#key}">
        <div class="checkbox__component">
          <label>
            <input type="checkbox" />
          </label>
        </div>
        <div class="input__component">
          <input type="text" disabled placeholder="텍스트를 입력하세요" value="${value}"/>
        </div>
        <button class="button__component" data-type="deletion">
          <span class="material-symbols-outlined"> delete </span>
        </button>
      </div>
    `;
  }

  renderItem(value) {
    const itemHTML = this.generateItem(value);
    // 템플릿 요소를 사용하여 HTML 문자열을 DOM 요소로 변환
    const template = document.createElement('template');
    template.innerHTML = itemHTML.trim(); // 공백 제거
    const newItem = template.content.firstChild;

    this.parentElement.insertAdjacentElement('afterbegin', newItem);
    this.#key++;

    this.#clearValue();
  }
}
