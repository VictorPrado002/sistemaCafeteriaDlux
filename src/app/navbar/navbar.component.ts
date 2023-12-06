// navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  currentUser: any;
  userName: string | undefined;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });

    this.authService.currentUser$.subscribe((user) => {
      this.userName = user?.nombre;
    });
  }

  logout() {
    this.authService.logout();
    // Agrega aquí la lógica para redirigir a la página de inicio o donde prefieras
  }
}
