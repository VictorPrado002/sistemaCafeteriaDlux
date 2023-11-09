import { Component } from '@angular/core';


@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css']
})
export class ReservacionesComponent {
    reservation: any = {};
  
    submitReservation() {
      // Aquí se puede usar servicio para enviar la solicitud HTTP al server
      console.log('Reservación enviada:', this.reservation);
    }
}
