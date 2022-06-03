import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: []
})
export class AddStudentComponent implements OnInit {
  addForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private studentService: StudentsService, private router: Router) {

   }

  ngOnInit(): void {
    this.valideAddForm();
  }

  valideAddForm(){
    this.addForm = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      dateNaissance : ['', Validators.required],
      gender : ['', Validators.required]
    })
  }

  createStudent(){
    const student = this.addForm.getRawValue();
    console.table(student);
    this.studentService.addStudent(student).subscribe(data => {
      alert("Student " + data.id + " " + data.firstName + " Added by succes !!");
      this.router.navigateByUrl("students");
    });
  }
}
