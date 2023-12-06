import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  registrarCliente(cliente: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registroCliente`, cliente, { responseType: 'text' });
  }

  iniciarSesion(client: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, client);
  }
  
  
  obtenerDetallesUsuario(): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario`);
  }

  actualizarDatosUsuario(datosActualizados: any): Observable<any> {
    // Lógica para enviar datos actualizados al servidor
    // Puedes usar el HttpClient para hacer la solicitud HTTP
    return this.http.post(`${this.apiUrl}/actualizarDatos`, datosActualizados);
  }
}
