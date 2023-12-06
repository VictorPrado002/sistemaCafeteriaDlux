// actualizar-datos.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistroService } from '../registro.service';
import { AuthService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-datos',
  templateUrl: './actualizar-datos.component.html',
  styleUrls: ['./actualizar-datos.component.css'],
})
export class ActualizarDatosComponent implements OnInit {
  formularioActualizar: FormGroup;
  currentUser: any;

  constructor(
    private formBuilder: FormBuilder,
    private registroService: RegistroService,
    private authService: AuthService,
    private router: Router
  ) {
    this.formularioActualizar = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      // Agrega otros campos según tus necesidades
    });
  }

  ngOnInit(): void {
    // Cargar datos actuales del usuario al iniciar el componente
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      // Puedes ajustar la lógica para cargar datos según tu implementación
      this.cargarDatosUsuario();
    });
  }

  cargarDatosUsuario() {
    // Lógica para cargar datos actuales del usuario y prellenar el formulario
    this.formularioActualizar.patchValue({
      nombre: this.currentUser.nombre,
      // Puedes agregar otras propiedades según tu implementación
    });
  }

  actualizarDatos() {
    if (this.formularioActualizar.valid) {


      const datosActualizados = {
        nuevosDatos: this.formularioActualizar.get('nombre')?.value,
      };

      // Lógica para enviar datos actualizados al servidor
      this.registroService.actualizarDatosUsuario(datosActualizados).subscribe(
        (respuesta) => {
          // Lógica después de la actualización (redirección, mostrar mensaje, etc.)
          console.log('Datos actualizados con éxito:', respuesta);
          // Ejemplo de redirección a la página principal después de la actualización
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error al actualizar datos:', error);
          // Lógica para manejar errores (mostrar mensaje, etc.)
        }
      );
    }
  }
}
