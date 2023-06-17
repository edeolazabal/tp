import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { from } from 'rxjs';
import { Empleados } from 'src/app/model/empleados.model';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-empleados-perfil',
  templateUrl: './empleados-perfil.component.html',
  styleUrls: ['./empleados-perfil.component.css']
})
export class EmpleadosPerfilComponent implements OnInit{
  form!: FormGroup;
  user: Empleados;
  id: any = 0;
  edicion: boolean = false;
  constructor(
    private fb: FormBuilder,
    private as: EmpleadosService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute) {
    this.user = {
      id: 0, 
      name: "", 
      dni: 0,
      email: "",
      age: 0,
      district: "",
      profession: "",
      descripcion: ""      
    };  
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    this.as.listId(this.id).subscribe((data) => {
      this.user = data;
      console.log(data);
    });  
  }

  /*
  form: FormGroup = new FormGroup({});
  user: Empleados = new Empleados();
  id: number = 0;
  edicion: boolean = false;

  constructor(private as: EmpleadosService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) {


  }
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    })

  this.form = new FormGroup({
    id:new FormControl("id"),
    name: new FormControl(),
    dni: new FormControl(),
    email: new FormControl(),
    age: new FormControl(),
    district: new FormControl(),
    profession: new FormControl(),
    descripcion: new FormControl()
  });
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
  */
}
