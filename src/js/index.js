import { TodoApp } from './todo';
import { FormHandler } from './form';
import { Theme } from './theme';
import { Trash } from './trash';

const todo = new TodoApp(Trash);

new Theme();
new FormHandler({ onSubmit: todo.addItem.bind(todo) });
