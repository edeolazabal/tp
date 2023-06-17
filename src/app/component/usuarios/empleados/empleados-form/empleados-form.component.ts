import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { from } from 'rxjs';
import { Empleados } from 'src/app/model/empleados.model';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { FormBuilder, Validators  } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

interface Districto {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-usuario-form',
  templateUrl: './empleados-form.component.html',
  styleUrls: ['./empleados-form.component.css']
})



export class EmpleadosFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  user: Empleados = new Empleados();
  mensaje: boolean = false;
  id: number = 0;
  edicion: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';



  distritos: Districto[] = [
    {value: 'Lima', viewValue: 'Lima'},
    {value: 'Ancón', viewValue: 'Ancón'},
    {value: 'Ate', viewValue: 'Ate'},
    {value: 'Barranco', viewValue: 'Barranco'},
    {value: 'Breña', viewValue: 'Breña'},
    {value: 'Carabayllo', viewValue: 'Carabayllo'},
    {value: 'Chaclacayo', viewValue: 'Chaclacayo'},
    {value: 'Chorrillos', viewValue: 'Chorrillos'},
    {value: 'Cieneguilla', viewValue: 'Cieneguilla'},
    {value: 'Comas', viewValue: 'Comas'},
    {value: 'El Agustino', viewValue: 'El Agustino'},
    {value: 'Independencia', viewValue: 'Independencia'},
    {value: 'Jesús María', viewValue: 'Jesús María'},
    {value: 'La Molina', viewValue: 'La Molina'},
    {value: 'La Victoria', viewValue: 'La Victoria'},
    {value: 'Lince', viewValue: 'Lince'},
    {value: 'Los Olivos', viewValue: 'Los Olivos'},
    {value: 'Lurigancho', viewValue: 'Lurigancho'},
    {value: 'Lurín', viewValue: 'Lurín'},
    {value: 'Magdalena del Mar', viewValue: 'Magdalena del Mar'},
    {value: 'Pueblo Libre', viewValue: 'Pueblo Libre'},
    {value: 'Miraflores', viewValue: 'Miraflores'},
    {value: 'Pachacámac', viewValue: 'Pachacámac'},
    {value: 'Pucusana', viewValue: 'Pucusana'},
    {value: 'Puente Piedra', viewValue: 'Puente Piedra'},
    {value: 'Punta Hermosa', viewValue: 'Punta Hermosa'},
    {value: 'Punta Negra', viewValue: 'Punta Negra'},
    {value: 'Rímac', viewValue: 'Rímac'},
    {value: 'San Bartolo', viewValue: 'San Bartolo'},
    {value: 'San Borja', viewValue: 'San Borja'},
    {value: 'San Isidro', viewValue: 'San Isidro'},
    {value: 'San Juan de Lurigancho', viewValue: 'San Juan de Lurigancho'},
    {value: 'San Juan de Miraflores', viewValue: 'San Juan de Miraflores'},
    {value: 'San Luis', viewValue: 'San Luis'},
    {value: 'San Martín de Porres', viewValue: 'San Martín de Porres'},
    {value: 'San Miguel', viewValue: 'San Miguel'},
    {value: 'Santa Anita', viewValue: 'Santa Anita'},
    {value: 'Santa María del Mar', viewValue: 'Santa María del Mar'},
    {value: 'Santa Rosa', viewValue: 'Santa Rosa'},
    {value: 'Santiago de Surco', viewValue: 'Santiago de Surco'},
    {value: 'Surquillo', viewValue: 'Surquillo'},
    {value: 'Villa El Salvador', viewValue: 'Villa El Salvador'},
    {value: 'Villa María del Triunfo', viewValue: 'Villa María del Triunfo'}
  ];

  constructor(private as: EmpleadosService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private snackBar: MatSnackBar){

  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    })

  this.form = new FormGroup({
    id:new FormControl(),
    name: new FormControl(),
    dni: new FormControl(),
    email: new FormControl(),
    age: new FormControl(),
    district: new FormControl(),
    profession: new FormControl(),
    descripcion: new FormControl()
  });
  }

  aceptar(): void{
    this.user.id=this.form.value['id'];
    this.user.name=this.form.value['name'];
    this.user.dni=this.form.value['dni'];
    this.user.email=this.form.value['email'];
    this.user.age=this.form.value['age'];
    this.user.district=this.form.value['district'];
    this.user.profession=this.form.value['profession'];
    this.user.descripcion=this.form.value['descripcion'];

    const name = this.form.value['name'];
    const dni = this.form.value['dni'];
    const email = this.form.value['email'];
    const age = this.form.value['age'];
    const district = this.form.value['district'];
    const profession = this.form.value['profession'];
    const descripcion = this.form.value['descripcion'];

    if (
      name && name.length <= 20 &&
      dni && dni.length === 8 &&
      email && email.length <= 40 &&
      age && age.toString().length <= 3 &&
      district && district.length <= 40 &&
      profession && profession.length <= 40 &&
      descripcion && descripcion.length <= 400
    ) {
      if (this.edicion) {
        this.as.update(this.user).subscribe((data) => {
          this.as.list().subscribe((data) => {
            this.as.setList(data);
          });
        });
      } else {
        this.as.insert(this.user).subscribe((data) => {
          this.as.list().subscribe((data) => {
            this.as.setList(data);
          });
        });
      }
      this.router.navigate(['empleados']);
    } else {
      let errorMessage = 'Completa los siguientes campos correctamente: ';

      if (!name || name.length > 20) {
        errorMessage += 'Nombre (máximo 20 caracteres), ';
      }
      if (!dni || dni.length !== 8) {
        errorMessage += 'DNI (exactamente 8 caracteres), ';
      }
      if (!email || email.length > 40) {
        errorMessage += 'Email (máximo 40 caracteres), ';
      }
      if (!age || age.toString().length > 3) {
        errorMessage += 'Edad (máximo 3 dígitos), ';
      }
      if (!district) {
        errorMessage += 'Distrito';
      }
      if (!profession || profession.length > 40) {
        errorMessage += 'Profesión (máximo 40 caracteres), ';
      }
      if (!descripcion || descripcion.length > 400) {
        errorMessage += 'Descripción (máximo 400 caracteres), ';
      }

      errorMessage = errorMessage.slice(0, -2);

      this.snackBar.open(errorMessage, 'Cerrar', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
      });
    }

  }

  init() {
    if (this.edicion) {
      this.as.listId(this.id).subscribe(data => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          name: new FormControl(data.name),
          dni: new FormControl(data.dni),
          email: new FormControl(data.email),
          age: new FormControl(data.age),
          district: new FormControl(data.district),
          profession: new FormControl(data.profession),
          descripcion: new FormControl(data.descripcion)
        })
      })
    }
  }

}
