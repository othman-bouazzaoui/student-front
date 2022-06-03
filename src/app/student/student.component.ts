import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, retry } from 'rxjs';
import { Student } from '../models/student';
import { StudentsService } from './students.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: []
})

export class StudentComponent implements OnInit {
  students: Observable<any> | null = null;

  constructor(private studentService: StudentsService, private router: Router) { }

  ngOnInit(): void {
    this.allStudents();
  }
/*
  allStudents() {
    this.studentService.findAllStudent().subscribe(data => {
      console.log(typeof (data));
      console.log(data);
      this.students = data;
    });
  }
  */
  allStudents() {
   this.students = this.studentService.findAllStudent().pipe(
      map( data =>{
        return    ({ students: data} )
      }),
      catchError(err => of({ errorMessage : err.message}))
    )
  }


  onDelete(student: any) {
    this.studentService.deleteStudentById(student).subscribe(() => {
      this.allStudents()
    });
  }

  onUpdate(student: any) {
    this.router.navigateByUrl("update/" + student.id)
  }
  addNewStudent() {
    this.router.navigateByUrl("addNewStudent");
  }

  findStudentById(student: any) {
    if(student.id !=''){
    this.students = this.studentService.findStudentById(student.id).pipe(
      map( 
        data => {
          console.log(data);
           return { students: data ==null ? Array.of() : Array(data)}
         }),
      catchError(err =>{ 
        return of({ errorMessage : err.message})
      })
    );
    }else{
      this.allStudents();
    }
  }
  

}
