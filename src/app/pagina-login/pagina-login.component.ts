import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DireccionFormComponent } from '../direccion-form/direccion-form.component';

@Component({
  selector: 'app-pagina-login',
  templateUrl: './pagina-login.component.html',
  styleUrls: ['./pagina-login.component.css']
})
export class PaginaLoginComponent implements OnInit {
  registro: boolean = false;
  mensajeError: string = '';
  formularioSesion: FormGroup;
  formularioRegistro: FormGroup;
  formularioDireccion: FormGroup;

  constructor(private formBuilder: FormBuilder,public dialog: MatDialog) {
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
  }

  ngOnInit(): void {
    this.registro = false;
  }

  iniciarRegistro() {
    this.registro = true;
  }

  iniciarSesion() {
    if (this.formularioSesion.valid) {
      this.mensajeError = '';
      // Lógica de inicio de sesión
    } else {
      this.mensajeError = 'Por favor, completa los campos correctamente.';
    }
  }

  validarRegistro() {
    if (this.formularioRegistro.valid) {
      this.mensajeError = '';
      // Lógica de registro
    } else {
      this.mensajeError = 'Por favor, completa los campos correctamente.';
    }
  }

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
        // Puedes asignar los valores a tu formulario principal si es necesario
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
