import { FormHandler } from './form';
import { Theme } from './theme';
import { TodoApp } from './todo';

new Theme();
const todo = new TodoApp();
new FormHandler({ onSubmit: todo.addItem.bind(todo) });
