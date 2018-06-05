import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoService {

    private todos: Observable<Todo[]>;
    private todosRef: AngularFireList<any>;

    constructor(private db: AngularFireDatabase) {
        this.todosRef = db.list('todos');
        this.todos = this.todosRef.snapshotChanges().map(changes => {
            return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        });
    }

    getTodos(): Observable<Todo[]> {
        return this.todos;
    }

    getTodoByKey(key: string): Todo {
        throw new Error("Method not implemented.");
    }

    addTodo(todo: Todo): Todo {
        this.todosRef.push(todo);
        return todo;
    }

    deleteTodoByKey(key: string) {
        this.todosRef.remove(key);
    }

    updateTodoByKey(key: string, values: Object) {
        this.todosRef.update(key, values);
    }
}
