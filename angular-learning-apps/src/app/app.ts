import { Component, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { increment, decrement, reset, customIncrement } from './NgRxStore/counter.action';
import { addUser, deleteUser, resetUser } from './NgRxStore/user/user.action';
import { user } from './NgRxStore/user/user.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  // NgRX state management examples
  public counter$: Observable<number>;
  public users$: Observable<user[]>;
  constructor(private store: Store<{ counter: number, users: user[] }>) {
    this.counter$ = this.store.select('counter');
    this.users$ = this.store.select('users');
  }

  protected readonly title = signal('MEARN APP');

  ngOnInit() {
    console.log("App component initialized");
    this.users$.subscribe(value => console.log('users$ emits:', value));
  }

  increment() {
    this.store.dispatch(increment({ value: 1 }));
  }

  decrement() {
    this.store.dispatch(decrement({ value: 5 }));
  }

  reset() {
    this.store.dispatch(reset({ value: 0 }));
  }

  customIncrement() {
    this.store.dispatch(customIncrement({ value: 2 }));
  }

  // user store dispatch actions
  addUser() {
    const user: user = { name: "Suganya", age: 25 };
    this.store.dispatch(addUser({ value: user }));
  }

  deleteUser() {
    const user: user = { name: "Suganya", age: 25 };
    this.store.dispatch(deleteUser({ value: user }));
  }

  resetUser() {
    this.store.dispatch(resetUser());
  }

}
