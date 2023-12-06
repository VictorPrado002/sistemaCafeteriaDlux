import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DireccionFormComponent } from '../direccion-form/direccion-form.component';
import { HttpClient } from '@angular/common/http';
import { RegistroService } from '../registro.service';
import { CryptoService } from '../crypto.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-pagina-login',
  templateUrl: './pagina-login.component.html',
  styleUrls: ['./pagina-login.component.css']
})
export class PaginaLoginComponent implements OnInit {
  registro: boolean = false;
  mensajeError: string = '';
  mensajeExito: string = '';
  formularioSesion: FormGroup;
  formularioRegistro: FormGroup;
  formularioDireccion: FormGroup;
  isLoggedIn: boolean = false;
  currentUser: any;
  
  
  constructor(private authService: AuthService, private cdr: ChangeDetectorRef,private formBuilder: FormBuilder,public dialog: MatDialog,  private http: HttpClient, private registroService: RegistroService, private cryptoService: CryptoService, private router: Router) {
    this.formularioSesion = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.formularioRegistro = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      apellidoPaterno: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      apellidoMaterno: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      edad: ['', [Validators.required, this.validarEdad()]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.formularioDireccion = this.formBuilder.group({
      calle: ['', Validators.required],
      colonia: ['', Validators.required],
      numero: ['', Validators.required],
      municipio: ['', Validators.required],
      estado: ['', Validators.required]
    });

    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });

    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnInit(): void {
    // Verificar si el usuario está actualmente autenticado
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;

      if (this.isLoggedIn) {
        // Si está autenticado, obtener los detalles del usuario
        this.authService.currentUser$.subscribe((user) => {
          this.currentUser = user;
          console.log('Usuario después del inicio de sesión:', this.currentUser?.nombre);
        });
      }
    });
    this.registro = false;
  }
  iniciarRegistro() {
    this.registro = true;
  }

  iniciarSesion() {
    if (this.formularioSesion.valid) {
      this.mensajeError = '';

      const correo = this.formularioSesion.get('correo')?.value;
      const contrasena = this.formularioSesion.get('password')?.value;
      console.log(contrasena);
      // Realizar la solicitud HTTP al servidor para iniciar sesión
      this.iniciarSesionAutomatico(correo, contrasena);
    } else {
      this.mensajeError = 'Por favor, completa los campos correctamente.';
    }
  }

  validarRegistro() {
    if (this.formularioRegistro.valid && this.formularioDireccion.valid) {
      this.mensajeError = '';

      const cliente = {
        nombre: this.formularioRegistro.get('nombre')?.value,
        apellidoPaterno: this.formularioRegistro.get('apellidoPaterno')?.value,
        apellidoMaterno: this.formularioRegistro.get('apellidoMaterno')?.value,
        edad: this.formularioRegistro.get('edad')?.value,
        telefono: this.formularioRegistro.get('telefono')?.value,
        correo: this.formularioRegistro.get('correo')?.value,
        contrasena: this.formularioRegistro.get('password')?.value,  // No es necesario encriptar aquí
        direccion: this.formularioDireccion.value
      };

      // Enviar la solicitud HTTP al servidor para registrar al cliente
      this.registroService.registrarCliente(cliente).subscribe(
        (response) => {
          console.log('Cliente registrado con éxito:', response);
          if (response.includes('Cliente registrado exitosamente')) {
            this.mensajeExito = 'Cliente registrado exitosamente';
            this.mensajeError = '';

            // Iniciar sesión automáticamente después de registrar al cliente
            this.iniciarSesionAutomatico(cliente.correo, cliente.contrasena);
          } else {
            console.error('Respuesta inesperada del servidor:', response);
            this.mensajeError = 'Error al registrar cliente.';
          }
        },
        (error) => {
          console.error('Error al registrar cliente:', error);
          this.mensajeError = 'Error al registrar cliente.';
        }
      );
    } else {
      this.mensajeError = 'Por favor, completa los campos correctamente.';
    }
  }

  private iniciarSesionAutomatico(correo: string, contrasena: string) {
    // Encripta la contraseña antes de enviarla al servidor
    
      const cliente = {
        correo: correo,
        contrasena: contrasena, // Aquí la contraseña ya está encriptada
      };
     console.log(contrasena);
      // Realizar la solicitud HTTP al servidor para iniciar sesión
      this.registroService.iniciarSesion(cliente).subscribe(
        (response: any) => {
          console.log('Inicio de sesión exitoso:', response);
          
          // Verifica la respuesta del servidor
          if (response.message === 'Inicio de sesión exitoso') {
            // Actualiza el estado de inicio de sesión
            this.isLoggedIn = true;
            const usuario = {
              nombre: response.nombre,
              // ... otras propiedades del usuario
            };
            this.authService.login(response.nombre);

        // Redirige a la página de inicio
        console.log('Usuario después del inicio de sesión:', response.nombre);

            //this.authService.login(usuario);
            this.cdr.detectChanges();

            // Redirige a la página de inicio
            this.router.navigate(['/home']);
          } else {
            this.mensajeError = 'Correo o contraseña incorrectos.';
          }
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          this.mensajeError = 'Correo o contraseña incorrectos.';
        }
      );
    };

  

  obtenerErrorCampo(formulario: FormGroup, campo: string): string {
    const control: AbstractControl | null = formulario.get(campo);

    if (control && control.hasError('required')) {
      return 'Este campo es obligatorio.';
    } else if (control && control.hasError('email')) {
      return 'Ingresa un correo electrónico válido.';
    } else if (control && control.hasError('minlength')) {
      return `La longitud mínima es ${control.errors?.['minlength'].requiredLength} caracteres.`;
    } else if (control && control.hasError('pattern')) {
      return 'Ingresa un valor válido.';
    } else if (control && control.hasError('edadInvalida')) {
      return 'Ingresa una edad válida.';
    } else if (control && control.hasError('pattern') && campo === 'telefono') {
      return 'Ingresa un número de teléfono válido (10 dígitos).';
    }

    return '';
  }

  validarEdad(): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const edad = control.value;
      if (edad < 0 || edad > 130) {
        return { 'edadInvalida': true };
      }
      return null;
    };
  }

  abrirFormularioDireccion() {
    const dialogRef = this.dialog.open(DireccionFormComponent, {
      width: '400px',
      data: {
        formularioDireccion: this.formularioDireccion
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // El formulario de dirección se guardó correctamente
        console.log('Dirección guardada:', result);
    
        // Desestructura el objeto result para obtener las propiedades individuales
        const { calle, colonia, numero, municipio, estado } = result;
    
        // Puedes asignar los valores a tu formulario principal si es necesario
        this.formularioDireccion.patchValue({
          calle: calle,
          colonia: colonia,
          numero: numero,
          municipio: municipio,
          estado: estado
        });
      }
    });
  }

  guardarDireccion() {
    if (this.formularioDireccion.valid) {
      // Lógica para guardar la dirección
      console.log('Dirección guardada:', this.formularioDireccion.value);
  
    } else {
      this.mensajeError = 'Por favor, completa los campos correctamente.';
    }
  }
}