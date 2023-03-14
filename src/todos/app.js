import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos } from './usecases';

const ElementIDs = {
    TODO_LIST: '.todo-list',
    NEW_TODO_INPUT: '#new-todo-input',
    CLEAR_COMPLETED: '.clear-completed',
    TODO_FILTERS: '.filtro',
    PENDING_COUNT: '#pending-count'
}

/**
 * Función que crea el componente de la aplicación
 * @param {String} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter());
        renderTodos(ElementIDs.TODO_LIST, todos);
        updatePendingTodosCount();
    }

    const updatePendingTodosCount = () => {
        const pendingTodosCount = todoStore.getTodos(Filters.Pending).length;
        document.querySelector(ElementIDs.PENDING_COUNT).innerHTML = pendingTodosCount;
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
    const clearCompletedButton = document.querySelector(ElementIDs.CLEAR_COMPLETED);
    const todoFilters = document.querySelectorAll(ElementIDs.TODO_FILTERS);

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

        if (event.target.matches('button')) {
            todoStore.deleteTodo(element.getAttribute('data-id'));
            displayTodos();
        } else {
            todoStore.toggleTodo(element.getAttribute('data-id'));
            displayTodos();
        }
    });

    clearCompletedButton.addEventListener('click', () => {
        todoStore.deleteCompletedTodos();
        displayTodos();
    });

    todoFilters.forEach(element => {
        element.addEventListener('click', (element) => {
            todoFilters.forEach(element => element.classList.remove('selected'));
            element.target.classList.add('selected');

            switch(element.target.text) {
                case 'Todos':
                    todoStore.setFilter(Filters.All);
                    break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending);
                    break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed);
                    break;
                default:
                    throw new Error('Filtro no soportado');
            }

            displayTodos();
        });
    });

}