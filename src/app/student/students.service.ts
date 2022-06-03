import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  host = "http://localhost:9090/";
  path = "students/";

  constructor(private http: HttpClient) {

  }

  findAllStudent(): Observable<Student[]> {
    return this.http.get<Student[]>(this.host + this.path);
  }

  findStudentById(studentId: number): Observable<Student> {
    console.log(studentId);
    return this.http.get<Student>(this.host + this.path + studentId);
  }

  findStudent(studentId: number): Observable<Student> {
    console.log(studentId);
    return this.http.get<Student>(this.host + this.path + studentId);
  }

  deleteStudentById(student: any): Observable<void> {
    console.log("delete Student id : " + student.id);
    return this.http.delete<any>(this.host + this.path + student.id);
  }

  updateStudent(student: any): Observable<any> {
    console.log("update student id : " + student.id);
    return this.http.put<Observable<any>>(this.host + this.path + student.id, student);
  }

  addStudent(student: any): Observable<any> {
    console.log("Add Student Name : " + student.firstName);
    return this.http.post<Observable<any>>(this.host + this.path, student);
  }
}
