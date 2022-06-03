import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { StudentComponent } from './student/student.component';
import { UpdateStudentComponent } from './student/update-student/update-student.component';

const routes: Routes = [
  { path:"students", component: StudentComponent},
  { path:"", component: StudentComponent},
  { path:"addNewStudent", component: AddStudentComponent},
  { path:"update/:id", component: UpdateStudentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
