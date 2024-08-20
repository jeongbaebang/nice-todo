import { TodoApp } from './todo';
import { FormHandler } from './form';
import { Theme } from './theme';

const todo = new TodoApp();

new Theme();
new FormHandler({ onSubmit: todo.addItem.bind(todo) });
