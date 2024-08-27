import { $ } from './utils';

/**
 * 다크/라이트 테마 담당 클래스
 */
export class Theme {
  constructor() {
    this.#addThemeEvent();
  }

  #addThemeEvent() {
    const button = $('.button__component[data-type="theme"]');

    if (!button) {
      throw new Error('Invalid theme button');
    }

    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.setAttribute('data-theme', currentTheme);

    button.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      theme = theme === 'light' ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    });
  }
}
