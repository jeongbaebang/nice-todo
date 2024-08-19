import { FormHandler } from './form';

const form = new FormHandler();

document.addEventListener('submit', form.handler.bind(form));
