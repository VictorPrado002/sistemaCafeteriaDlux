import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSource.asObservable();

  private currentUserSource = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor() {}

  login(user: any) {
    this.isLoggedInSource.next(true);
    this.currentUserSource.next(user);
  }

  logout() {
    this.isLoggedInSource.next(false);
    this.currentUserSource.next(null);
  }
}
