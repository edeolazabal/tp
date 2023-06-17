import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Empleados } from 'src/app/model/empleados.model';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf, NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-cat',
  templateUrl: './empleados-list.component.html',
  styleUrls: ['./empleados-list.component.css']
})


export class EmpleadosListComponent implements OnInit {
  searchText:any;
  lista: Empleados[]= []

  empleadoData!: Empleados;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id','name','district','profession', 'actions']
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  
  constructor(private as: EmpleadosService) {
    this.empleadoData = {} as Empleados;
  }
  
ngOnInit(): void {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  this.getAllEmpleados();
}
getAllEmpleados() {
  this.as.getList().subscribe((data: any)=>{
    this.dataSource.data = data
  })
}

  
//  dataSource: MatTableDataSource <Empleados> = new MatTableDataSource();
//  idMayor: number = 0

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

//  constructor(private as: EmpleadosService) {}

//  displayedColumns: string[] = ['id','name','district','profession', 'actions']
//  ngOnInit(): void {
//
//    this.as.list().subscribe(data=>{
//      this.dataSource = new MatTableDataSource(data)
//    })
//    this.as.getList().subscribe(data=>{
//      this.dataSource = new MatTableDataSource(data)
//    })
//  }


}
