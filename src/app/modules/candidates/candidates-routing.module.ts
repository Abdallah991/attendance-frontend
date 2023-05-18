import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesComponent } from './candidates.component';
import { CandidatesResolver } from './services/candidates.resolver';
import { ViewCandidateComponent } from './view-candidate/view-candidate.component';
import { ViewCandidateResolver } from './services/view-candidate.resolver';
import { CandidateAttendanceResolver } from './services/candidate-attendance.resolver';
import { AddStudentComponent } from './add-student/add-student.component';

const routes: Routes = [
  {
    path: '',
    component: CandidatesComponent,
    // to be able to add the value
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      candidates: CandidatesResolver,
    },
  },
  {
    path: 'view-candidate/:candidateId',
    component: ViewCandidateComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      candidate: ViewCandidateResolver,
      attendance: CandidateAttendanceResolver,
    },
  },
  {
    path: 'add-student',
    component: AddStudentComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class CandidatesRoutingModule {}
