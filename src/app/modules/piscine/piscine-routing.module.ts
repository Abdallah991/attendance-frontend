import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PiscineComponent } from './piscine.component';
import { PiscineResolver } from './services/piscine.resolver';
import { PiscineDetailComponent } from './piscine-detail/piscine-detail.component';
import { PiscineCandidateResolver } from './services/piscine-candidate.resolver';

const routes: Routes = [
  {
    path: '',
    component: PiscineComponent,
    // to be able to add
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      applicants: PiscineResolver,
    },
  },
  {
    path: 'view-candidate/:candidateId',
    component: PiscineDetailComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      candidate: PiscineCandidateResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class PiscineRoutingModule {}
