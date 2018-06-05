import { Component } from '@angular/core';
import { ItemServiceMock } from './item/item.service.mock';
import { TodoServiceMock } from './todo/todo.service.mock';
import { ItemService } from './item/item.service';
import { TodoService } from './todo/todo.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, Routes } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { ItemComponent } from './item/item.component';
import { LoginComponent } from './login/login.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public isLoggedIn: boolean;

    constructor(public afAuth: AngularFireAuth, private router: Router) {
        this.afAuth.authState.subscribe(
            (user) => {
                if (user == null) {
                    this.isLoggedIn = false;
                    this.router.navigate(['login']);
                }
                else {
                    this.isLoggedIn = true;
                    this.router.navigate(['todos']);
                }
            }
        );
    }

    logout() {
        this.afAuth.auth.signOut();
    }
}
export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'todos', component: TodoComponent },
    { path: 'items', component: ItemComponent },
    { path: 'login', component: LoginComponent }
];


