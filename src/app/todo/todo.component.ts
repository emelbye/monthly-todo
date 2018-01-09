import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item/item.service';
import { Item } from '../item/item';
import { Todo } from './todo';
import { MatTableDataSource } from '@angular/material';
import { TodoService } from './todo.service';
import { isMoment } from 'moment';
import { GridOptions, IFilterComp } from 'ag-grid';
import { MatCheckboxGridComponent } from '../grid-custom-components/mat-checkbox-grid/mat-checkbox-grid.component';
import { GridApi } from 'ag-grid/dist/lib/gridApi';
import { RowNode } from 'ag-grid/dist/lib/entities/rowNode';
import { MatButtonGridRenderComponent } from '../grid-custom-components/mat-button-grid-render/mat-button-grid-render.component';
import { CustomDateFilterComponent, FilterType } from '../grid-custom-components/custom-date-filter/custom-date-filter.component';
import { CustomBooleanFilterComponent } from '../grid-custom-components/custom-boolean-filter/custom-boolean-filter.component';
import { FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/take';
 
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']

})
export class TodoComponent implements OnInit  {
  
  public todo : Todo = new Todo();
  public context;

  private selectedDate : any;
  private itemControl;
  private monthControl;

  gridApi: GridApi;
  gridColumnApi;
  columnDefs;
  rowData;
  gridOptions: GridOptions;

  constructor(private itemService: ItemService, private todoService: TodoService) { 

    this.context = { componentParent: this };
    this.itemControl = new FormControl('', [Validators.required]);

    this.gridOptions = <GridOptions>{};
    this.gridOptions.enableFilter = true;
    this.gridOptions.enableSorting = true;
    this.gridOptions.rowSelection = 'simple';

    this.columnDefs = [
      { headerName: 'Key', field: 'key', hide: true },
      { headerName: 'Item', field: 'item.name', filter: 'text' },
      { headerName: 'Date', field: 'date', filterFramework: CustomDateFilterComponent, valueFormatter: (params) => this.formatDate(params.value), width: 125 },
      { headerName: 'Done', field: 'done', filterFramework: CustomBooleanFilterComponent, cellRendererFramework: MatCheckboxGridComponent, width: 125 },
	    { headerName: '', suppressFilter: true, cellRendererFramework: MatButtonGridRenderComponent, width: 75 }
    ];
  }

  ngOnInit(): void {
    this.todos.subscribe(todosList => 
      this.rowData = todosList
    );
  }

  get items(): any{
    return this.itemService.getItems();
  }

  get todos():any{
    return this.todoService.getTodos();
  }

  getTodoByKey(key){
    return this.todoService.getTodoByKey(key);
  }

  addTodo(){
    this.todo.date = this.parseDateToTime(this.selectedDate);
    let addedTodo = this.todoService.addTodo(this.todo);
    this.todo = new Todo();
    this.selectedDate = null;
    return addedTodo;
  }

  removeTodo(key) {
    this.todoService.deleteTodoByKey(key);
  }

  updateTodo(key, values){
    this.todoService.updateTodoByKey(key, values);
  }

  // Call from MatButtonGridRenderComponent
  removeFromComponent(key){
    this.removeTodo(key);
  }

  // Call from MatCheckboxGridComponent
  updateFromComponent(key, checked){
    this.updateTodo(key, {done: checked});
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridColumnApi.autoSizeColumns();
  }

  // Value formatter method to show in the date field on grid as 'MM/YYYY'
  formatDate(value : number){
    let date : Date = new Date(value);
    let month : String = (date.getMonth()+1).toString();
    month = month.length == 1 ? '0' + month : month;
    let year : String = date.getFullYear().toString();
    return month + '/' + year; 
  }

  // Show only this month todo
  filterActual(){
    this.clearFilters();

    let date = this.formatDate(new Date().getTime());
    let dateFilterInstance : IFilterComp = this.gridApi.getFilterInstance('date');
    dateFilterInstance.getFrameworkComponentInstance().filter(date, FilterType.Equals);
  }

  // Show old and not done Todos
  filterExpired(){
    this.clearFilters();

    let date = this.formatDate(new Date().getTime());
    let dateFilterInstance : IFilterComp = this.gridApi.getFilterInstance('date');
    dateFilterInstance.getFrameworkComponentInstance().filter(date, FilterType.Lesser)

    let doneFilterInstance : IFilterComp = this.gridApi.getFilterInstance('done');
    doneFilterInstance.getFrameworkComponentInstance().onChangeChecked(false);
  }

  // Show Next Todos
  filterNext(){
    this.clearFilters();

    let date = this.formatDate(new Date().getTime());
    let dateFilterInstance : IFilterComp = this.gridApi.getFilterInstance('date');
    dateFilterInstance.getFrameworkComponentInstance().filter(date, FilterType.Greater);
  }

  // Show all items
  clearFilters(){
    let dateFilterInstance : IFilterComp = this.gridApi.getFilterInstance('date');
    dateFilterInstance.getFrameworkComponentInstance().clearFilter();

    let doneFilterInstance : IFilterComp = this.gridApi.getFilterInstance('done');
    doneFilterInstance.getFrameworkComponentInstance().clearFilter();
  }

  // When adding Todo, should parse to be compatible with firebase
  parseDateToTime(date) : number{
    let time : number;
    if(date != null){
      if(date instanceof Date){
        time = date.getTime();
      }
      else if(isMoment(date)){
        time = date.toDate().getTime();
      }
    }
    return time;
  }

  generateAutomaticTodos(){
    this.items.take(1).subscribe(items => {
      this.todos.take(1).subscribe(todos => {
        this.generateTodos(items, todos);
      });
    });
  }

  generateTodos(items, todos){
    for(let i=0; i < items.length; i++){
      if(items[i].auto){
        let newTodo : Todo = new Todo({ date: new Date().getTime(), item : items[i] })
        let isOnList = this.isTodoThisMonth(newTodo, todos);
        if(!isOnList)
          this.todoService.addTodo(newTodo);
      }
    }
  }

  isTodoThisMonth(todo, todos) : boolean{
    let isOnList : boolean = false;
    for(let i=0; i < todos.length; i++){
      if(todo.equals(todos[i])){
        isOnList = true;
        break;
      }
    }
    return isOnList;
  }

}
