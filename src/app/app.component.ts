import { Component } from '@angular/core';
import { AuthService } from './auth-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sistemaCafeteria';
  isLoggedIn: boolean = false;
  currentUser: any;

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        this.currentUser = this.authService.currentUser$;
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
