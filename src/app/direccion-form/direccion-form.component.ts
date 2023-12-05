import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-direccion-form',
  templateUrl: './direccion-form.component.html',
  styleUrls: ['./direccion-form.component.css']
})
export class DireccionFormComponent {
  formularioDireccion: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DireccionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formularioDireccion = this.formBuilder.group({
      calle: ['', Validators.required],
      colonia: ['', Validators.required],
      numero: ['', Validators.required],
      municipio: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  guardarDireccion() {
    if (this.formularioDireccion.valid) {
      // Cierra el diálogo y pasa los datos al componente principal
      this.dialogRef.close(this.formularioDireccion.value);
    }
  }

  cerrarDialogo() {
    // Cierra el diálogo sin pasar datos
    this.dialogRef.close();
  }
}
