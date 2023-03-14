import { Todo } from '../models/todo.model.js'

/**
 * Este usecase se encarga de crear el HTML de un todo
 * @param {Todo} todo 
 */

export const createTodoHTML = (todo) => {
    if (!todo) throw new Error('El todo no puede ser nulo');

    const { id, description, done } = todo;

    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${done ? 'checked' : ''}>
            <label>${description}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `;

    const liElement = document.createElement('li');
    liElement.innerHTML = html;

    liElement.setAttribute('data-id', id);
    if (done) liElement.classList.add('completed');

    return liElement;
}