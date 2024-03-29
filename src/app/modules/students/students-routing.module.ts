import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentsResolver } from './services/students.resolver';
import { ViewStudentComponent } from './view-student/view-student.component';
import { ViewStudentResolver } from './services/view-student.resolver';
import { StudentAttendanceResolver } from './services/student-attendance.resolver';
import { AddStudentComponent } from './add-student/add-student.component';
import { CohortsResolver } from '../cohorts/services/cohorts.resolver';
import { VacationsResolver } from './services/vacations.resolver';
import { BirthdaysComponent } from './birthdays/birthdays.component';
import { BirthdaysResolver } from './services/birthdays.resolver';

const routes: Routes = [
  {
    path: '',
    component: StudentsComponent,
    // to be able to add the value
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      students: StudentsResolver,
    },
  },
  {
    path: 'view-student/:studentId',
    component: ViewStudentComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      student: ViewStudentResolver,
      cohorts: CohortsResolver,
      attendance: StudentAttendanceResolver,
      vacations: VacationsResolver,
    },
  },
  {
    // add student
    path: 'add-student',
    component: AddStudentComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      type: () => 'create',
      cohorts: CohortsResolver,
    },
  },
  {
    // edit student
    path: 'edit-student/:studentId',
    component: AddStudentComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      type: () => 'edit',
      cohorts: CohortsResolver,
      student: ViewStudentResolver,
    },
  },

  {
    path: 'birthdays',
    component: BirthdaysComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      birthdays: BirthdaysResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
