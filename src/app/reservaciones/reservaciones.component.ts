import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css']
})
export class ReservacionesComponent {
  reservation: any = {};

  // Custom validator function for the client's name
  validateName(name: string): boolean {
    const regex = /^[a-zA-Z\s]+$/; // Allows only alphabets and spaces
    return regex.test(name);
  }

  // Custom validator function for the phone number
  validatePhoneNumber(phoneNumber: string): boolean {
    // You can customize the phone number validation logic based on your requirements
    // For example, you might want to ensure a specific format or length
    const regex = /^[0-9]{10}$/; // Assuming a 10-digit phone number
    return regex.test(phoneNumber);
  }

  // Custom validator function for the email
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
    return emailRegex.test(email);
  }

  // Custom validator function for the number of persons
  validateNumberOfPersons(persons: number): boolean {
    return persons >= 1 && persons <= 10;
  }

  submitReservation() {
    if (
      this.validateName(this.reservation.nombre) &&
      this.validatePhoneNumber(this.reservation.telefono) &&
      this.validateEmail(this.reservation.email) &&
      this.validateNumberOfPersons(this.reservation.personas)
    ) {
      // Valid name, phone number, email, and number of persons, proceed with the reservation submission logic
      // Aquí se puede usar un servicio para enviar la solicitud HTTP al servidor
      console.log('Reservación enviada:', this.reservation);
    } else {
      // Invalid input, show an error message or handle accordingly
      console.log('Invalid input');
    }
  }
}
