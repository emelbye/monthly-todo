import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { TodoService } from './todo.service';
import { Item } from '../item/item';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoServiceMock {

  private todos: Todo[] = [];

  constructor() {
    let todo1 = new Todo();
    todo1.key = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1';
    todo1.date = new Date('10/01/2017').getTime();
    todo1.done = false;
    todo1.item = new Item({key: 1, name:"Item name 1"});
    this.addTodo(todo1);

    let todo2 = new Todo();
    todo2.key = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb2';
    todo2.date = new Date('11/01/2017').getTime();
    todo2.done = true;
    todo2.item = new Item({key: 1, name:"Item name 1"});
    this.addTodo(todo2);

    let todo3 = new Todo();
    todo3.key = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb3';
    todo3.date = new Date('11/01/2017').getTime();
    todo3.done = false;
    todo3.item = new Item({key: 2, name:"Item name 2"});
    this.addTodo(todo3);
  }

  getTodos() : Observable<Todo[]>{
    return Observable.of(this.todos);
  }

  getTodoByKey(key: string): Todo {
    return this.todos
      .filter(todo => todo.key == key)
      .pop();
  }

  addTodo(todo: Todo): Todo {
    if (!todo.key) {
      todo.key = Guid.newGuid();
    }
    this.todos.push(todo);
    return todo;
  }

  deleteTodoByKey(key: string) {
    this.todos = this.todos
      .filter(todo => todo.key != key);
  }

  updateTodoByKey(key: string, values: Object = {}): Todo {
    let todo = this.getTodoByKey(key);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }
}

class Guid {
  static newGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
      });
  }
}
