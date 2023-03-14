import { Todo } from '../models/todo.model.js'
import { createTodoHTML } from './create-todo-html.js';

let element;

/**
 * Este usecase se encarga de renderizar los todos en el DOM
 * @param {String} elementId 
 * @param {Todo} todos 
 */
export const renderTodos = (elementId, todos = []) => {
    
    if (!element) {
        element = document.querySelector(elementId);
        if (!element) throw new Error(`No se encontró el elemento con el id ${elementId}`);
    }

    element.innerHTML = '';

    // Invertimos el orden de los todos para que el último agregado quede arriba
    todos.reverse().forEach(todo => {
        element.append(createTodoHTML(todo));
    }
    );

}