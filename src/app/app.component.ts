import { Component } from '@angular/core';
import { ItemServiceMock } from './item/item.service.mock';
import { TodoServiceMock } from './todo/todo.service.mock';
import { ItemService } from './item/item.service';
import { TodoService } from './todo/todo.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isLoggedIn: boolean;
  public img;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(
      (user) => {
        if(user == null) {
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


