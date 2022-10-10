import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      //  students: StudentsResolver
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
