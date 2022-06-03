import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: []
})
export class UpdateStudentComponent implements OnInit {

  studentId: number;
  updateForm!: FormGroup;

  constructor(private studentService: StudentsService, private activateRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) {
    this.studentId = this.activateRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.updateFormData();
  }

  updateFormData() {
    this.studentService.findStudent(this.studentId)
      .subscribe((data:Student) => {
        console.log(data);
        this.updateForm = this.formBuilder.group({
          id: [{value: data.id, disabled: true}, Validators.required],
          firstName: [data.firstName, Validators.required],
          lastName: [data.lastName, Validators.required],
          dateNaissance: [data.dateNaissance, Validators.required],
          gender: [data.gender, Validators.required],
        })
      });
  }


  updateStudent() {
    const student = this.updateForm.getRawValue();
    console.table(student);
    this.studentService.updateStudent(student).subscribe(data => {
      alert("Student " + data.id + " " + data.firstName + " updated by succes !!");
      this.router.navigateByUrl("students");
    });
  }

}
