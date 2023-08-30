import { ToDo } from "./todo.class";


export class ToDoList {
    
    constructor() {

        // this.todos = [];
        this.cargarLS();

    }

    nuevoTodo( todo ) {

        this.todos.push(todo);
        this.guardarLS();

    }

    eliminarTodo( id ) {

        this.todos = this.todos.filter( todo => todo.id != id );
        this.guardarLS();

    }

    marcarTodo( id ) {

        for( const todo of this.todos ) {

            if( todo.id == id ){

                todo.completado = !todo.completado;
                this.guardarLS();
                break;

            }

        }

    }

    eliminarComp() {

        this.todos = this.todos.filter( todo => !todo.completado );
        this.guardarLS();

    }

    guardarLS() {

        localStorage.setItem( 'todo', JSON.stringify(this.todos) );

    }

    cargarLS() {

        this.todos = ( localStorage.getItem('todo') ) 
                    ? JSON.parse( localStorage.getItem('todo') )
                    : [];

        this.todos = this.todos.map( obj => ToDo.fromJson( obj ) );

    }

}