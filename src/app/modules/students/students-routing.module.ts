import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { StudentsResolver } from './services/students.resolver';
import { StudentsComponent } from './students.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      students: StudentsResolver,
    },
  },
  // children: [
  {
    path: 'add-student',
    component: EditStudentComponent,
    data: {
      type: 'create',
    },
  },
  {
    path: 'edit-student',
    // TODO: add the component and the resolver
    component: EditStudentComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    data: {
      type: 'view',
    },
    resolve: {
      students: StudentsResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
