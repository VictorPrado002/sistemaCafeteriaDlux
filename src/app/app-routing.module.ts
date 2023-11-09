import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { ReservacionesComponent } from './reservaciones/reservaciones.component';
import { PaginaLoginComponent } from './pagina-login/pagina-login.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"menu",component:MenuComponent},
  {path:"reservacion",component:ReservacionesComponent},
  {path:"about",component:AboutComponent},
  {path:"loginPag",component:PaginaLoginComponent},
  {path:"**", pathMatch:"full",redirectTo:"home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
