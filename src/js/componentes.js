import { ToDo } from "../classes";
import  { todoList } from "../index.js"

//referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const Afiltro = document.querySelectorAll('.filtro');


export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `<li class="${ ( todo.completado ) ? 'completed' : ''}" data-id="${ todo.id }">
                        <div class="view">
                            <input class="toggle" type="checkbox" ${ ( todo.completado ) ? 'checked' : ''}>
                            <label>${ todo.tarea }</label>
                            <button class="destroy"></button>
                        </div>
                        <input class="edit" value="Create a TodoMVC template">
                    </li>`;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div;

}

//Eventos
txtInput.addEventListener('keyup', ( event ) => {

    if( event.keyCode === 13 && txtInput.value.length > 0) {

        console.log(txtInput.value);
        const nuevoTodo = new ToDo( txtInput.value );
        todoList.nuevoTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );

        txtInput.value = '';

    }

});

divTodoList.addEventListener('click', (event) => {

    const nombreEl = event.target.localName;
    const todoEl = event.target.parentElement.parentElement;
    const todoId = todoEl.getAttribute('data-id');

    if( nombreEl.includes('input')){

        todoList.marcarTodo( todoId );
        todoEl.classList.toggle('completed');

    } else if( nombreEl.includes('button') ){

        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoEl );

    }

});

btnBorrar.addEventListener('click', () => {

    todoList.eliminarComp();

    for( let i = divTodoList.children.length - 1; i >= 0; i--) {

        const elemento = divTodoList.children[i];

        if( elemento.classList.contains('completed')){

            divTodoList.removeChild(elemento);

        }

    }

});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;

    if( !filtro ) {
        return;
    }

    Afiltro.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children ) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ) {

            case 'Pendientes':
                if( completado ) {
                    elemento.classList.add('hidden');
                }

            break;

            case 'Completados':
                if( !completado ) {
                    elemento.classList.add('hidden');
                }

            break;

        }

    }

});