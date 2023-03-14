import { Todo } from '../todos/models/todo.model.js';

const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending'
}

const state = {
    todos: [
        new Todo('Aprender Vue.js'),
        new Todo('Aprender Firebase'),
        new Todo('Aprender Node.js'),
        new Todo('Aprender Express.js'),
    ],
    filter: Filters.All
}

const initStore = () => {
    loadStore();
}

const loadStore = () => {
    if (!localStorage.getItem('state')) return;

    const { todos = [], filter = Filters.All } = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateToLocalStorage = () => {
    localStorage.setItem('state', JSON.stringify(state));
}

/**
 * Esta función retorna los TODOs según el filtro
 * @param {Filters} filter
 */
const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
        case Filters.Completed:
            return state.todos.filter(todo => todo.done);
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);
        default:
            throw new Error('Filtro no soportado');
    }
}

/**
 * Función que agrega un TODO
 * @param {String} description 
 */
const addTodo = (description) => {
    if (!description) throw new Error('La descripción es requerida');
    state.todos.push(new Todo(
        description,
    ));
    saveStateToLocalStorage();
}

/**
 * Esta función marca un TODO como completado o pendiente
 * @param {String} id del TODO 
 */
const toggleTodo = (id) => {
    const todo = state.todos.find(todo => todo.id === id);
    todo.done = !todo.done;
    saveStateToLocalStorage();
}

/**
 * Esta función elimina un TODO
 * @param {String} id del TODO
 */
const deleteTodo = (id) => {
    state.todos = state.todos.filter(todo => todo.id !== id);
    saveStateToLocalStorage();
}

/**
 * Esta función elimina todos los TODOs completados
 */
const deleteCompletedTodos = () => {
    state.todos = state.todos.filter(todo => todo.done);
    saveStateToLocalStorage();
}

/**
 * Esta función establece el filtro de los TODOs
 * @param {Filters} filter
 */
const setFilter = (filter = Filters.All) => {
    state.filter = filter;
    saveStateToLocalStorage();
}

/**
 * Esta función retorna el filtro actual
 * @returns {String} filter
 */
const getCurrentFilter = () => {
    return state.filter;
}

export default {
    addTodo,
    initStore,
    loadStore,
    toggleTodo,
    deleteTodo,
    deleteCompletedTodos,
    setFilter,
    getCurrentFilter,
    getTodos,
}