import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-date-picker';
import { TodoService } from './todo.service';
import { ItemServiceMock } from '../item/item.service.mock';
import { ItemService } from '../item/item.service';
import { TodoServiceMock } from './todo.service.mock';
import { Todo } from './todo';
import { Item } from '../item/item';
import { AgGridModule } from 'ag-grid-angular';
import { MatCheckboxGridModule } from '../grid-custom-components/mat-checkbox-grid/mat-checkbox-grid.module';

import {
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatNativeDateModule,
    MatChipsModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatExpansionPanelDescription
} from '@angular/material';
import { MatButtonGridRenderModule } from '../grid-custom-components/mat-button-grid-render/mat-button-grid-render.module';

describe('TodoComponent', () => {
    let component: TodoComponent;
    let fixture: ComponentFixture<TodoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                DpDatePickerModule,
                MatButtonModule,
                MatIconModule,
                MatCardModule,
                MatFormFieldModule,
                MatInputModule,
                MatTableModule,
                MatTooltipModule,
                MatSelectModule,
                MatChipsModule,
                MatCheckboxModule,
                MatExpansionModule,
                BrowserAnimationsModule,
                MatCheckboxGridModule,
                MatButtonGridRenderModule,
                MatToolbarModule,
                AgGridModule.withComponents([])
            ],
            declarations: [TodoComponent],
            providers: [
                { provide: ItemService, useClass: ItemServiceMock },
                { provide: TodoService, useClass: TodoServiceMock }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get items', fakeAsync(() => {
        component.ngOnInit();
        tick();
        fixture.detectChanges();
        expect(component._items.length).toBe(4);
    }));

    it('should get all todos', fakeAsync(() => {
        component.ngOnInit();
        tick();
        fixture.detectChanges();
        expect(component.rowData.length).toBe(3);
    }));


    it('should get a todo by id', () => {
        let todo = component.getTodoByKey('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1');
        expect(todo).toBeDefined();
        expect(todo.key).toBe('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1');
    });

    it('should add a todo', () => {

        let today = new Date('11/01/2017').getTime();
        component.todo = new Todo();
        component.todo.done = true;
        component.todo.date = today;
        component.todo.item = { key: 'keyx', name: 'Item name 1', auto: true, amount: 0 };

        let addedTodo = component.addTodo();

        expect(component.rowData.length).toBe(4);

        let newTodo = component.getTodoByKey(addedTodo.key);
        expect(newTodo).toBeDefined();
        expect(newTodo.done).toBeTruthy();
        expect(newTodo.date).toEqual(today);
        expect(newTodo.item).toBeDefined();
        expect(newTodo.item.key).toBe('keyx');
        expect(newTodo.item.name).toBe('Item name 1');
        expect(newTodo.item.auto).toBeTruthy();
    });

    it('should update a todo', () => {
        let today = new Date('12/27/2017').getTime();
        let todo = component.getTodoByKey('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1');
        expect(todo).toBeDefined();

        todo.done = true;
        todo.date = today;
        todo.item = { key: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa5', name: 'New Item', auto: false, amount: 0 };

        component.updateTodo(todo.key, todo);

        let updatedTodo = component.getTodoByKey('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1');
        expect(updatedTodo).toBeDefined();
        expect(updatedTodo.done).toBeTruthy();
        expect(updatedTodo.date).toEqual(today);
        expect(updatedTodo.item).toBeDefined();
        expect(updatedTodo.item.key).toBe('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa5');
        expect(updatedTodo.item.name).toBe('New Item');
        expect(updatedTodo.item.auto).toBeFalsy();
    });

    it('should remove a todo', () => {
        component.removeTodo('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1');
        let todo = component.getTodoByKey('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbb1');

        expect(todo).toBeUndefined();
    });

    it('should format date', () => {
        let date1 = new Date('12/15/2017').getTime();
        expect(component.formatDate(date1)).toBe('12/2017');

        let date2 = new Date('03/15/2017').getTime();
        expect(component.formatDate(date2)).toBe('03/2017');
    });

    /*
    it('should add autogenerate todos', () => {
      let todos = component.rowData.length + 2;
      let today = new Date();
      component.generateAutomaticTodos();
      expect(component.rowData.length).toBe(todos);
  
      let todo1 = component.rowData[todos-2];
      expect(todo1.date.getMonth()).toBe(today.getMonth());
      expect(todo1.date.getFullYear()).toBe(today.getFullYear());
      expect(todo1.item.id).toBe(2);
      expect(todo1.done).toBeFalsy();
  
      let todo2 = component.rowData[todos-1];
      expect(todo2.date.getMonth()).toBe(today.getMonth());
      expect(todo2.date.getFullYear()).toBe(today.getFullYear());
      expect(todo2.item.id).toBe(4);
      expect(todo2.done).toBeFalsy();
    });
    */

});
