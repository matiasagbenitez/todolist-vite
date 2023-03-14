import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos } from './usecases';

const ElementIDs = {
    TODO_LIST: '.todo-list',
    NEW_TODO_INPUT: '#new-todo-input',
}

/**
 * Función que crea el componente de la aplicación
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TODO_LIST, todos);
    }

    // Se ejecuta cuando la función App es invocada
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    // Referencias a los elementos del DOM
    const newTodoInput = document.querySelector(ElementIDs.NEW_TODO_INPUT);
    const todoListUL = document.querySelector(ElementIDs.TODO_LIST);

    // Listeners
    newTodoInput.addEventListener('keyup', (event) => {
        if (event.keyCode !== 13 || newTodoInput.value.trim() === '') return;
        todoStore.addTodo(event.target.value);
        newTodoInput.value = '';
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        if (!element) return;
        
        if (!event.target.matches('button')) {
            todoStore.toggleTodo(element.getAttribute('data-id'));
            displayTodos();
        } else {
            todoStore.deleteTodo(element.getAttribute('data-id'));
            displayTodos();
        }
    });
}