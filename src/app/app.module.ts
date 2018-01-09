import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ItemModule } from './item/item.module';
import { TodoModule } from './todo/todo.module';
import { ItemComponent } from './item/item.component';
import { TodoComponent } from './todo/todo.component';
import { MatIconModule, MatMenuModule, MatToolbarModule, MatCardModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemService } from './item/item.service';
import { ItemServiceMock } from './item/item.service.mock';
import { TodoService } from './todo/todo.service';
import { TodoServiceMock } from './todo/todo.service.mock';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    ItemModule,
    TodoModule,
    BrowserModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        { path: '', component: AppComponent },
        { path: 'todos', component : TodoComponent},
        { path: 'items', component: ItemComponent },
        { path: 'login', component: LoginComponent }
      ], 
      { useHash: false }
    ),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [ 
    { provide: ItemService, useClass: ItemServiceMock }, 
    { provide: TodoService, useClass: TodoServiceMock },
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
